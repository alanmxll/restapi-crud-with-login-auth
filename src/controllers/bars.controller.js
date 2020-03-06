const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost',
	user: 'alanmxll',
	password: 'root',
	database: 'firstapi',
	port: '5432',

})

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
	getBars,
	sendDateRange
	// getBarById,
	// createBar,
	// deleteBar,
	// updateBar
}