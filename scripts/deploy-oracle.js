
const hre = require("hardhat");
const jsonfile = require('jsonfile')

const { numToWei } = require("../utils/ethUnitParser");

const configs = require(`./configs/${hre.network.name}`);
const outputFilePath = `./deployments/${hre.network.name}.json`;

async function main() {
  console.log(`Deploying ${hre.network.name} TWAP with time period: ${configs.twapWindow / 60} minutes (${configs.twapWindow / 3600} hours)`)

  const UniswapOracleTWAP = await hre.ethers.getContractFactory("UniswapOracleTWAP");
  const basePricePrecision = numToWei("1", configs.basePriceDecimals);
  const oracle = await UniswapOracleTWAP.deploy(configs.twapWindow, configs.baseAsset, basePricePrecision);
  console.log("UniswapOracleTWAP deployed to:", oracle.address);
  saveAddress('UniswapOracleTWAP', oracle.address);

  // await oracle.deployTransaction.wait(15);
  // await verifyContract(oracle.address, [configs.twapWindow, configs.baseAsset, basePricePrecision]);
}

const saveAddress = (contractName, contractAddress) => {
  let newData = { ...jsonfile.readFileSync(outputFilePath) };

  if (!newData[contractName]) newData[contractName] = []
  newData[contractName].push({
    address: contractAddress
  });
  jsonfile.writeFileSync(outputFilePath, newData, { spaces: 2 });
}

const verifyContract = async (contractAddress, constructorArgs) => {
  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArgs,
  });
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
