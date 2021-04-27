const Textarea = {
	width: '300px',
	height: '400px',
}

export const PasteArea = ({ setText }) => {
	async function getClipboard(event) {
		let output = ''
		let items = await navigator.clipboard.read()
		for (let item of items) {
			console.log(item)
			if (!item.types.includes('text/html')) continue

			let reader = new FileReader()
			const text = reader.readAsText(await item.getType('text/html'))
			output = text
			break
		}
	}
	// console.log(items)
	// if (text) {
	// 	if (typeof text === 'string') setText(text)
	// }

	return <button onClick={getClipboard}>Click to paste your clipboard</button>
}
