// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftMarketplace is ReentrancyGuard {

 
    address payable public immutable feeAccount; // the account that recieves fees
    uint public immutable feePercent; // the fee percentage on sales


    constructor(uint _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }
}