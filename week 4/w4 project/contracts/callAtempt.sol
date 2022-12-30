// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface exContract {
    function attempt() external;
}

contract callAtempt {
    address public exerciseContract =
        0xcF469d3BEB3Fc24cEe979eFf83BE33ed50988502;

    function attemptCall() external {
        exContract(exerciseContract).attempt();
    }
}
