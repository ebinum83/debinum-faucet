const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();
const INFURAKEY = "" || process.env.INFURAKEY;
const PRIVATEKEY = "" || process.env.PRIVATEKEY;

module.exports = {
  networks: {
    dev: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      websockets: true,
    },
    sepolia: {
      provider: () => {
        return new HDWalletProvider(
          PRIVATEKEY,
          `https://sepolia.infura.io/v3/${INFURAKEY}`,
        );
      },
      network_id: 11155111,
      // confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
    goerli: {
      provider: () => {
        return new HDWalletProvider(
          PRIVATEKEY,
          `https://goerli.infura.io/v3/${INFURAKEY}`,
        );
      },
      network_id: 5,
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  },
  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000,
  },

  contracts_build_directory: "./contracts/build",

  // Configure your compilers
  compilers: {
    solc: {
      version: "pragma",
      settings: {
        optimizer: {
          enabled: true,
          runs: 9999999,
        }, //  evmVersion: "byzantium"
      },
    },
  },
};
