// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC721 extension for storing token URIs
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MarketPlace is ERC721URIStorage {

    // Declares a private counter for tracking token IDs.
    Counters.Counter private _tokenIds;

    // struct to manage the Artist's information
    struct Artist {
        string name;
        string profileURI;
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
    // Mapping of song IDs to artworks details
    mapping(uint256 => Artwork) public artworks;
    // Mapping of addresses and collection names to playlists
    mapping(address => mapping(string => Collection)) public collection;

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

    // Function to add a song with title, picture URI, and NFT price
    function addArtwork(string memory _title, string memory _pictureURI, uint256 _nftPrice) external {
        require(bytes(artists[msg.sender].name).length > 0, "Artist not registered");
        _tokenIds.increment();
        uint256 newArtworkId = _tokenIds.current();

        artworks[newArtworkId] = Artwork(newSongId, msg.sender, _title, _pictureURI, 0, _nftPrice, false);
        emit ArtworkAdded(newArtworkId, msg.sender, _title);
    }

}