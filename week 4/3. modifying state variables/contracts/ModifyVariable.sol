// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract ModifyVariable {
    uint public x;
    string public ey;

    constructor(uint _x, string memory _ey) {
        x = _x;
        ey = _ey;
    }

    function modifyToLeet() public {
        x = 1337;
        ey = "legea";
    }
}
