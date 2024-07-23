// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ArtworkERC721NFT.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract NftMarketplace is ReentrancyGuard {

    struct Collection {
        address collectionAddress;
        string name;
    }

    mapping(string => Collection) public collections;

    event CollectionCreated(string indexed name, address indexed collectionAddress);

    function createERC721Collection(string memory name, string memory symbol) public {
        require(collections[name].collectionAddress == address(0), "Collection already exists");

        ArtworkERC721NFT newCollection = new ArtworkERC721NFT(name, symbol);
        collections[name] = Collection(address(newCollection), name);

        emit CollectionCreated(name, address(newCollection));
    }

    function mintInERC721Collection(string memory name, address tokenURI) public {
        Collection memory collection = collections[name];
        require(collection.collectionAddress != address(0), "Collection does not exist");

        ArtworkERC721NFT(collection.collectionAddress).mintNFT(tokenURI);
    }
}