const _sodium = require('libsodium-wrappers');

var myPrivateKey = null;


module.exports.setKey = async function(key){
    myPrivateKey = key;
}


module.exports.decrypt = async function(ciphertext, nonce)
{
    if(myPrivateKey == null){
        throw 'no key'
    }

    await _sodium.ready;

    return _sodium.crypto_secretbox_open_easy(ciphertext, nonce, myPrivateKey);
}