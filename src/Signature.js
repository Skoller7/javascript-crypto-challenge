const _sodium = require('libsodium-wrappers')

let keyVar;

//wachten tot sodium klaar is.
(async () => {
    await _sodium.ready;
    keyVar = _sodium.crypto_sign_keypair();
})();

//msg signen met een private key.
module.exports.sign = async function(msg)
{
    await _sodium.ready;

    return _sodium.crypto_sign(msg, keyVar.privateKey);
}

module.exports.verifyingKey = async function()
{
    await _sodium.ready;

    return keyVar.publicKey;
}