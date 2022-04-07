// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {
    
    struct Wave {
        address Waver;
        string imgUrl;
        string caption;
        uint256 timestamp;
    }

    event NewWave(address indexed from, string imgUrl, string caption, uint256 timestamp);

    uint totalWaves;
    Wave[] waves;
    uint256 private seed;
    mapping(address => uint256) public lastWavedAt;
    
    constructor() payable {
        console.log("Yo yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _imgUrl, string memory _caption) public {
        require(
            lastWavedAt[msg.sender] + 30 seconds < block.timestamp, 
            "Must wait 30 seconds before waving again."
        );

        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        waves.push(Wave(msg.sender, _imgUrl, _caption, block.timestamp));
        emit NewWave(msg.sender, _imgUrl, _caption, block.timestamp);
        console.log("%s has waved! with img %s and caption %s", msg.sender, _imgUrl, _caption);

        seed = (block.difficulty + block.timestamp + seed) % 100;

        if (seed <= 50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(
                prizeAmount <= address(this).balance,
                "Trying to withdraw more money than they contract has."
            );
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }
    }

    function getTotalWaves() public view returns (uint) {
        console.log("We have %d total wave%s!", totalWaves, (totalWaves != 1? "s":""));
        return totalWaves;
    }

    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
}