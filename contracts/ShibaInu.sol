// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Router.sol";

contract ShibaInu is Router {
    constructor() Router("ShibaInu", "SHIB", 100000000000000 * 10 ** decimals()) {}
}
