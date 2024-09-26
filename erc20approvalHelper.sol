// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IUSDC {
    function approve(address spender, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}