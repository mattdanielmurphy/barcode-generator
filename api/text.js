import Cookies from 'js-cookie'

module.exports = async (req, res) => {
	const { body } = req
	Cookies.set('scanned', body.scanned)
	res.send('Good!')
}
