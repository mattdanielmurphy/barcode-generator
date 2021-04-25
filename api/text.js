import Gitrows from 'gitrows'

const gitrows = new Gitrows()

module.exports = (req, res) => {
	req.post('/', (req, res) => {
		if (req.body && req.body.scanned) {
			gitrows
				.replace(
					'@github/mattdanielmurphy/barcode-generator/text.json',
					req.body,
				)
				.then((res) => {
					console.log(res)
				})
		}
	})
	res.status('ok')
}
