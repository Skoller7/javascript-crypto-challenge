const _sodium = require('libsodium-wrappers');

var myPrivateKey = null;

beforeAll(async () => {
    await _sodium.ready
})

module.exports.decrypt = async function decrypt(ciphertext,nonce){
    if(myPrivateKey === null){
        throw 'no key';
    }
    return _sodium.crypto_secretbox_open_easy(ciphertext,nonce,myPrivateKey);
}

module.exports.setKey = async function setKey(key){
    myPrivateKey = key;
}