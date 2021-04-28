import './App.css'

import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import NumberPicker from './NumberPicker'
import axios from 'axios'

const letterToNumber = {
	A: 8,
	B: 8,
	C: 0,
	D: 0,
	E: 8,
	F: 8,
	G: 0,
	H: 8,
	I: 1,
	J: 0,
	K: 8,
	L: 1,
	M: 0,
	N: 8,
	O: 0,
	P: 2,
	Q: 0,
	R: 8,
	S: 5,
	T: 7,
	U: 0,
	V: 0,
	W: 0,
	X: 0,
	Y: 1,
	Z: 0,
}

function replaceLettersWithLikelyDigits(str) {
	return str
		.split('')
		.map((digit) => {
			if (isNaN(Number(digit))) {
				console.log(digit)
				return letterToNumber[digit]
			} else return digit
		})
		.join('')
}

function BarcodeContainer({ UPC, index, totalUPCs }) {
	const [currentUPC, setCurrentUPC] = useState(() => {
		return UPC
	})
	const navUp = `#upc${index - 1}`
	const navDown = `#upc${index + 1}`

	function handleChange(e) {
		setCurrentUPC(e.target.value)
	}
	function reset() {
		setCurrentUPC(UPC)
	}
	return (
		<div key={index} id={`upc${index}`} className='upc'>
			<h3>
				{index + 1} of {totalUPCs}
			</h3>
			<Barcode
				{...{
					width: 3,
					height: 400,
					format: 'CODE128',
					displayValue: false,
					background: '#ffffff',
					lineColor: '#000000',
					margin: 10,
				}}
				value={currentUPC}
			/>
			<input type='text' value={currentUPC} onChange={handleChange} />
			<NumberPicker />
			<nav>
				<a className='button' href={`#upc${index}`} onClick={reset}>
					reset code
				</a>
				<a className='button' href={navUp}>
					up
				</a>
				<a className='button' href={navDown}>
					down
				</a>
			</nav>
		</div>
	)
}

function App() {
	const [text, setText] = useState('')
	const [UPCs, setUPCs] = useState([])

	async function getTextFromDatabase() {
		const { text } = await axios.get(
			'https://barcode-generator-beta.vercel.app/api/text',
		)
		return text
	}

	useEffect(() => {
		getTextFromDatabase().then((text) => {
			console.log('text: ', text)
			setText(text)
		})
	}, [])

	useEffect(() => {
		function filterScannedText() {
			const re1 = /[\d]{0,3}[\w]{0,2}[\d]{7,}/g
			const matches = text.match(re1)
			const fixedMatches = matches
				? matches
						.map((match) => {
							if (match.length >= 12) {
								if (/\d{12}/.test(match)) {
									return match
								} else {
									return replaceLettersWithLikelyDigits(match)
								}
							} else {
								return ''
							}
						})
						.filter((match) => match)
				: []
			return fixedMatches
		}
		setUPCs(filterScannedText())
		console.log('text updated', text)
	}, [text])

	return UPCs.length > 0 ? (
		<div className='App'>
			{UPCs.map((match, i) => (
				<BarcodeContainer
					totalUPCs={UPCs.length}
					UPC={match}
					key={i}
					index={i}
				/>
			))}
			<p className='scan-more'>
				<a
					className='button'
					href='shortcuts://run-shortcut?name=Scan%20Barcodes'
				>
					Scan More UPCs
				</a>
			</p>
		</div>
	) : (
		<>
			<h1>no matches found</h1>
			<div>raw data:</div>
			<div>{text}</div>
		</>
	)
}

export default App
