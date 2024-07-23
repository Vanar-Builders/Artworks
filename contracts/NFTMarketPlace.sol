// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftMarketplace is ReentrancyGuard {

 
    address payable public immutable feeAccount; // the account that recieves fees
    uint256 public immutable feePercent; // the fee percentage on sales
    uint256 public collectionCount;
    uint256 public artworkCount;

    // Struct to store Collection details
    struct Collection {
        string name;
        uint256[] artworkIds;
        IERC721 nft;
    }

    struct Artwork {
        string name;
        uint256 tokenId;
        IERC721 nft;
        uint256 price;
        string artist;
    }

    constructor(uint _feePercent){
        feeAccount = payable(msg.sender);
        feePercent = _feePercent;
    }

    function mintNFT(string memory _tokenURI, uint artWork, string collection) external payable returns (uint) {
         address NFT_address = IArtworks_registry(registry_address).getNFTContractForCollection(collection)
        IERC721(NFT_address).mint(_tokenURI)
        IArtworks_registry(address).markMinted(artWork);
    }

    function createArtCollection(string memory name) {
    NFTContract newColll = new NFTContract(params);
    IArtworks_registry(address).addCollection(address(newColll), params);
  }
}