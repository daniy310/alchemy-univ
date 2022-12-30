// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface callerContract {
    function attemptCall() external;
}

contract callTheCallingContract {
    function callTheCaller(address adr) external {
        callerContract(adr).attemptCall();
    }
}
