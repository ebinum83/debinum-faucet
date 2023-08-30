// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Router.sol";

contract Uniswap is Router {
    constructor() Router("Uniswap", "UNI", 100000000000000 * 10 ** decimals()) {}
}
