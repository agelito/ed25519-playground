const crypto = require(`crypto`);
const noble_ed25519 = require(`./sign_noble_ed25519`);
const ed25519 = require(`./sign_ed25519`);
const tweetnacl = require(`./sign_tweetnacl`);

const Benchmark = require(`benchmark`);

const key = crypto.randomBytes(32);
const ed25519_keypair = ed25519.createKeypair(key);
const noble_keypair = noble_ed25519.createKeypair(key);
const tweetnacl_keypair = tweetnacl.createKeypair(key);

const message = `I wonder if there's anything GOOD on tonight?`;
const messageBuffer = Buffer.from(message, `utf8`);

const ed25519_signature = ed25519.signMessage(messageBuffer, ed25519_keypair.privateKey);
const noble_signature = noble_ed25519.signMessage(messageBuffer, noble_keypair.privateKey);
const tweetnacl_signature = tweetnacl.signMessage(messageBuffer, tweetnacl_keypair.privateKey);

const signSuite = new Benchmark.Suite;
signSuite.add(`ed25519#signMessage`, () => {
    ed25519.signMessage(messageBuffer, ed25519_keypair.privateKey);
}).add(`ed25519#verifySignature`, () => {
    ed25519.verifySignature(messageBuffer, ed25519_signature, ed25519_keypair.publicKey);
}).add(`noble_ed25519#signMessage`, () => {
    noble_ed25519.signMessage(messageBuffer, noble_keypair.privateKey);
}).add(`noble_ed25519#verifySignature`, () => {
    noble_ed25519.verifySignature(messageBuffer, noble_signature, noble_keypair.publicKey);
}).add(`tweetnacl#signMessage`, () => {
    tweetnacl.signMessage(messageBuffer, tweetnacl_keypair.privateKey);
}).add(`tweetnacl#verifySignature`, () => {
    tweetnacl.verifySignature(messageBuffer, tweetnacl_signature, tweetnacl_keypair.publicKey);
}).on(`cycle`, function(event) {
  console.log(String(event.target));
}).on(`complete`, function() {
  console.log(`Fastest is ` + this.filter(`fastest`).map(`name`));
}).run();

const verifySuite = new Benchmark.Suite;
verifySuite.add(`ed25519#verifySignature`, () => {
    ed25519.verifySignature(messageBuffer, ed25519_signature, ed25519_keypair.publicKey);
}).add(`noble_ed25519#verifySignature`, () => {
    noble_ed25519.verifySignature(messageBuffer, noble_signature, noble_keypair.publicKey);
}).add(`tweetnacl#verifySignature`, () => {
    tweetnacl.verifySignature(messageBuffer, tweetnacl_signature, tweetnacl_keypair.publicKey);
}).on(`cycle`, function(event) {
  console.log(String(event.target));
}).on(`complete`, function() {
  console.log(`Fastest verifySignature: ${this.filter(`fastest`).map(`name`)}`);
}).run();