const nacl = require('libsodium-wrappers')

let keyVar;

beforeAll(async() => {
    await nacl.ready;
    keyVar = nacl.crypto_sign_keypair();
});

exports.verifyingKey = async function(){
    return keyVar.publicKey;
}

exports.sign = async function(msg){
    return nacl.crypto_sign(msg, keyVar.privateKey);
}