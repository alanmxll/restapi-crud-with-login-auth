const path = require('path');
const crypto = require("crypto");
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');

const pool = new Pool({
	host: 'localhost',
	user: 'alanmxll',
	password: 'root',
	database: 'firstapi',
	port: '5432',

})

const encrypt = {
	alg: "aes256",
	secret: "chaves",
	type: "hex"
};

function encrypter(password) {
	const cipher = crypto.createCipher(encrypt.alg, encrypt.secret);
	cipher.update(password);
	return cipher.final(encrypt.type);
};

// ----------- USERS -----------//

const loginUser = (request, response) => {
	response.sendFile(path.join(__dirname + '/files/login.html'));
};

const create = (req, res) => {
	res.sendFile(path.join(__dirname + '/files/create_user.html'))
};

const createUser = async (req, response) => {
	const hashedPassword = await encrypter(req.body.password)

	pool.query(`INSERT INTO users(name, password) VALUES ('${req.body.username}','${hashedPassword}');`)
		.then(response.send("usuario criado"))
};

const allUsers = (req, response) => {
	pool.connect()
		.then(client => {
			return client.query("SELECT * FROM users")
				.then(res => {
					client.release()
					response.send(res.rows)
				})
				.catch(e => {
					client.release()
					console.log(err.stack)
				})
		})
};


const authUser = async (request, response) => {
	var username = request.body.username;
	var password = request.body.password;

	const hashedPassword = await encrypter(password)
	pool.query(`SELECT name, password FROM users WHERE name='${username}' AND password='${hashedPassword}'`)
		.then(res => {
			if (res.rowCount > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				const userToken = jwt.sign({
					user: username,
				},
					'sangatibergasa', {
					expiresIn: "1m"
				});
				response.send({
					"authentication": true,
					"token": userToken
				});
				console.log(userToken);
			}
			else {
				response.send({ "authentication": false });
			}
			console.log(res.rows)
		})
};

//----------- BARS ----------- //
const getBars = async (req, res) => {
	const response = await pool.query('SELECT * FROM bars');
	res.status(200).json(response.rows);
};

const sendDateRange = async (req, res) => {
	const response = await pool.query(`SELECT weight_bar, weighing_date FROM bars WHERE weighing_date BETWEEN '${req.params.initialDate}' AND '${req.params.finalDate} 23:59:59'`);
	res.status(200).json(response.rows);
}

// const getBarById = async (req, res) => {
//     const id = req.params.id_bar;
//     const response = await pool.query('SELECT * FROM bars WHERE id_bar = $1', [id]);
//     res.json(response.rows);
// };

// const createBar = async (req, res) => {
//     const { weight_bar,
//             weighing_date,
//             epoxi,
//             pu,
//             repainting } = req.body;

//     const response = await pool.query(
//         'INSERT INTO bars (weight_bar, weighing_date, epoxi, pu, repainting) VALUES ($1, $2, $3, $4, $5)',
//         [weight_bar, weighing_date, epoxi, pu, repainting]
//     );
//     console.log(response);
//     res.json({
//         message: 'Bar Added Sucessfully',
//         body: {
//             bar: {weight_bar, weighing_date, epoxi, pu, repainting}
//         }
//     });
// };

// const updateBar = async (req, res) => {
//     const id = req.params.id_bar;
//     const { weight_bar,
//             weighing_date,
//             epoxi,
//             pu,
//             repainting } = req.body;
//     const response = await pool.query(
//         'UPDATE bars SET weight_bar = $1, weighing_date = $2, epoxi = $3, pu = $4, repainting = $5 WHERE id_bar = $6', [
//             weight_bar,
//             weighing_date,
//             epoxi,
//             pu,
//             repainting,
//             id
//         ]
//     );
//     console.log(response);
//     res.json('Bar Updated Successfully.');
// }

// const deleteBar = async (req, res) => {
//     const id = req.params.id_bar;
//     const response = await pool.query('DELETE FROM bars WHERE id_bar = $1', [id]);
//     console.log(response);
//     res.json(`Bar ${id} deleted successfully.`);
// };

module.exports = {
	loginUser,
	create,
	createUser,
	allUsers,
	authUser,
	getBars,
	sendDateRange
	// getBarById,
	// createBar,
	// deleteBar,
	// updateBar
}