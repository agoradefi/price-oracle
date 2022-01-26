
require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const privateKey = process.env.privateKey;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: "https://andromeda.metis.io/?owner=1088",
      },
    },
    metis: {
      url: process.env.metisRpc || "https://andromeda.metis.io/?owner=1088",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.6.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999
      }
    }
  },
  etherscan: {
    apiKey: process.env.etherscanApiKey,
  },
};
