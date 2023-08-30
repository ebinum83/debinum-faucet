const Faucet = artifacts.require("Faucet");
const Aave = artifacts.require("Aave");
const CakeToken = artifacts.require("CakeToken");
const Dogecoin = artifacts.require("Dogecoin");
const DeboToken = artifacts.require("DeboToken");
const Uniswap = artifacts.require("Uniswap");
const USDCoin = artifacts.require("USDCoin");
const TetherToken = artifacts.require("TetherToken");
const ShibaInu = artifacts.require("ShibaInu");
const shelljs = require("shelljs");

module.exports = async function (deployer, network) {
  // The amount of test tokens to transfer to faucet contract
  const txferAmount = web3.utils.toWei("100000000000000", "ether");
  // The amount of tokens to send per request
  const dripAmount = web3.utils.toWei("1", "ether");

  await deployer.deploy(Faucet, dripAmount);
  const faucet = await Faucet.deployed();
  const faucetAddress = faucet.address;

  await deployer.deploy(Aave);
  const aave = await Aave.deployed();
  await aave.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("Aave", "AAVE", aave.address);
  console.log(`   AAVE deployed at ${aave.address}\n`);

  await deployer.deploy(CakeToken);
  const cake = await CakeToken.deployed();
  await cake.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("CakeToken", "CAKE", cake.address);
  console.log(`   CAKE deployed at ${cake.address}\n`);

  await deployer.deploy(Dogecoin);
  const doge = await Dogecoin.deployed();
  await doge.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("Dogecoin", "DOGE", doge.address);
  console.log(`   DOGE deployed at ${doge.address}\n`);

  await deployer.deploy(DeboToken);
  const debo = await DeboToken.deployed();
  await debo.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("DeboToken", "DEBO", debo.address);
  console.log(`   DEBO deployed at ${debo.address}\n`);

  await deployer.deploy(Uniswap);
  const uni = await Uniswap.deployed();
  await uni.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("Uniswap", "UNI", uni.address);
  console.log(`   UNI deployed at ${uni.address}\n`);

  await deployer.deploy(USDCoin);
  const usdc = await USDCoin.deployed();
  await usdc.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("USDCoin", "USDC", usdc.address);
  console.log(`   USDC deployed at ${usdc.address}\n`);

  await deployer.deploy(TetherToken);
  const usdt = await TetherToken.deployed();
  await usdt.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("TetherToken", "USDT", usdt.address);
  console.log(`   USDT deployed at ${usdt.address}\n`);

  await deployer.deploy(ShibaInu);
  const shib = await ShibaInu.deployed();
  await shib.transfer(faucetAddress, txferAmount);
  await faucet.addTestToken("ShibaInu", "SHIB", shib.address);
  console.log(`   SHIB deployed at ${shib.address}\n`);

  console.log(`   Faucet deployed at ${faucetAddress}\n`);

  console.log(`   Copying contract source ABI to project src folder!!!\n`);
  shelljs.mkdir(`-p`, `./src/contracts/${network}/`);
  shelljs.cp(`-rf`, `./contracts/build/*`, `./src/contracts/${network}/`);
};
