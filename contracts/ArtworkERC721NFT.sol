// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import ERC721 extension for storing token URIs
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtworkERC721NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant ROYALTY_PERCENTAGE = 30; // 30% royalty on NFT minting

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mintNFT(string memory _tokenURI) external payable returns (uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    function payRoyalties() external {

        uint256 amount = royaltyBalance;
        royaltyBalance = 0;

        (bool success, ) = payable(artist).call{value: amount}("");
        require(success, "Royalty payout failed");

        emit RoyaltyPaid(artist, amount);
    }
}
