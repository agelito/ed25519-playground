// sign_noble25519.js

const ed  = require(`@noble/ed25519`);
const { sha512 } = require(`@noble/hashes/sha512`);
ed.utils.sha512Sync = (...m) => sha512(ed.utils.concatBytes(...m));
const { getPublicKey, sign, verify } = ed.sync;

/**
 * Creates a object containing a public/private keypair.
 * @param {Buffer} privateKey Create public/private keypair using the provided 32 byte private key.
 * @returns {{publicKey: Buffer, privateKey: Buffer}} Object containing a public/private keypair.
 */
function createKeypair(privateKey) {
    const publicKey = getPublicKey(privateKey);

    return {
        publicKey,
        privateKey,
    };
}

/**
 * Verify a signed message
 * @param {Buffer} message The message
 * @param {Buffer} signature The signature
 * @param {Buffer} publicKey The public key
 * @returns {boolean} Boolean value indicating if signature is valid.
 */
function verifySignature(message, signature, publicKey) {
    return verify(signature, message, publicKey);
}

/**
 * Create a signed message
 * @param {Buffer} message The message
 * @param {Buffer} privateKey The private key
 * @returns {Buffer} The message signature
 */
function signMessage(message, privateKey) {
    return sign(message, privateKey);
}

module.exports = {
    createKeypair,
    verifySignature,
    signMessage
};
