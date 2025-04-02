import { connectDB } from "../utils/sql.js";
import { hashPassword } from "../utils/hash.js";

export const login = async (req, res) => {
	const sql = connectDB();
	const query = {
		text: "SELECT * FROM users WHERE username = $1",
		values: [req.body.username]
	};
	const data = await sql.query(query);
	if (data.rows.length === 0) {
		res.json({ isLogin: false, user: {} });
		return;
	}
	const salt = data.rows[0].password.substring(0, process.env.SALT);
	const hash = hashPassword(req.body.password, salt);
	const saltedHash = salt + hash;
	if (saltedHash === data.rows[0].password) {
		res.json({ isLogin: true, user: data.rows[0] });
		return;
	} else {
		res.json({ isLogin: false, user: {} });
	}
}