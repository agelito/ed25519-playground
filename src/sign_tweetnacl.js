// sign_tweetnacl.js

const nacl = require(`tweetnacl`);

/**
 * Creates a object containing a public/private keypair.
 * @param {Buffer} privateKey Create public/private keypair using the provided 32 byte private key.
 * @returns {{publicKey: Buffer, privateKey: Buffer}} Object containing a public/private keypair.
 */
function createKeypair(privateKey) {
    const keypair = nacl.sign.keyPair.fromSeed(privateKey);
    return {
        privateKey: Buffer.from(keypair.secretKey),
        publicKey: Buffer.from(keypair.publicKey),
    }
};

/**
 * Verify a signed message
 * @param {Buffer} message The message
 * @param {Buffer} signature The signature
 * @param {Buffer} publicKey The public key
 * @returns {boolean} Boolean value indicating if signature is valid.
 */
function verifySignature(message, signature, publicKey) {
    return nacl.sign.detached.verify(message, signature, publicKey);
}

/**
 * Create a signed message
 * @param {Buffer} message The message
 * @param {Buffer} privateKey The private key
 * @returns {Buffer} The message signature
 */
function signMessage(message, privateKey) {
    return nacl.sign.detached(message, privateKey);
}

module.exports = {
    createKeypair,
    verifySignature,
    signMessage
}
