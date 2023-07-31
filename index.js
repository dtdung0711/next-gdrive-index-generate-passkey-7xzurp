// Used for generating your own encryption key
const secretKey = 'loremipsum';

// Run `npm start` on the terminal
// Then copy the encryption_token to your environment variable

import crypto from 'crypto';

export function createEncryptionKey(passphrase) {
	return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(16); // generate a random salt
		const iterations = 100000; // number of PBKDF2 iterations
		const keyLength = 32; // desired key length in bytes

		crypto.pbkdf2(
			passphrase,
			salt,
			iterations,
			keyLength,
			'sha256',
			(err, derivedKey) => {
				if (err) throw reject(err);
				const encryptionKey = derivedKey.toString('hex');
				resolve(encryptionKey);
			}
		);
	});
}

async function main() {
	const token = await createEncryptionKey(secretKey);
	console.log('ENCRYPTION_TOKEN: ', token);
}

main();
