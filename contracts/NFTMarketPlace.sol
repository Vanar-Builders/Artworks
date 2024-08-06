// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "./ArtworkERC721NFT.sol";
import "./ArtworkERC1155NFT.sol";
import "./ArtworksRegistry.sol";

contract NftMarketplace is Ownable, ERC721Holder, ERC1155Holder {
    // Reference to the ArtworksRegistry contract
    ArtworksRegistry public registry;

    // Struct to store collection details
    struct Collection {
        address nftContract;
        string name;
    }

    // Struct to store listing details
    struct Listing {
        address seller;
        address nftContract;
        uint256 tokenId;
        uint256 amount;
        uint256 price;
    }

    // Mapping to store collections created by artists
    mapping(address => mapping(string => Collection)) public collections;
    // Mapping to store listings by NFT contract and tokenId
    mapping(address => mapping(uint256 => Listing)) public listings;

    // Events to emit when various actions are performed
    event CollectionCreated(address indexed creator, address nftContract, string name);
    event NFTMinted(address indexed nftContract, uint256 tokenId, address indexed to, uint256 amount);
    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price);
    event NFTBought(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price);
    event NFTListingCancelled(address indexed seller, address indexed nftContract, uint256 indexed tokenId);

    // Constructor to initialize the marketplace with the ArtworksRegistry address
    constructor(address _registry) Ownable(msg.sender) {
        registry = ArtworksRegistry(_registry);
    }

    // Function to create a new ERC721 collection for an artist
    function createERC721Collection(string memory nftTile, string memory symbol, string memory collectionName) external {
        // Ensure the collection doesn't already exist
        require(bytes(collections[msg.sender][collectionName].name).length == 0, "Collection already exists");
        // Ensure the caller is a registered artist
        string memory name = registry.getArtist(msg.sender);
        require(bytes(name).length > 0, "Not a registered artist");

        // Create a new ERC721 contract and store it in the collections mapping
        ArtworkERC721NFT nft = new ArtworkERC721NFT(nftTile, symbol, msg.sender);
        collections[msg.sender][collectionName] = Collection(address(nft), collectionName);
        registry.createCollection(collectionName);

        // Emit an event for the creation of the collection
        emit CollectionCreated(msg.sender, address(nft), collectionName);
    }

    // Function to create a new ERC1155 collection for an artist
    function createERC1155Collection(string memory uri, string memory collectionName) external {
        // Ensure the collection doesn't already exist
        require(bytes(collections[msg.sender][collectionName].name).length == 0, "Collection already exists");
        // Ensure the caller is a registered artist
        string memory name = registry.getArtist(msg.sender);
        require(bytes(name).length > 0, "Not a registered artist");

        // Create a new ERC1155 contract and store it in the collections mapping
        ArtworkERC1155NFT nft = new ArtworkERC1155NFT(uri, msg.sender);
        collections[msg.sender][collectionName] = Collection(address(nft), collectionName);

        // Emit an event for the creation of the collection
        emit CollectionCreated(msg.sender, address(nft), collectionName);
    }

    // Function to mint a new ERC721 NFT
    function mintERC721NFT(string memory collectionName, string memory tokenURI) external payable {
        // Ensure the collection exists
        Collection storage collection = collections[msg.sender][collectionName];
        require(bytes(collection.name).length > 0, "Collection does not exist");

        // Ensure the caller is the owner of the collection
        ArtworkERC721NFT nftContract = ArtworkERC721NFT(collection.nftContract);
        require(msg.sender == nftContract.owner(), "Only collection owner can mint NFTs");

        // Mint the NFT and get the tokenId
        uint256 tokenId = nftContract.mintNFT(tokenURI);

        // Emit an event for the minting of the NFT
        emit NFTMinted(address(nftContract), tokenId, msg.sender, 1);
    }

    // Function to mint a new ERC1155 NFT
    function mintERC1155NFT(string memory collectionName, uint256 amount, bytes memory data)  external payable {
        // Ensure the collection exists
        Collection storage collection = collections[msg.sender][collectionName];
        require(bytes(collection.name).length > 0, "Collection does not exist");

        // Ensure the caller is the owner of the collection
        ArtworkERC1155NFT nftContract = ArtworkERC1155NFT(collection.nftContract);
        require(msg.sender == nftContract.owner(), "Only collection owner can mint NFTs");

        // Mint the NFT and get the tokenId
        uint256 tokenId = nftContract.mintNFT(msg.sender, amount, data);

        // Emit an event for the minting of the NFT
        emit NFTMinted(address(nftContract), tokenId, msg.sender, amount);
    }

    // Function to approve the marketplace to manage ERC721 tokens
    function approveMarketplaceForERC721(address nftContract) external {
        IERC721(nftContract).setApprovalForAll(address(this), true);
    }

    // Function to approve the marketplace to manage ERC1155 tokens
    function approveMarketplaceForERC1155(address nftContract) external {
        IERC1155(nftContract).setApprovalForAll(address(this), true);
    }

    // Function to list an NFT for sale
    function listNFT(address nftContract, uint256 tokenId, uint256 amount, uint256 price) external {
        IERC721 erc721 = IERC721(nftContract);
        IERC1155 erc1155 = IERC1155(nftContract);

        // Check if the token is ERC721 and the caller is the owner
        if (erc721.supportsInterface(type(IERC721).interfaceId)) {
            require(erc721.ownerOf(tokenId) == msg.sender, "Not the owner of the ERC721 token");
            require(erc721.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved to transfer ERC721 tokens");
        // Check if the token is ERC1155 and the caller has enough balance
        } else if (erc1155.supportsInterface(type(IERC1155).interfaceId)) {
            require(erc1155.balanceOf(msg.sender, tokenId) >= amount, "Not enough balance of the ERC1155 token");
            require(erc1155.isApprovedForAll(msg.sender, address(this)), "Marketplace not approved to transfer ERC1155 tokens");
        } else {
            revert("Unsupported token type");
        }

        // Store the listing details
        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            amount: amount,
            price: price
        });

        // Emit an event for the listing of the NFT
        emit NFTListed(msg.sender, nftContract, tokenId, amount, price);
    }

    // Function to cancel an NFT listing
    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        // Ensure the caller is the seller
        require(listing.seller == msg.sender, "Not the seller");

        // Delete the listing
        delete listings[nftContract][tokenId];

        // Emit an event for the cancellation of the listing
        emit NFTListingCancelled(msg.sender, nftContract, tokenId);
    }

    // Function to buy an NFT
    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        // Ensure the correct value is sent
        require(listing.price == msg.value, "Incorrect value sent");

        IERC721 erc721 = IERC721(nftContract);
        IERC1155 erc1155 = IERC1155(nftContract);

        // Transfer the token to the buyer
        if (erc721.supportsInterface(type(IERC721).interfaceId)) {
            erc721.safeTransferFrom(listing.seller, msg.sender, tokenId);
        } else if (erc1155.supportsInterface(type(IERC1155).interfaceId)) {
            erc1155.safeTransferFrom(listing.seller, msg.sender, tokenId, listing.amount, "");
        } else {
            revert("Unsupported token type");
        }

        // Transfer the payment to the seller
        payable(listing.seller).transfer(msg.value);
        // Delete the listing
        delete listings[nftContract][tokenId];

        // Emit an event for the purchase of the NFT
        emit NFTBought(msg.sender, nftContract, tokenId, listing.amount, listing.price);
    }

    // Function to get the details of an NFT listing
    function getListing(address nftContract, uint256 tokenId) external view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }
}
