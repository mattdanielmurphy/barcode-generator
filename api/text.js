import faunadb from 'faunadb'
require('dotenv').config()
const q = faunadb.query
const client = new faunadb.Client({ secret: process.env.DB_SECRET })

async function handleGET(res) {
	const { data } = await client
		.query(
			q.Get(q.Ref(q.Collection('barcode-generator'), '297066273465958925')),
		)
		.catch((err) => console.error('Error: %s', err))
	res.status(200).json(data)
}

async function handlePOST(req, res) {
	const object = { text: req.body.text }
	const ref = q.Ref(q.Collection('barcode-generator'), '297066273465958925')

	const data = await client
		.query(q.Replace(ref, object))
		.catch((err) => console.error('Error: %s', err))
	res.status(200).json(data)
}

module.exports = async (req, res) => {
	if (req.body && req.body.text !== undefined) handlePOST(req, res)
	else handleGET(res)
}
