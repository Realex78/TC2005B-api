import crypto from "crypto";

export const getSalt = () => {
	return crypto.randomBytes(30).toString("base64url").substring(0, process.env.SALT);
};

export const hashPassword = (text, salt) => {
	const newMsg = salt + text;
	const hashing = crypto.createHash("sha512");
	const hash = hashing.update(newMsg).digest("base64url");
	// console.log(salt + hash);
	return hash;
}