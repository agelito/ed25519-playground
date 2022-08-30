
const crypto = require(`crypto`);
const noble_ed25519 = require(`./sign_noble_ed25519`);
const ed25519 = require(`./sign_ed25519`);
const tweetnacl = require(`./sign_tweetnacl`);

describe(`sign_noble_ed25519`, () => {
    const key = crypto.randomBytes(32);
    const keypair = noble_ed25519.createKeypair(key);

    const message = `I wonder if there's anything GOOD on tonight?`;
    const messageBuffer = Buffer.from(message, `utf8`);

    it(`signMessage_verifySignature_isTrue`, () => {
        const signature = noble_ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = noble_ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_ed25519_isTrue`, () => {
        const signature = noble_ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_tweetnacl_isTrue`, () => {
        const signature = noble_ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = tweetnacl.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });
});

describe(`sign_ed25519`, () => {
    const key = crypto.randomBytes(32);
    const keypair = ed25519.createKeypair(key);

    const message = `I wonder if there's anything GOOD on tonight?`;
    const messageBuffer = Buffer.from(message, `utf8`);

    it(`signMessage_verifySignature_isTrue`, () => {
        const signature = ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_noble_ed25519_isTrue`, () => {
        const signature = ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = noble_ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_tweetnacl_isTrue`, () => {
        const signature = ed25519.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = tweetnacl.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });
});

describe(`sign_tweetnacl`, () => {
    const seed = crypto.randomBytes(32);
    const keypair = tweetnacl.createKeypair(seed);

    const message = `I wonder if there's anything GOOD on tonight?`;
    const messageBuffer = Buffer.from(message, `utf8`);

    it(`signMessage_verifySignature_isTrue`, () => {
        const signature = tweetnacl.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = tweetnacl.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_ed25519_isTrue`, () => {
        const signature = tweetnacl.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });

    it(`signMessage_verifySignature_by_noble_ed25519_isTrue`, () => {
        const signature = tweetnacl.signMessage(messageBuffer, keypair.privateKey);
        const signatureValid = noble_ed25519.verifySignature(messageBuffer, signature, keypair.publicKey);

        expect(signatureValid).toBeTruthy();
    });
});