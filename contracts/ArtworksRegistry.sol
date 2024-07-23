// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ArtworkERC721NFT.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtworksRegistry is Ownable {
        // Declares a private counter for tracking token IDs.
    Counters.Counter private _tokenIds;

    // struct to manage the Artist's information
    struct Artist {
        string name;
    }

    struct User {
        string name;
    }

    // struct to manage the Artwork's information
    struct Artwork {
        uint256 id;
        address artist;
        string title;
        string pictureURI;
        uint256 nftPrice;
        bool isNFTMinted;
    }

    // Struct to store Collection details
    struct Collection {
        string name;
        uint256[] artworkIds;
    }

    // Mapping of addresses to artist details
    mapping(address => Artist) public artists;
    // Mapping of artworks IDs to artworks details
    mapping(uint256 => Artwork) public artworks;
    // Mapping of addresses and artworks names to collections
    mapping(address => mapping(string => Collection)) public collections;

    // Events to log actions
    event ArtistRegistered(address indexed artistAddress, string name);
    event ArtworkAdded(uint256 indexed artworkId, address indexed artist, string title);
    event ArtworkStreamed(uint256 indexed artworkId, address indexed listener);
    event NFTMinted(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event CollectionCreated(address indexed creator, string name);
    event ArtworkAddedToCollection(address indexed creator, string CollectionName, uint256 artworkId);

    // Function to register an artist with name and profile URI
    function registerArtist(string memory _name, string memory _profileURI) external {
        require(bytes(artists[msg.sender].name).length == 0, "Artist already registered");
        artists[msg.sender] = Artist(_name, _profileURI);
        emit ArtistRegistered(msg.sender, _name);
    }

    // Function to add a artwork with title, picture URI, and NFT price
    function addArtwork(string memory _title, string memory _pictureURI, uint256 _nftPrice) external {
        require(bytes(artists[msg.sender].name).length > 0, "Artist not registered");
        _tokenIds.increment();
        uint256 newArtworkId = _tokenIds.current();

        artworks[newArtworkId] = Artwork(newartworkId, msg.sender, _title, _pictureURI, 0, _nftPrice, false);
        emit ArtworkAdded(newArtworkId, msg.sender, _title);
    }

    // Function to create a collection with a given name
    function createCollection(string memory _name) external {
        require(collections[msg.sender][_name].artworkIds.length == 0, "Collection already exists");
        _artworkId[msg.sender][_name] = Collection(_name, new uint256[](0));
        emit CollectionCreated(msg.sender, _name);
    }

    // Function to add a artwork to an existing collection
    function addArtworkToCollection(string memory _collectionName, uint256 _artworkId) external {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
        require(collections[msg.sender][_collectionName].artworkIds.length > 0, "Collection does not exist");
        collections[msg.sender][_collectionName].artworkIds.push(_artworkId);
        emit ArtworkAddedToCollection(msg.sender, _collectionName, _artworkId);
    }

    // Function to get the artwork IDs in a user's collection
    function getCollection(address _user, string memory _collectionName) external view returns (uint256[] memory) {
        return collections[_user][_collectionName].artworkIds;
    }

    // Function to get the details of a specific artwork
    function getArtworkDetails(uint256 _artworkId) external view returns (artwork memory) {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
        return artworks[_artworkId];
    }
}

