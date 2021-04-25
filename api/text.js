import Gitrows from 'gitrows'

const gitrows = new Gitrows()

const options = {
	username: 'mattdanielmurphy',
}

module.exports = async (req, res) => {
	const { body } = req
	options.token = body.token
	gitrows.options(options)
	const data = body.scanned
	console.log(data, body.token)
	await gitrows
		.put('@github/mattdanielmurphy/barcode-generator/text.json', data)
		.then((v) => {
			console.log(v)
			res.send('Good!')
		})
}
