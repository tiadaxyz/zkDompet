// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ZKDompetMultiSig.sol";

contract ZKDompetMultiSigFactory {
    ZKDompetMultiSig[] public ZKDompetMultiSigWallets;
    event ZKDompetMultiSigCreated(ZKDompetMultiSig wallet, string ownerHashPubkey);

    address private ZKDompetMultiSigOwner;

    constructor(address _owner) {
        ZKDompetMultiSigOwner = _owner;
    }

    function getMultiSigWallets() external view returns (ZKDompetMultiSig[] memory) {
        return ZKDompetMultiSigWallets;
    }

    function createMultiSigWallet(string memory _ownerHashPubkey, MinimalForwarder forwarder) public returns (address) {
        ZKDompetMultiSig wallet = new ZKDompetMultiSig(_ownerHashPubkey, forwarder);
        // append wallet to wallets array
        ZKDompetMultiSigWallets.push(wallet);

        emit ZKDompetMultiSigCreated(wallet, _ownerHashPubkey);
        return address(wallet);
    }
}