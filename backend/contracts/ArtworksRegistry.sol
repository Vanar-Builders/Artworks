// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtworksRegistry is Ownable {
    uint256 private _tokenIds;

    struct Artist {
        string name;
        address walletAddress;
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

<<<<<<< HEAD
    modifier onlyRegisteredArtist() {
        require(bytes(artists[tx.origin].name).length > 0, "Artist not registered");
=======
    modifier onlyRegisteredArtist(address _artist) {
        require(bytes(artists[_artist].name).length > 0, "Artist not registered");
>>>>>>> 31c07f7df8d29eab1ba9286b0ee27d2af5240f01
        _;
    }

    constructor(address initialOwner) Ownable(initialOwner) {
        transferOwnership(initialOwner);
    }

    function getArtist(address _artist) view public returns (string memory) {
        return artists[_artist].name;
    }

    function registerArtist(string memory _name, address _artistAddress) external {
        require(bytes(artists[_artistAddress].name).length == 0, "Artist already registered");
        artists[_artistAddress] = Artist(_name, _artistAddress);
        emit ArtistRegistered(_artistAddress, _name);
    }

    function addArtwork(address _artist, string memory _title, string memory _pictureURI, uint256 _nftPrice, uint256 tokenId) 
        external onlyRegisteredArtist(_artist) 
    {
        uint256 newArtworkId = tokenId;
<<<<<<< HEAD
        artworks[newArtworkId] = Artwork(newArtworkId, tx.origin, _title, _pictureURI, _nftPrice, false);
        emit ArtworkAdded(newArtworkId, tx.origin, _title);
    }

    function createCollection(string memory _name) external onlyRegisteredArtist {
        require(collections[tx.origin][_name].artworkIds.length == 0, "Collection already exists");
        collections[tx.origin][_name] = Collection(_name, new uint256[](0));
        emit CollectionCreated(tx.origin, _name);
=======

        artworks[newArtworkId] = Artwork(newArtworkId, _artist, _title, _pictureURI, _nftPrice, false);
        emit ArtworkAdded(newArtworkId, _artist, _title);
    }

    function createCollection(address _artist, string memory _name) 
        external onlyRegisteredArtist(_artist) 
    {
        require(collections[_artist][_name].artworkIds.length == 0, "Collection already exists");
        collections[_artist][_name] = Collection(_name, new uint256[](0));
        emit CollectionCreated(_artist, _name);
>>>>>>> 31c07f7df8d29eab1ba9286b0ee27d2af5240f01
    }

    function addArtworkToCollection(address _artist, string memory _collectionName, uint256 _artworkId) 
        external onlyRegisteredArtist(_artist) 
    {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
<<<<<<< HEAD
        require(collections[tx.origin][_collectionName].artworkIds.length > 0, "Collection does not exist");
        collections[tx.origin][_collectionName].artworkIds.push(_artworkId);
        emit ArtworkAddedToCollection(tx.origin, _collectionName, _artworkId);
=======
        require(collections[_artist][_collectionName].artworkIds.length > 0, "Collection does not exist");
        collections[_artist][_collectionName].artworkIds.push(_artworkId);
        emit ArtworkAddedToCollection(_artist, _collectionName, _artworkId);
>>>>>>> 31c07f7df8d29eab1ba9286b0ee27d2af5240f01
    }

    function getCollection(address _user, string memory _collectionName) 
        external view returns (uint256[] memory) 
    {
        return collections[_user][_collectionName].artworkIds;
    }

    function getArtworkDetails(uint256 _artworkId) 
        external view returns (Artwork memory) 
    {
        require(artworks[_artworkId].id != 0, "Artwork does not exist");
        return artworks[_artworkId];
    }
}
