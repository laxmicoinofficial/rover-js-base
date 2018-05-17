import * as RoverBase from "../src"

var keypair = RoverBase.Keypair.random();
var data = 'data to sign';
var signature = RoverBase.sign(data, keypair.rawSecretKey());

console.log('Signature: '+signature.toString('hex'));

if (RoverBase.verify(data, signature, keypair.rawPublicKey())) {
  console.log('OK!');
} else {
  console.log('Bad signature!');
}
