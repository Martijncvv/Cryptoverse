// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// How To Create an ERC-1155 Contract: The Swiss Army Knife of Ethereum Tokens
// https://www.youtube.com/watch?v=mM77Ta-g7Hs

// todo Ultimate ERC-1155 Smart Contract Tutorial w/Mint, Payment, & Whitelist
// todo https://www.youtube.com/watch?v=wYOPh8TX_Tw


contract MyTokenTest is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {

    uint256 public NFT_PRICE_0 = 0.0001 ether;
    uint256 public NFT_PRICE_1 = 0.0002 ether;
    uint256 public NFT_PRICE_3 = 0.0003 ether;

    uint256 public MAX_SUPPLY = 1000;

    // EDIT FUNCTION TO EDIT NFT PRICES


    constructor(address initialOwner)
        ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/")
        Ownable(initialOwner)
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function withdraw(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id), "URI: none existent token");

        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));
    }

    function mint(uint256 id, uint256 amount) public payable {
        require(msg.value == NFT_PRICE_0, "NOT ENOUGH VALUE SENT");
        require(totalSupply(id) + amount <= MAX_SUPPLY, "Sorry, mint limit reached");
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }

    // The following functions are overrides required by Solidity.

    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
