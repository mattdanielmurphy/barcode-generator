import Gitrows from 'gitrows'

const gitrows = new Gitrows()

module.exports = async (req, res) => {
	const { body } = req
	const data = { scanned: body.scanned }
	await gitrows.replace(
		'@github/mattdanielmurphy/barcode-generator/text.json',
		data,
	)
	res.send('Good!')
}
