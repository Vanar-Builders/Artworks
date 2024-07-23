// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ArtworkERC721NFT.sol";
import "./ArtworkERC1155NFT.sol";
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

    function createERC1155Collection(string memory name, string memory symbol, string memory uri) public {
        require(collections[name].collectionAddress == address(0), "Collection already exists");

        ERC1155Collection newCollection = new ERC1155Collection(name, symbol, uri);
        collections[name] = Collection(address(newCollection), name, true);

        emit CollectionCreated(name, address(newCollection), true);
    }

    function mintInERC1155Collection(string memory name, address recipient, uint256 amount, bytes memory data) public {
        Collection memory collection = collections[name];
        require(collection.collectionAddress != address(0), "Collection does not exist");
        require(collection.isERC1155, "Not an ERC1155 collection");

        ERC1155Collection(collection.collectionAddress).mintNFT(recipient, amount, data);
    }
}