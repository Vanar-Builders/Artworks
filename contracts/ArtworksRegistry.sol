// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ArtworksRegistry is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Artist {
        string name;
        string profileURI;
    }

    struct Artwork {
        uint256 id;
        address artist;
        string title;
        string pictureURI;
        uint256 nftPrice;
        bool isNFTMinted;
    }

    struct Collection {
        string name;
        uint256[] artworkIds;
    }

    mapping(address => Artist) public artists;
    mapping(uint256 => Artwork) public artworks;
    mapping(address => mapping(string => Collection)) public collections;

    event ArtistRegistered(address indexed artistAddress, string name);
    event ArtworkAdded(uint256 indexed artworkId, address indexed artist, string title);
    event ArtworkStreamed(uint256 indexed artworkId, address indexed listener);
    event NFTMinted(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event CollectionCreated(address indexed creator, string name);
    event ArtworkAddedToCollection(address indexed creator, string collectionName, uint256 artworkId);

    function registerArtist(string memory _name, string memory _profileURI) external {
        require(bytes(artists[msg.sender].name).length == 0, "Artist already registered");
        artists[msg.sender] = Artist(_name, _profileURI);
        emit ArtistRegistered(msg.sender, _name);
    }

    function addArtwork(string memory _title, string memory _pictureURI, uint256 _nftPrice) external {
        require(bytes(artists[msg.sender].name).length > 0, "Artist not registered");
        _tokenIds.increment();
        uint256 newArtworkId = _tokenIds.current();

        artworks[newArtworkId] = Artwork(newArtworkId, msg.sender, _title, _pictureURI, _nftPrice, false);
        emit ArtworkAdded(newArtworkId, msg.sender, _title);
    }

    function createCollection(string memory _name) external {
        require(collections[msg.sender][_name].artworkIds.length == 0, "Collection already exists");
        collections[msg.sender][_name] = Collection(_name, new uint256[](0));
        emit CollectionCreated(msg.sender, _name);
    }

    function addArtworkToCollection(string memory _collectionName, uint256 _artworkId) external {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
        require(collections[msg.sender][_collectionName].artworkIds.length > 0, "Collection does not exist");
        collections[msg.sender][_collectionName].artworkIds.push(_artworkId);
        emit ArtworkAddedToCollection(msg.sender, _collectionName, _artworkId);
    }

    function getCollection(address _user, string memory _collectionName) external view returns (uint256[] memory) {
        return collections[_user][_collectionName].artworkIds;
    }

    function getArtworkDetails(uint256 _artworkId) external view returns (Artwork memory) {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
        return artworks[_artworkId];
    }
}
