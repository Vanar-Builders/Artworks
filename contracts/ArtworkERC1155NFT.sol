// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtworkERC1155NFT is ERC1155, Ownable {
    uint256 public tokenCounter;
    string public name;
    string public symbol;

    constructor(string memory _name, string memory _symbol, string memory uri) ERC1155(uri) {
        name = _name;
        symbol = _symbol;
        tokenCounter = 0;
    }

    function mintNFT(address recipient, uint256 amount, bytes memory data) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(recipient, newTokenId, amount, data);
        tokenCounter += 1;
        return newTokenId;
    }
}