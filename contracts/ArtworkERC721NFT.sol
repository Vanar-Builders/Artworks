// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import ERC721 extension for storing token URIs
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./royalties/ERC2981ContractWideRoyalties.sol";

contract ArtworkERC721NFT is ERC721URIStorage, Ownable, ERC2981ContractWideRoyalties {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public constant ROYALTY_PERCENTAGE = 30; // 30% royalty on NFT minting

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function mintNFT(string memory _tokenURI) external payable returns (uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenURI);
        return tokenId;
    }

    function payRoyalties() external onlyOwner {
        uint256 amount = royaltyBalance;
        royaltyBalance = 0;

        (bool success, ) = payable(artist).call{value: amount}("");
        require(success, "Royalty payout failed");

        emit RoyaltyPaid(artist, amount);
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
        uint256 tokenId = _tokenIdCounter.current();
        for (uint256 i; i < recipients.length; i++) {
            _safeMint(recipients[i], tokenId);
            tokenId++;
            _tokenIdCounter.increment();
        }
    }
}
