//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Danies2 is ERC20 {
    uint constant _initial_supply = 10000 * (10 ** 18);

    constructor() ERC20("Danies2", "DA2") {
        _mint(msg.sender, _initial_supply);
    }
}
