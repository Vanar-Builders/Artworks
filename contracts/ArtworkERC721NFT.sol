// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import ERC721 extension for storing token URIs
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./royalties/ERC2981ContractWideRoyalties.sol";

contract ArtworkERC721NFT is Ownable, ERC721URIStorage, ERC2981ContractWideRoyalties {
    uint256 private _tokenIdCounter;
    address public artist;           // Public variable to store the address of the artist

    uint256 public constant ROYALTY_PERCENTAGE = 30; // 30% royalty on NFT minting

    // Event emitted when an NFT is minted
    event NFTMinted(uint256 indexed tokenId, address indexed buyer, uint256 price);
    // Event emitted when royalties are collected
    event RoyaltyCollected(uint256 indexed tokenId, uint256 amount);
    // Event emitted when royalties are paid to the artist
    event RoyaltyPaid(address indexed artist, uint256 amount);

    constructor(string memory name, string memory symbol, address _artist) ERC721(name, symbol) Ownable(msg.sender) {
        artist = _artist;
        transferOwnership(_artist); // Transfer ownership to the artist
    }

    // // Modifier to check if the user owns at least one NFT
    // modifier onlyMintedUser(address user) {
    //     require(balanceOf(user) > 0, "Don't own the NFT");
    //     _; // Continue execution
    // }

    /// @inheritdoc ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721URIStorage, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintNFT(string memory _tokenURI) external payable onlyOwner returns (uint256) {
        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    /// @notice Allows to set the royalties on the contract
    /// @dev This function in a real contract should be protected with a onlyOwner modifier
    /// @param recipient the royalties recipient
    /// @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value) public onlyOwner {
        _setRoyalties(recipient, value);
    }

    /// @notice Mint several tokens at once
    /// @param recipients an array of recipients for each token
    function mintBatch(address[] memory recipients) external onlyOwner {
        uint256 tokenId = _tokenIdCounter;
        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], tokenId);
            tokenId++;
            _tokenIdCounter++;
        }
    }
}
