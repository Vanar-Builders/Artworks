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
    ArtworksRegistry public registry;

    struct Collection {
        address nftContract;
        string name;
    }

    struct Listing {
        address seller;
        uint256 price;
        uint256 amount;
    }

    mapping(address => mapping(string => Collection)) public collections;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event CollectionCreated(address indexed creator, address nftContract, string name);
    event NFTMinted(address indexed nftContract, uint256 tokenId, address indexed to, uint256 amount);
    event NFTListed(
        address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price
    );
    event NFTBought(
        address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price
    );
    event NFTListingCancelled(address indexed seller, address indexed nftContract, uint256 indexed tokenId);

    constructor(address _registry) Ownable(msg.sender) {
        registry = ArtworksRegistry(_registry);
    }

    function createCollection(
        string memory nftTitle,
        string memory symbol,
        string memory uri,
        string memory collectionName,
        bool isERC721
    ) external {
        require(bytes(collections[msg.sender][collectionName].name).length == 0, "Collection exists");
        string memory name = registry.getArtist(msg.sender);
        require(bytes(name).length > 0, "Not registered artist");

        if (isERC721) {
            ArtworkERC721NFT nft = new ArtworkERC721NFT(nftTitle, symbol, msg.sender);
            collections[msg.sender][collectionName] = Collection(address(nft), collectionName);
            registry.createCollection(collectionName);
            emit CollectionCreated(msg.sender, address(nft), collectionName);
        } else {
            ArtworkERC1155NFT nft = new ArtworkERC1155NFT(uri, msg.sender);
            collections[msg.sender][collectionName] = Collection(address(nft), collectionName);
            registry.createCollection(collectionName);
            emit CollectionCreated(msg.sender, address(nft), collectionName);
        }     
    }

    function mintNFT(
        string memory collectionName,
        string memory tokenURI,
        uint256 amount,
        bytes memory data,
        bool isERC721
    ) external payable {
        Collection storage collection = collections[msg.sender][collectionName];
        require(bytes(collection.name).length > 0, "Collection does not exist");

        if (isERC721) {
            ArtworkERC721NFT nft = ArtworkERC721NFT(collection.nftContract);
            require(msg.sender == nft.owner(), "Only collection owner can mint");
            uint256 tokenId = nft.mintNFT(tokenURI);
            emit NFTMinted(address(nft), tokenId, msg.sender, 1);
        } else {
            ArtworkERC1155NFT nft = ArtworkERC1155NFT(collection.nftContract);
            require(msg.sender == nft.owner(), "Only collection owner can mint");
            uint256 tokenId = nft.mintNFT(msg.sender, amount, data);
            emit NFTMinted(address(nft), tokenId, msg.sender, amount);
        }
    }

    function approveMarketplace(address nftContract, bool isERC721) external {
        if (isERC721) {
            IERC721(nftContract).setApprovalForAll(address(this), true);
        } else {
            IERC1155(nftContract).setApprovalForAll(address(this), true);
        }
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 amount, uint256 price) external {
        if (IERC721(nftContract).supportsInterface(type(IERC721).interfaceId)) {
            require(IERC721(nftContract).ownerOf(tokenId) == msg.sender, "Not owner");
            require(IERC721(nftContract).isApprovedForAll(msg.sender, address(this)), "Not approved");
        } else if (IERC1155(nftContract).supportsInterface(type(IERC1155).interfaceId)) {
            require(IERC1155(nftContract).balanceOf(msg.sender, tokenId) >= amount, "Not enough balance");
            require(IERC1155(nftContract).isApprovedForAll(msg.sender, address(this)), "Not approved");
        } else {
            revert("Unsupported token type");
        }

        listings[nftContract][tokenId] = Listing({seller: msg.sender, price: price, amount: amount});
        emit NFTListed(msg.sender, nftContract, tokenId, amount, price);
    }

    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not seller");
        delete listings[nftContract][tokenId];
        emit NFTListingCancelled(msg.sender, nftContract, tokenId);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price == msg.value, "Incorrect value");

        if (IERC721(nftContract).supportsInterface(type(IERC721).interfaceId)) {
            IERC721(nftContract).safeTransferFrom(listing.seller, msg.sender, tokenId);
        } else if (IERC1155(nftContract).supportsInterface(type(IERC1155).interfaceId)) {
            IERC1155(nftContract).safeTransferFrom(listing.seller, msg.sender, tokenId, listing.amount, "");
        } else {
            revert("Unsupported token type");
        }

        payable(listing.seller).transfer(msg.value);
        delete listings[nftContract][tokenId];
        emit NFTBought(msg.sender, nftContract, tokenId, listing.amount, listing.price);
    }

    function getListing(address nftContract, uint256 tokenId) external view returns (Listing memory) {
        return listings[nftContract][tokenId];
    }
}