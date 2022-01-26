Price Oracle
=================

The Price Oracle is a set of Ethereum smart contracts for storing and providing on-chain prices for various assets. The contract supports Time Weighted Average Prices (TWAPs) for Uni-v2 pairs, Uni-v2 LP tokens and Curve's LP tokens.


Installation
------------
To run Price Oracle, pull the repository from GitHub and install its dependencies. You will need [npm](https://docs.npmjs.com/cli/install) installed.

    git clone https://github.com/agoradefi/price-oracle
    cd price-oracle
    npm ci

Deployment
------------
To deploy a new oracle instance you will first need to setup 
1. `.env` file
2. the configuration parameters in the file `./scripts/config/{network}.js` 

Then you can run the [deployment scripts](scripts) in the order

1. scripts/deploy-oracle.js
2. scripts/setup-oracle-config.js
3. scripts/setup-ctoken-configs.js

Scripts can be run using the command

    npm run hh -- --network {network-name} {script-path}

Currently deployed contracts can be found in [deployments](deployments/) directory.

Discussion
----------

For any concerns, open an issue or visit us at https://agoradefi.io/.