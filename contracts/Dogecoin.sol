// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./Router.sol";

contract Dogecoin is Router {
    constructor() Router("Dogecoin", "DOGE", 100000000000000 * 10 ** decimals()) {}
}
