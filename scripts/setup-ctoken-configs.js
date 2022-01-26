
const hre = require("hardhat");
const jsonfile = require('jsonfile')
const configs = require(`./configs/${hre.network.name}`);
const deploymentFilePath = `./deployments/${hre.network.name}.json`;

const CErc20Abi = require(`../abis/CErc20.json`);

async function main() {
  console.log(`Found ${configs.cTokenConfigs.cTokens.length} CToken configs.`);

  const deployments = jsonfile.readFileSync(deploymentFilePath);
  const oracles = deployments['UniswapOracleTWAP'];
  const oracle = oracles[oracles.length - 1].address;

  const UniswapOracleTWAP = await hre.ethers.getContractFactory("UniswapOracleTWAP");
  const OracleI = await UniswapOracleTWAP.attach(oracle);

  const cTokens = [];
  const underlyings = [];

  for (let i = 0; i < configs.cTokenConfigs.cTokens.length; i++) {
    const cTokenAddr = configs.cTokenConfigs.cTokens[i];
    const oracleUnderlying = await OracleI.underlyings(cTokenAddr);
    if (oracleUnderlying === hre.ethers.constants.AddressZero) {
      cTokens.push(configs.cTokenConfigs.cTokens[i]);

      const CErc20I = new hre.ethers.Contract(cTokenAddr, CErc20Abi, hre.ethers.provider.getSigner());
      const cTokenUnderlying = await CErc20I.underlying();
      underlyings.push(cTokenUnderlying);
    }
  }

  if (cTokens.length !== underlyings.length) throw Error("configs length mismatch");

  if (cTokens.length === 0) {
    console.log('No configs found to be added');
    return;
  }

  const tx = await OracleI._setUnderlyingForCTokens(cTokens, underlyings);
  console.log(`CToken Configs set in txn: ${tx.hash}`)
  await tx.wait();
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
