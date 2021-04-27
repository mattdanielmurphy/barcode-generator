import faunadb from 'faunadb'
require('dotenv').config()
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.DB_SECRET })
module.exports = async (req, res) => {
	const text = await client
		.query(
			q.Get(q.Ref(q.Collection('barcode-generator'), '297066273465958925')),
		)
		.then((result) => result.data)
		.catch((err) => console.error('Error: %s', err))
	res.status(200).json({ text })
}
