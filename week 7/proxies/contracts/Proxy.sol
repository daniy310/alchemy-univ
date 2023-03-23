// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";
import "./StorageSlot.sol";

contract Proxy {
    uint x = 0;

    function changeImplementation(address _implementation) external {
        StorageSlot.getAddressSlot(keccak256("impl")).value = _implementation;
    }

    fallback() external {
        (bool success, ) = StorageSlot.getAddressSlot(keccak256("impl")).value.delegatecall(msg.data);
        require(success, "Tx failed !");
    }
}

contract Logic1 {
    uint x = 0;

    function changeX(uint _x) external {
        x = _x;
    }
}

contract Logic2 {
    uint x = 0;

    function changeX(uint _x) external {
        x = _x * 2;
    }

    function tripleX() external {
        x *= 3;
    }
}
