import Gitrows from 'gitrows'

module.exports = async (req, res) => {
	const { body } = req
	const token = body.token
	const gitrows = new Gitrows({ username: 'mattdanielmurphy', token })
	const data = { scanned: body.scanned }
	await gitrows
		.replace('@github/mattdanielmurphy/temp/text.json', data)
		.then((v) => {
			console.log('posted')
			console.log(v)
		})
		.catch((err) => {
			console.log('ERROR', err)
			res.send(err)
		})
	res.send('Good!')
}
