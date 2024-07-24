// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./royalties/ERC2981PerTokenRoyalties.sol";

contract ArtworkERC1155NFT is ERC1155, Ownable, ERC2981PerTokenRoyalties {
    uint256 public tokenCounter;
    string public name;
    string public symbol;

    /// @inheritdoc	ERC165
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    constructor(string memory _name, string memory _symbol, string memory uri) ERC1155(uri) Ownable(msg.sender) {
        name = _name;
        symbol = _symbol;
        tokenCounter = 0;
    }

    function mintNFT(address recipient, uint256 amount, bytes memory data, uint256 royaltyValue) public onlyOwner returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(recipient, newTokenId, amount, data);
        tokenCounter += 1;
        if (royaltyValue > 0) {
            _setTokenRoyalty(newTokenId, recipient, royaltyValue);
        }
        return newTokenId;
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        address[] memory royaltyRecipients,
        uint256[] memory royaltyValues
    ) external {
        require(
            ids.length == royaltyRecipients.length &&
                ids.length == royaltyValues.length,
            'ERC1155: Arrays length mismatch'
        );

        _mintBatch(to, ids, amounts, '');

        for (uint256 i; i < ids.length; i++) {
            if (royaltyValues[i] > 0) {
                _setTokenRoyalty(
                    ids[i],
                    royaltyRecipients[i],
                    royaltyValues[i]
                );
            }
        }
    }
}