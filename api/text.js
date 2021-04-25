import Gitrows from 'gitrows'

const gitrows = new Gitrows()

module.exports = async (request, resolve) => {
	console.log('request received')
	resolve.status(200)
	if (request.body && request.body.scanned) {
		console.log('body.scanned found')
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
