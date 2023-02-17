pragma circom 2.0.0;
include "../../node_modules/circom-ecdsa-master/circuits/ecdsa.circom";
include "../../node_modules/circomlib/circuits/poseidon.circom";
template VerifySignature(){
    //public input
    signal input transactionCallData[4];
    signal input hashPubKey; 

    //private input
    signal input pubKey[2][4];
    signal input signatureR[4];
    signal input signatureS[4];

    //result
    signal output result;

    component ECDSAVerifyNoPubkeyCheck_Instance = ECDSAVerifyNoPubkeyCheck(64, 4);

    for(var i = 0; i<4; i++){
        ECDSAVerifyNoPubkeyCheck_Instance.r[i] <== signatureR[i];
        ECDSAVerifyNoPubkeyCheck_Instance.s[i] <== signatureS[i];
        ECDSAVerifyNoPubkeyCheck_Instance.msghash[i] <== transactionCallData[i];
    }

    for(var i = 0; i<2; i++){
        for(var n = 0; n<4; n++){       
            ECDSAVerifyNoPubkeyCheck_Instance.pubkey[i][n] <== pubKey[i][n];
        }
    }


    
    // signal hashedR;
    // signal hashedS;

    component poseidonhash = Poseidon(8);
    for(var n = 0; n<4; n++){
        poseidonhash.inputs[n] <== pubKey[0][n];
    }
    for(var n = 0; n<4; n++){
        poseidonhash.inputs[n+4] <== pubKey[1][n];
    }

    poseidonhash.out === hashPubKey;
    
    result <== ECDSAVerifyNoPubkeyCheck_Instance.result;

    result === 1;
    

}

component main {public [transactionCallData, hashPubKey]} = VerifySignature();