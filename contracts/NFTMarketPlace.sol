// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ArtworkERC721NFT.sol";
import "./ArtworkERC1155NFT.sol";
import "./ArtworksRegistry.sol";

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarketplace is ReentrancyGuard {
    struct Collection {
        address collectionAddress;
        string name;
        bool isERC1155;
    }

    mapping(string => Collection) public collections;
    ArtworksRegistry public registry;

    event CollectionCreated(string indexed name, address indexed collectionAddress, bool isERC1155);
    event NFTMinted(uint256 indexed tokenId, address indexed collectionAddress, uint256 tokenIdInCollection, bool isERC1155);

    constructor(address _registryAddress) {
        registry = ArtworksRegistry(_registryAddress);
    }

    function createERC721Collection(string memory name, string memory symbol) public {
        require(collections[name].collectionAddress == address(0), "Collection already exists");

        ArtworkERC721NFT newCollection = new ArtworkERC721NFT(name, symbol);
        collections[name] = Collection(address(newCollection), name, false);

        // Register the collection in the registry
        registry.createCollection(name);

        emit CollectionCreated(name, address(newCollection), false);
    }

    function createArtworkERC1155NFT(string memory name, string memory symbol, string memory uri) public {
        require(collections[name].collectionAddress == address(0), "Collection already exists");

        ArtworkERC1155NFT newCollection = new ArtworkERC1155NFT(name, symbol, uri);
        collections[name] = Collection(address(newCollection), name, true);

        // Register the collection in the registry
        registry.createCollection(name);

        emit CollectionCreated(name, address(newCollection), true);
    }

    function mintInERC721Collection(string memory name, address recipient, string memory title, string memory pictureURI, uint256 nftPrice) public {
        Collection memory collection = collections[name];
        require(collection.collectionAddress != address(0), "Collection does not exist");
        require(!collection.isERC1155, "Not an ERC721 collection");

        ArtworkERC721NFT ArtworkERC721NFT = ArtworkERC721NFT(collection.collectionAddress);
        uint256 tokenId = ArtworkERC721NFT.mintNFT(recipient);

        // Add the artwork to the registry
        registry.addArtwork(title, pictureURI, nftPrice);
        uint256 artworkId = registry.getArtworkId();

        // Associate the minted NFT with the artwork
        registry.addArtworkToCollection(name, artworkId);

        emit NFTMinted(tokenId, collection.collectionAddress, tokenId, false);
    }

    function mintInArtworkERC1155NFT(string memory name, address recipient, uint256 amount, bytes memory data, string memory title, string memory pictureURI, uint256 nftPrice) public {
        Collection memory collection = collections[name];
        require(collection.collectionAddress != address(0), "Collection does not exist");
        require(collection.isERC1155, "Not an ERC1155 collection");

        ArtworkERC1155NFT artworkERC1155NFT = ArtworkERC1155NFT(collection.collectionAddress);
        uint256 tokenId = artworkERC1155NFT.mintNFT(recipient, amount, data);

        // Add the artwork to the registry
        registry.addArtwork(title, pictureURI, nftPrice);
        uint256 artworkId = registry.getArtworkId();

        // Associate the minted NFT with the artwork
        registry.addArtworkToCollection(name, artworkId);

        emit NFTMinted(tokenId, collection.collectionAddress, tokenId, true);
    }
}
