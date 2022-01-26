const { ethers } = require("hardhat");
const { toBn } = require("../utils/bn");
const { numToWei, weiToNum } = require("../utils/ethUnitParser");

const configs = {
  twapWindow: "1",
  baseAsset: "Metis",
  basePricePrecision: "1000000",
};

const oracleConfigs = [];

describe("Forked", () => {
  const myAccount = "";

  let signer;
  let twapOracle;

  before(async () => {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [myAccount],
    });
    signer = await ethers.getSigner(myAccount);
    console.log(`>>>>>>>>>>>> Deployer: ${signer.address} <<<<<<<<<<<<`);

    const UniswapOracleTWAP = await ethers.getContractFactory("UniswapOracleTWAP");
    twapOracle = await UniswapOracleTWAP.connect(signer).deploy(configs.twapWindow, configs.baseAsset, configs.basePricePrecision);
    await twapOracle.deployed();
    console.log(`UniswapOracleTWAP contract deployed at: ${twapOracle.address}`);
  });

  it("Should", async () => {
    await twapOracle._setConfigs(oracleConfigs);
    await twapOracle.updateAllPrices();

    const oraclePrices = [];
    for (let i = 0; i < oracleConfigs.length; i++) {
      const priceRaw = await twapOracle["price(address)"](oracleConfigs[i].underlying);
      oraclePrices.push({
        symbol: oracleConfigs[i].symbol,
        price: toBn(priceRaw).div(configs.basePricePrecision).toFixed(),
      });
    }
    console.log("\nUnderlying Prices on oracle ==========================>");
    console.table(oraclePrices);

    const marketLpPrices = [];
    for (let i = 0; i < oracleConfigs.length; i++) {
      if (oracleConfigs[i].priceSource == 5) {
        const pairI = await ethers.getContractAt("IUniswapV2Pair", oracleConfigs[i].underlying);
        const [lpSupply, token0, token1, reserves] = await Promise.all([
          pairI.totalSupply(),
          pairI.token0(),
          pairI.token1(),
          pairI.getReserves(),
        ]);
        const token0I = await ethers.getContractAt("IERC20", token0);
        const token1I = await ethers.getContractAt("IERC20", token1);

        const [token0Dec, token1Dec, token0Price, token1Price, token0Sym, token1Sym] = await Promise.all([
          token0I.decimals(),
          token1I.decimals(),
          twapOracle["price(address)"](token0),
          twapOracle["price(address)"](token1),
          token0I.symbol(),
          token1I.symbol(),
        ]);
        const totalValueToken0 = toBn(weiToNum(reserves[0], token0Dec)).times(toBn(token0Price).div(configs.basePricePrecision));
        const totalValueToken1 = toBn(weiToNum(reserves[1], token1Dec)).times(toBn(token1Price).div(configs.basePricePrecision));
        const lpPrice = toBn(totalValueToken0).plus(totalValueToken1).div(weiToNum(lpSupply, 18)).toFixed();

        marketLpPrices.push({
          symbol: `${token0Sym}-${token1Sym} LP`,
          price: lpPrice,
        });
      }
    }
    console.log("\nMarket Prices ==========================>");
    console.table(marketLpPrices);

  }).timeout(100000000);
});
