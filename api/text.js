import Gitrows from 'gitrows'

const gitrows = new Gitrows()

module.exports = (req, res) => {
	if (req.body.scanned) {
		gitrows
			.replace('@github/mattdanielmurphy/barcode-generator/text.json', req.body)
			.then((res) => {
				console.log(res)
			})
	}
	res.status('ok')
}
