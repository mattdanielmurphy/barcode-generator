import Gitrows from 'gitrows'

const gitrows = new Gitrows()

module.exports = async (request, resolve) => {
	if (request.body && request.body.scanned) {
		gitrows
			.replace(
				'@github/mattdanielmurphy/barcode-generator/text.json',
				request.body,
			)
			.then((result) => {
				console.log(result)
				resolve.status('ok')
			})
	} else resolve.status('ok')
}
