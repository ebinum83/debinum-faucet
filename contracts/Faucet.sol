// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Faucet {
    // The address of the owner of the faucet
    address public owner;

    // The amount of tokens to send per request
    uint256 public amount;

    // The mapping of test tokens to their addresses
    mapping(string => address) public testTokens;
    mapping(string => string) public testTokenSymbols; // Add mapping for token symbols

    // The event that is emitted when tokens are sent
    event TokensSent(address indexed recipient, string token, uint256 amount);

    // The modifier that checks if the caller is the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    // The constructor that sets the owner and the amount
    constructor(uint256 _amount) {
        owner = msg.sender;
        amount = _amount;
    }

    // The function that allows the owner to add a test token
    function addTestToken(string memory _name, string memory _symbol, address _address) public onlyOwner {
        require(_address != address(0), "Invalid token address");
        require(testTokens[_name] == address(0), "Token already exists");
        testTokens[_name] = _address;
        testTokenSymbols[_name] = _symbol; // Store the token symbol
    }

    // The function that allows the owner to remove a test token
    function removeTestToken(string memory _name) public onlyOwner {
        require(testTokens[_name] != address(0), "Token does not exist");
        delete testTokens[_name];
        delete testTokenSymbols[_name]; // Also remove the token symbol
    }

    // The function that allows anyone to request tokens from the faucet
    function requestTokens(string memory _token) public {
        require(testTokens[_token] != address(0), "Token does not exist");
        IERC20 token = IERC20(testTokens[_token]);
        require(token.balanceOf(address(this)) >= amount, "Insufficient faucet balance");
        token.transfer(msg.sender, amount);
        emit TokensSent(msg.sender, _token, amount);
    }
}
