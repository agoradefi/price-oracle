// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.12;

import "./Administrable.sol";

interface ICompoundOracle {
    function updatePrice(address cToken) external;

    function getUnderlyingPrice(address cToken) external view returns (uint256);
}

contract ProxyOracle is Administrable, ICompoundOracle {
    event NewOracle(address oldOracle, address newOracle);

    ICompoundOracle public oracle;

    function updatePrice(address cToken) external override {
        oracle.updatePrice(cToken);
    }

    function getUnderlyingPrice(address cToken)
        external
        view
        override
        returns (uint256)
    {
        return oracle.getUnderlyingPrice(cToken);
    }

    function _setOracle(address _oracle) external {
        require(msg.sender == admin, "unauthorized");

        emit NewOracle(address(oracle), _oracle);
        oracle = ICompoundOracle(_oracle);
    }
}
