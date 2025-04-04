import { connectDB } from "../utils/sql.js";
import { getSalt, hashPassword } from "../utils/hash.js";

export const getUsers = async (req, res) => {
	const sql = connectDB();
	const data = await sql.query("SELECT * FROM users");
	res.json(data.rows);
};

export const getUser = async (req, res) => {
	const sql = connectDB();
	const query = { text: "SELECT * FROM users WHERE user_id = $1", values: [req.params.id]}
	const data = await sql.query(query);
	res.json(data.rows?.[0]);
};

export const postUser = async (req, res) => {
	const sql = connectDB();
	const { username, first_name, last_name, birthdate, password, email } = req.body;
	const salt = getSalt();
	const hash = hashPassword(password, salt);
	const saltedHash = salt + hash;
	const query = { 
		text: "INSERT INTO users (username, first_name, last_name, birthdate, password, email) VALUES ($1, $2, $3, $4, $5, $6)",
		values: [username, first_name, last_name, birthdate, saltedHash, email]};
	console.log(saltedHash.length)
	const data = await sql.query(query);
	res.send("ok");
};

export const putUser = async (req, res) => {
	const sql = connectDB();
	const { username, first_name, password, points } = req.body;
	const query = { 
		text: "UPDATE users SET username = $1, first_name = $2, password = $3, points = $4 WHERE user_id = $5",
		values: [username, first_name, password, points, req.params.id]};
	const data = await sql.query(query);
	if (data.rowCount == 0) res.status(400).send("id invalido");
	res.send("ok");
};

export const deleteUser = async (req, res) => {
	const sql = connectDB();
	const data = await sql.query("DELETE FROM users WHERE user_id = $1", [req.params.id]);
	res.send("ok");
};