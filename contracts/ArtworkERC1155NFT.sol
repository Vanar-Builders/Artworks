// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./royalties/ERC2981PerTokenRoyalties.sol";

contract ArtworkERC1155NFT is ERC1155, Ownable, ERC2981PerTokenRoyalties {
    uint256 public tokenCounter;

    /// @inheritdoc ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // pinata folder link used in uri
    constructor(string memory uri, address artist) ERC1155(uri) Ownable(msg.sender) {
        tokenCounter = 0;
        transferOwnership(artist); // Transfer ownership to the artist
    }

    // pass empty string to data
    function mintNFT(address recipient, uint256 amount, bytes memory data) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(recipient, newTokenId, amount, data);
        tokenCounter += 1;

        return newTokenId;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        address[] memory royaltyRecipients,
        uint256[] memory royaltyValues
    ) external onlyOwner {
        require(
            ids.length == royaltyRecipients.length &&
                ids.length == royaltyValues.length,
            "ERC1155: Arrays length mismatch"
        );

        _mintBatch(to, ids, amounts, "");

        for (uint256 i; i < ids.length; i++) {
            if (royaltyValues[i] > 0) {
                _setTokenRoyalty(ids[i], royaltyRecipients[i], royaltyValues[i]);
            }
        }
    }
}
