const _sodium = require('libsodium-wrappers');
var rx = null;
var tx = null;
var privateKey = null;
var publicKey = null;
var clientKey = null;

module.exports.setClientPublicKey = function(key)
{
    if (clientKey === key)
        return;


    if ((clientKey !== null) && (clientKey !== key))
        throw 'client public key already set';

    clientKey = key;

    const keypair = _sodium.crypto_kx_keypair();
    privateKey = keypair.privateKey;
    publicKey = keypair.publicKey;
    sharedKeys = _sodium.crypto_kx_server_session_keys(publicKey,privateKey,key);

    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;
}

module.exports.serverPublicKey = async function()
{
    await _sodium.ready;
    return publicKey;
}

module.exports.encrypt = async function(msg)
{
    await _sodium.ready;
    nonce = _sodium.randombytes_buf(_sodium.crypto_secretbox_NONCEBYTES)
    ciphertext = _sodium.crypto_secretbox_easy(msg, nonce, tx)
    return { ciphertext, nonce }
}

module.exports.decrypt = async function(ciphertext, nonce)
{
    await _sodium.ready;
    return await _sodium.crypto_secretbox_open_easy(ciphertext, nonce, rx)
}