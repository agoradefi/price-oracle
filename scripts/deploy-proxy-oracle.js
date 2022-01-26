
const hre = require("hardhat");
const jsonfile = require('jsonfile')
const outputFilePath = `./deployments/${hre.network.name}.json`;

const ContractName = "ProxyOracle";

async function main() {
  console.log(`Deploying ${ContractName}`);

  const Contract = await hre.ethers.getContractFactory(ContractName);
  const contract = await Contract.deploy();
  console.log(`${ContractName} deployed to: ${contract.address}`);
  saveAddress(ContractName, contract.address);
}

const saveAddress = (contractName, contractAddress) => {
  let newData = { ...jsonfile.readFileSync(outputFilePath) };

  newData[contractName] = contractAddress;
  jsonfile.writeFileSync(outputFilePath, newData, { spaces: 2 });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
