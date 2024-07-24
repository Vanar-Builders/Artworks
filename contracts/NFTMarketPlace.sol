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
        address nftContract;
        uint256 tokenId;
        uint256 amount;
        uint256 price;
    }

    mapping(address => mapping(string => Collection)) public collections;
    mapping(address => mapping(uint256 => Listing)) public listings;

    event CollectionCreated(address indexed creator, address nftContract, string name);
    event NFTMinted(address indexed nftContract, uint256 tokenId, address indexed to, uint256 amount);
    event NFTListed(address indexed seller, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price);
    event NFTBought(address indexed buyer, address indexed nftContract, uint256 indexed tokenId, uint256 amount, uint256 price);
    event NFTListingCancelled(address indexed seller, address indexed nftContract, uint256 indexed tokenId);

    constructor(address _registry) {
        registry = ArtworksRegistry(_registry);
    }

    function createERC721Collection(string memory name, string memory symbol, string memory collectionName) external {
        require(bytes(collections[msg.sender][collectionName].name).length == 0, "Collection already exists");
        require(bytes(registry.artists(msg.sender).name).length > 0, "Not a registered artist");

        ArtworkERC721NFT nft = new ArtworkERC721NFT(name, symbol);
        collections[msg.sender][collectionName] = Collection(address(nft), collectionName);

        emit CollectionCreated(msg.sender, address(nft), collectionName);
    }

    function createERC1155Collection(string memory uri, string memory collectionName) external {
        require(bytes(collections[msg.sender][collectionName].name).length == 0, "Collection already exists");
        require(bytes(registry.artists(msg.sender).name).length > 0, "Not a registered artist");

        ArtworkERC1155NFT nft = new ArtworkERC1155NFT("ArtworkERC1155", "A1155", uri);
        collections[msg.sender][collectionName] = Collection(address(nft), collectionName);

        emit CollectionCreated(msg.sender, address(nft), collectionName);
    }

    function mintERC721NFT(string memory collectionName, string memory tokenURI) external {
        Collection storage collection = collections[msg.sender][collectionName];
        require(bytes(collection.name).length > 0, "Collection does not exist");

        ArtworkERC721NFT nftContract = ArtworkERC721NFT(collection.nftContract);
        uint256 tokenId = nftContract.mintNFT(tokenURI);

        emit NFTMinted(address(nftContract), tokenId, msg.sender, 1);
    }

    function mintERC1155NFT(string memory collectionName, uint256 amount, bytes memory data, uint256 royaltyValue) external {
        Collection storage collection = collections[msg.sender][collectionName];
        require(bytes(collection.name).length > 0, "Collection does not exist");

        ArtworkERC1155NFT nftContract = ArtworkERC1155NFT(collection.nftContract);
        uint256 tokenId = nftContract.mintNFT(msg.sender, amount, data, royaltyValue);

        emit NFTMinted(address(nftContract), tokenId, msg.sender, amount);
    }

    function listNFT(address nftContract, uint256 tokenId, uint256 amount, uint256 price) external {
        IERC721 erc721 = IERC721(nftContract);
        IERC1155 erc1155 = IERC1155(nftContract);

        if (erc721.supportsInterface(type(IERC721).interfaceId)) {
            require(erc721.ownerOf(tokenId) == msg.sender, "Not the owner of the ERC721 token");
            erc721.safeTransferFrom(msg.sender, address(this), tokenId);
        } else if (erc1155.supportsInterface(type(IERC1155).interfaceId)) {
            require(erc1155.balanceOf(msg.sender, tokenId) >= amount, "Not enough balance of the ERC1155 token");
            erc1155.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        } else {
            revert("Unsupported token type");
        }

        listings[nftContract][tokenId] = Listing({
            seller: msg.sender,
            nftContract: nftContract,
            tokenId: tokenId,
            amount: amount,
            price: price
        });

        emit NFTListed(msg.sender, nftContract, tokenId, amount, price);
    }

    function cancelListing(address nftContract, uint256 tokenId) external {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.seller == msg.sender, "Not the seller");

        IERC721 erc721 = IERC721(nftContract);
        IERC1155 erc1155 = IERC1155(nftContract);

        if (erc721.supportsInterface(type(IERC721).interfaceId)) {
            erc721.safeTransferFrom(address(this), msg.sender, tokenId);
        } else if (erc1155.supportsInterface(type(IERC1155).interfaceId)) {
            erc1155.safeTransferFrom(address(this), msg.sender, tokenId, listing.amount, "");
        } else {
            revert("Unsupported token type");
        }

        delete listings[nftContract][tokenId];

        emit NFTListingCancelled(msg.sender, nftContract, tokenId);
    }

    function buyNFT(address nftContract, uint256 tokenId) external payable {
        Listing memory listing = listings[nftContract][tokenId];
        require(listing.price == msg.value, "Incorrect value sent");

        IERC721 erc721 = IERC721(nftContract);
        IERC1155 erc1155 = IERC1155(nftContract);

        if (erc721.supportsInterface(type(IERC721).interfaceId)) {
            erc721.safeTransferFrom(address(this), msg.sender, tokenId);
        } else if (erc1155.supportsInterface(type(IERC1155).interfaceId)) {
            erc1155.safeTransferFrom(address(this), msg.sender, tokenId, listing.amount, "");
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
