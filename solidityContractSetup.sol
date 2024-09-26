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

contract MyTokenTest is ERC1155, Ownable, ERC1155Pausable, ERC1155Supply {
    IERC20 public paymentToken;

    // Prices in USDC (assuming 6 decimal places)
    uint256 public NFT_PRICE_0 = 1 * 10**6; // 1 USDC
    uint256 public NFT_PRICE_1 = 2 * 10**6; // 2 USDC
    uint256 public NFT_PRICE_2 = 3 * 10**6; // 3 USDC

    uint256 public MAX_SUPPLY = 1000;

     constructor(address initialOwner, address _paymentToken)
        ERC1155("ipfs://Qmaa6TuP2s9pSKczHF4rwWhTKUdygrrDs8RmYYqCjP3Hye/")
        Ownable(initialOwner)
    {
        paymentToken = IERC20(_paymentToken);
    }

    // GET SETTINGS
    function uri(uint256 _id) public view virtual override returns (string memory) {
        require(exists(_id), "URI: none existent token");
        return string(abi.encodePacked(super.uri(_id), Strings.toString(_id), ".json"));
    }

    function getNFTPrice(uint256 id) public view returns (uint256) {
        if (id == 0) return NFT_PRICE_0;
        if (id == 1) return NFT_PRICE_1;
        if (id == 3) return NFT_PRICE_2;
        revert("Invalid token ID");
    }

    // SET SETTINGS
    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setPaymentToken(address _newPaymentToken) public onlyOwner {
        paymentToken = IERC20(_newPaymentToken);
    }

    function setNFTPrice(uint256 id, uint256 newPrice) public onlyOwner {
        if (id == 0) NFT_PRICE_0 = newPrice;
        else if (id == 1) NFT_PRICE_1 = newPrice;
        else if (id == 3) NFT_PRICE_2 = newPrice;
        else revert("Invalid token ID");
    }

    // PAUSE
    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


    //  MINT
    function mint(uint256 id, uint256 amount) public {
        uint256 price = getNFTPrice(id);
        require(paymentToken.transferFrom(msg.sender, address(this), price * amount), "Payment failed");
        require(totalSupply(id) + amount <= MAX_SUPPLY, "Sorry, mint limit reached");
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data)
        public
        onlyOwner
    {
        _mintBatch(to, ids, amounts, data);
    }


    // WITHDRAW
    function withdrawETH(address _addr) external onlyOwner {
        uint256 balance = address(this).balance;
        payable(_addr).transfer(balance);
    }

     function withdraw(address _addr) external onlyOwner {
        uint256 balance = paymentToken.balanceOf(address(this));
        require(paymentToken.transfer(_addr, balance), "Transfer failed");
    }

    // The following functions are overrides required by Solidity.
    function _update(address from, address to, uint256[] memory ids, uint256[] memory values)
        internal
        override(ERC1155, ERC1155Pausable, ERC1155Supply)
    {
        super._update(from, to, ids, values);
    }
}
