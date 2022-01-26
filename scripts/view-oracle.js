
const hre = require("hardhat");
const jsonfile = require('jsonfile')
const axios = require('axios').default;
const { numToWei, weiToNum } = require("../utils/ethUnitParser");
const { toBn, toBnFixed } = require("../utils/bn");
const deploymentFilePath = `./deployments/${hre.network.name}.json`;
const configs = require(`./configs/${hre.network.name}`);

async function main() {
  const deployments = jsonfile.readFileSync(deploymentFilePath);
  const oracles = deployments['UniswapOracleTWAP'];
  const oracle = oracles[oracles.length - 1].address;

  const OracleI = await hre.ethers.getContractAt("UniswapOracleTWAP", oracle);

  const numConfigs = await OracleI.numTokens();
  console.log("Total configs on Oracle:", toBnFixed(numConfigs));

  const allConfigs = [];

  for (let i = 0; i < numConfigs; i++) {
    const config = await OracleI.getTokenConfig(i);

    const configDetails = {
      underlying: config.underlying,
      symbolHash: config.symbolHash,
      baseUnit: toBnFixed(config.baseUnit),
      priceSource: config.priceSource,
      fixedPrice: toBnFixed(config.fixedPrice),
      uniswapMarket: config.uniswapMarket,
      isUniswapReversed: config.isUniswapReversed,
      isPairWithStablecoin: config.isPairWithStablecoin,
      externalOracle: config.externalOracle,
      repointedAsset: config.repointedAsset,
      symbol: config.symbol,
      uniLpCalcParams: {
        numFactor: toBnFixed(config.uniLpCalcParams.numFactor),
        denoFactor: toBnFixed(config.uniLpCalcParams.denoFactor),
      },
    }
    allConfigs.push(configDetails);
  }
  console.log("Deployed configs ==========================>");
  console.log(allConfigs);

  const cTokensArr = await getMappedCTokensArr(oracle);
  console.log("\nCTokens whose underlyings are set on oracle ==========================>");
  console.log(cTokensArr);
  console.log(`Number of CTokens mapped: ${cTokensArr.length}`);

  const oraclePrices = [];

  for (let i = 0; i < allConfigs.length; i++) {
    const priceRaw = await OracleI["price(address)"](allConfigs[i].underlying);
    oraclePrices.push({
      symbol: allConfigs[i].symbol,
      price: weiToNum(priceRaw, configs.basePriceDecimals),
    });
  }
  console.log("\nUnderlying Prices on oracle ==========================>");
  console.table(oraclePrices);

  console.log(`\nFound ${configs.cTokenConfigs.cTokens.length} CToken configs in config file.`);
  const priceData1 = await getCTokenPricesOnOracle(OracleI, configs.cTokenConfigs.cTokens, allConfigs, configs.basePriceDecimals);;
  console.log("Prices of CTokens from config file ==========================>");
  console.table(priceData1);

  console.log(`\nFound ${cTokensArr.length} mapped CTokens on oracle.`);
  const priceData2 = await getCTokenPricesOnOracle(OracleI, cTokensArr, allConfigs, configs.basePriceDecimals);
  console.log("Prices of mapped CTokens on oracle ==========================>");
  console.table(priceData2);
};

const getCTokenPricesOnOracle = async (OracleI, cTokensArr, allConfigs, basePriceDecimals) => {
  const priceData = [];

  for (let i = 0; i < cTokensArr.length; i++) {
    const cTokenAddr = cTokensArr[i];
    const oracleUnderlying = await OracleI.underlyings(cTokenAddr);
    const config = allConfigs.find(el => el.underlying === oracleUnderlying);
    const priceRaw = await OracleI["price(address)"](config.underlying);
    const underlyingPriceRaw = await OracleI.getUnderlyingPrice(cTokenAddr);
    const factor = toBn('10').pow('36').div(toBn(config.baseUnit));
    const underlyingPrice = toBn(underlyingPriceRaw).div(factor).toFixed();

    priceData.push({
      symbol: config.symbol,
      price: weiToNum(priceRaw, basePriceDecimals),
      'getUnderlyingPrice()': underlyingPrice
    });
  }
  return priceData;
}

const getMappedCTokensArr = async (oracleAddr) => {
  const endpoint = "https://graphql.bitquery.io/"
  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.bitqueryKey,
  }
  const query = `{
    ethereum(network: ${hre.network.name}) {
      smartContractEvents(
        smartContractAddress: {is: "${oracleAddr}"}
        smartContractEvent: {is: "CTokenUnderlyingUpdated(address,address)"}
        options: {asc: "block.height"}
      ) {
        arguments {
          argument
          value
        }
        block {
          height
        }
        eventIndex
      }
    }
  }`;

  const response = await axios.post(endpoint, JSON.stringify({ query }), {
    headers: headers
  });
  // return empty array if we can't find data 
  if (response.data.errors && response.data.errors.length > 0) return [];

  const eventData = response.data.data.ethereum.smartContractEvents;
  const sorted = eventData.sort((a, b) => {
    if (a.block.height !== b.block.height) return 0
    else return a.eventIndex - b.eventIndex
  });
  return sorted.map(a => a.arguments[0].value)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
