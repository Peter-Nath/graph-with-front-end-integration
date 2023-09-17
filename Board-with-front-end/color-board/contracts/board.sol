// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "hardhat/console.sol";

contract CBoard {
    uint[7][5] public cells;

    string[3] colorNames = ["white", "red", "black"];

    event Color(uint _colorCode, string color);

    constructor() {
        // Initialize the board with colors
        for (uint i = 0; i < 5; i++) {
            for (uint j = 0; j < 7; j++) {
                if ((i % 2 == 0) && (j % 2 == 1)) {
                    cells[i][j] = 2; // Red
                } else if ((i % 2 == 1) && (j % 2 == 0)) {
                    cells[i][j] = 3; // Black
                } else {
                    cells[i][j] = 1; // White
                }
            }
        }
        // console.log(cells);
    }

    function getColor(uint x, uint y) public returns (string memory) {
        require(x < 5 && y < 7, "Coordinates out of bounds");
        uint res = cells[x][y];
        emit Color(res, colorNames[res - 1]);
        return colorNames[res - 1];
    }
}
