// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// How To Create an ERC-1155 Contract: The Swiss Army Knife of Ethereum Tokens
// https://www.youtube.com/watch?v=mM77Ta-g7Hs

// todo Ultimate ERC-1155 Smart Contract Tutorial w/Mint, Payment, & Whitelist
// todo https://www.youtube.com/watch?v=wYOPh8TX_Tw
// BASE SEPOLIA USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
// ERC1155 CONTRACT LISTED ADDRESS:; 0x30C7E39F0dCDCd7358714856Ae8BA24830cc6f10

contract MyTokenTest is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
    IERC20 public paymentToken;

    mapping(uint256 => uint256) public tokenSupplies;
    mapping(uint256 => uint256) public tokenPrices;

    event TokenConfigUpdated(uint256 indexed tokenId, uint256 maxSupply, uint256 price);

    constructor(address initialOwner, address _paymentToken)
        ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/")
        Ownable(initialOwner)
    {
        paymentToken = IERC20(_paymentToken);
    }

    function setTokenConfig(uint256 tokenId, uint256 maxSupply, uint256 price) public onlyOwner {
        tokenSupplies[tokenId] = maxSupply;
        tokenPrices[tokenId] = price;
        emit TokenConfigUpdated(tokenId, maxSupply, price);
    }

    // SET SETTINGS
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPaymentToken(address _newPaymentToken) public onlyOwner {
        paymentToken = IERC20(_newPaymentToken);
    }

    // GET SETTINGS
    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id), "URI: none existent token");
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));
    }


    function getTokenConfig(uint256 tokenId) public view returns (uint256 maxSupply, uint256 price) {
        return (tokenSupplies[tokenId], tokenPrices[tokenId]);
    }


    //  MINT
    function mint(uint256 id, uint256 amount) public {
        require(tokenSupplies[id] > 0, "Token not configured");
        require(totalSupply(id) + amount <= tokenSupplies[id], "Exceeds max supply");
        uint256 price = tokenPrices[id];
        require(paymentToken.transferFrom(msg.sender, address(this), price * amount), "Payment failed");
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        for (uint256 i = 0; i < ids.length; i++) {
            require(tokenSupplies[ids[i]] > 0, "Token not configured");
            require(totalSupply(ids[i]) + amounts[i] <= tokenSupplies[ids[i]], "Exceeds max supply");
        }
        _mintBatch(to, ids, amounts, data);
    }


    // WITHDRAW
    function withdrawETH(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

    function withdrawPaymentToken(address _addr) external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(paymentToken.transfer(_addr, balance), "Transfer failed");
    }


    // PAUSE
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
