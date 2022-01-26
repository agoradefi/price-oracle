
const hre = require("hardhat");
const jsonfile = require('jsonfile')
const { numToWei } = require("../utils/ethUnitParser");
const { toBn } = require("../utils/bn");
const { UniLpCalcParams } = require("../utils/constants");
const configs = require(`./configs/${hre.network.name}`);
const deploymentFilePath = `./deployments/${hre.network.name}.json`;

const Erc20Abi = require(`../abis/ERC20.json`);
const RouterAbi = require(`../abis/IUniswapV2Router02.json`);
const FactoryAbi = require(`../abis/IUniswapV2Factory.json`);
const PairAbi = require(`../abis/IUniswapV2Pair.json`);

async function main() {
  console.log(`Found ${configs.tokenConfigs.length} configs.`);

  await isValidBaseConfig();
  const detailedConfigs = await createConfigs();
  await setConfigsOnOracle(detailedConfigs);
};

const isValidBaseConfig = async () => {
  const RouterI = new hre.ethers.Contract(configs.UniswapV2Router, RouterAbi, hre.ethers.provider.getSigner());
  let weth;
  try {
    weth = await RouterI.WETH();
  } catch (e) {
    const tempAbi = [`function ${configs.baseAsset}() view returns (address)`];
    const TempRouterI = new hre.ethers.Contract(configs.UniswapV2Router, tempAbi, hre.ethers.provider.getSigner());
    weth = await TempRouterI[`${configs.baseAsset}()`]();
  }
  if (configs.tokenConfigs[0].underlying.toLowerCase() !== weth.toLowerCase()) throw Error("Base config incorrect underlying");
  if (configs.tokenConfigs[0].symbol) {
    const WethI = new hre.ethers.Contract(weth, Erc20Abi, hre.ethers.provider.getSigner());
    const wethSymbol = await WethI.symbol();
    if (configs.tokenConfigs[0].symbol !== wethSymbol) throw Error("Base config incorrect symbol");
  }
  if (!configs.tokenConfigs[0].uniswapMarket) throw Error("Base config needs uniswap market");
  if (configs.tokenConfigs[0].priceSource !== "1") throw Error("Base config incorrect priceSource");

  console.log("Verified Base Config");
};

const createConfigs = async () => {
  const tokenConfigs = configs.tokenConfigs;
  const detailedConfigs = [];
  for (let i = 0; i < tokenConfigs.length; i++) {
    const tokenConfig = await createConfig(tokenConfigs[i], i);
    detailedConfigs.push(tokenConfig);
  }
  return detailedConfigs;
}

