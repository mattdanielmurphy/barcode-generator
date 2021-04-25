import Gitrows from 'gitrows'

const gitrows = new Gitrows()

const options = {
	username: 'mattdanielmurphy',
}

module.exports = async (req, res) => {
	const { body } = req
	options.token = body.token
	gitrows.options(options)
	const data = { scanned: body.scanned }
	console.log(data, body.token)
	await gitrows
		.replace('@github/mattdanielmurphy/temp/text.json', data)
		.then((v) => {
			console.log('posted')
			console.log(v)
			res.send('Good!')
		})
		.catch((err) => {
			console.log('ERROR', err)
			res.send(err)
		})
}
