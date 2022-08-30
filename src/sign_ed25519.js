// sign_ed25519.js

const ed25519 = require(`ed25519`);

/**
 * Creates a object containing a public/private keypair.
 * @param {Buffer} privateKey Create public/private keypair using the provided 32 byte private key.
 * @returns {{publicKey: Buffer, privateKey: Buffer}} Object containing a public/private keypair.
 */
function createKeypair(privateKey) {
    return ed25519.MakeKeypair(privateKey);
};

/**
 * Verify a signed message
 * @param {Buffer} message The message
 * @param {Buffer} signature The signature
 * @param {Buffer} publicKey The public key
 * @returns {boolean} Boolean value indicating if signature is valid.
 */
function verifySignature(message, signature, publicKey) {
    return ed25519.Verify(message, signature, publicKey);
}

/**
 * Create a signed message
 * @param {Buffer} message The message
 * @param {Buffer} privateKey The private key
 * @returns {Buffer} The message signature
 */
function signMessage(message, privateKey) {
    return ed25519.Sign(message, privateKey);
}


module.exports = {
    createKeypair,
    verifySignature,
    signMessage
}