const createConfig = async (config, configIndex) => {

  let tokenConfig = {
    underlying: '',
    symbolHash: '',
    baseUnit: '',
    priceSource: '',
    fixedPrice: '0',
    uniswapMarket: hre.ethers.constants.AddressZero,
    isUniswapReversed: false,
    isPairWithStablecoin: false,
    externalOracle: hre.ethers.constants.AddressZero,
    repointedAsset: hre.ethers.constants.AddressZero,
    symbol: '',
    uniLpCalcParams: UniLpCalcParams.Default,
  };

  tokenConfig.underlying = config.underlying;
  const Erc20I = new hre.ethers.Contract(config.underlying, Erc20Abi, hre.ethers.provider.getSigner());

  const erc20Decimals = await Erc20I.decimals();
  tokenConfig.baseUnit = numToWei("1", erc20Decimals);

  // Determine config's symbol
  if (config.symbol) {
    tokenConfig.symbol = config.symbol;
  } else {
    if (config.priceSource === "5") {
      const PairI = new hre.ethers.Contract(tokenConfig.underlying, PairAbi, hre.ethers.provider.getSigner());
      const [token0, token1] = await Promise.all([
        await PairI.token0(),
        await PairI.token1()
      ]);
      const Token0I = new hre.ethers.Contract(token0, Erc20Abi, hre.ethers.provider.getSigner());
      const Token1I = new hre.ethers.Contract(token1, Erc20Abi, hre.ethers.provider.getSigner());
      const [pairSym, token0Sym, token1Sym] = await Promise.all([
        await Erc20I.symbol(),
        await Token0I.symbol(),
        await Token1I.symbol()
      ]);
      tokenConfig.symbol = `${pairSym}--${token0Sym}--${token1Sym}`;
    } else {
      tokenConfig.symbol = await Erc20I.symbol();
    }
  }
  tokenConfig.symbolHash = hre.ethers.utils.keccak256(hre.ethers.utils.toUtf8Bytes(tokenConfig.symbol));

  if (!config.priceSource) throw Error(`priceSource not specified for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
  tokenConfig.priceSource = config.priceSource;

  switch (tokenConfig.priceSource) {
    // FIXED_USD
    case '0': {
      if (!config.fixedPrice) throw Error(`fixedPrice not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      tokenConfig.fixedPrice = numToWei(config.fixedPrice, configs.basePriceDecimals);
      break;
    }

    // UNISWAP
    case '1': {
      const RouterI = new hre.ethers.Contract(configs.UniswapV2Router, RouterAbi, hre.ethers.provider.getSigner());
      let weth;
      try {
        weth = await RouterI.WETH();
      } catch (e) {
        const tempAbi = [`function ${configs.baseAsset}() view returns (address)`];
        const TempRouterI = new hre.ethers.Contract(configs.UniswapV2Router, tempAbi, hre.ethers.provider.getSigner());
        weth = await TempRouterI[`${configs.baseAsset}()`]();
      }

      if (config.uniswapMarket) {
        tokenConfig.uniswapMarket = config.uniswapMarket;
      } else {
        const factory = await RouterI.factory();
        const FactoryI = new hre.ethers.Contract(factory, FactoryAbi, hre.ethers.provider.getSigner());
        const pair = await FactoryI.getPair(weth, config.underlying);
        if (pair === hre.ethers.constants.AddressZero) throw Error(`pair not found for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
        tokenConfig.uniswapMarket = pair;
      }
      const PairI = new hre.ethers.Contract(tokenConfig.uniswapMarket, PairAbi, hre.ethers.provider.getSigner());
      const token0 = await PairI.token0();
      const token1 = await PairI.token1();

      // isUniswapReversed is true when token1 === underlying
      tokenConfig.isUniswapReversed = token1.toLowerCase() === tokenConfig.underlying.toLowerCase();

      if (weth.toLowerCase() !== token0.toLowerCase() && weth.toLowerCase() !== token1.toLowerCase()) {
        tokenConfig.isPairWithStablecoin = true;
      }
      break;
    }

    // POSTER
    case '2': {
      // nothing needs to be done here for now
      break;
    }

    // EXTERNAL_ORACLE
    case '3': {
      if (!config.externalOracle) throw Error(`externalOracle not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      tokenConfig.externalOracle = config.externalOracle;
      break;
    }

    // REPOINT
    case '4': {
      if (!config.repointedAsset) throw Error(`repointedAsset not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      tokenConfig.repointedAsset = config.repointedAsset;
      break;
    }

    // UNI_V2_LP
    case '5': {
      if (!config.uniLpCalcParams) throw Error(`uniLpCalcParams not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      tokenConfig.uniLpCalcParams = config.uniLpCalcParams;
      break;
    }

    // CURVE_LP
    case '6': {
      if (!config.externalOracle) throw Error(`externalOracle not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      if (!config.repointedAsset) throw Error(`repointedAsset not provided for ${tokenConfig.underlying} - ${tokenConfig.symbol}`);
      tokenConfig.externalOracle = config.externalOracle;
      tokenConfig.repointedAsset = config.repointedAsset;
      break;
    }

    default: {
      throw Error(`invalid priceSource for ${tokenConfig.underlying} - ${tokenConfig.symbol}`)
    }
  }

  return tokenConfig;
}

const setConfigsOnOracle = async (_detailedConfigs) => {
  let detailedConfigs = JSON.parse(JSON.stringify(_detailedConfigs));
  const toBeAddedConfigs = [];

  const deployments = jsonfile.readFileSync(deploymentFilePath);
  const oracles = deployments['UniswapOracleTWAP'];
  const oracle = oracles[oracles.length - 1].address;

  const UniswapOracleTWAP = await hre.ethers.getContractFactory("UniswapOracleTWAP");
  const OracleI = await UniswapOracleTWAP.attach(oracle);

  // filter already set token configs
  for (let i = 0; i < detailedConfigs.length; i++) {
    const tokenConfig = detailedConfigs[i];
    try {
      await OracleI.getTokenConfigByUnderlying(tokenConfig.underlying);
    } catch (e) {
      if (e.error.message.includes("token config not found")) {
        toBeAddedConfigs.push(tokenConfig);
      } else {
        throw Error(e);
      }
    }
  }

  if (toBeAddedConfigs.length === 0) {
    console.log('No configs found to be added');
    return;
  }
  const estimatedGas = await OracleI.estimateGas._setConfigs(toBeAddedConfigs);
  const tx = await OracleI._setConfigs(toBeAddedConfigs, {
    gasLimit: toBn(estimatedGas.toString()).times(1.25).toFixed(0),
  });
  console.log(`Configs set in txn: ${tx.hash}`)
  await tx.wait();
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
