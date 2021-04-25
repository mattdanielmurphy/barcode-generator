import './App.css'

import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import Gitrows from 'gitrows'
import NumberPicker from './NumberPicker'

const gitrows = new Gitrows()

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

function iOS() {
	return (
		[
			'iPad Simulator',
			'iPhone Simulator',
			'iPod Simulator',
			'iPad',
			'iPhone',
			'iPod',
		].includes(navigator.platform) ||
		// iPad on iOS 13 detection
		(navigator.userAgent.includes('Mac') && 'ontouchend' in document)
	)
}

function App() {
	const [text, setText] = useState('')
	gitrows
		.get('@github/mattdanielmurphy/barcode-generator/text.json')
		.then(({ scanned }) => {
			setText(scanned)
		})
	useEffect(() => {
		console.log('text updated', text)
	}, [text])
	const re1 = /[\d]{0,3}[\w]{0,2}[\d]{7,}/g
	const matches = text.match(re1)
	console.log('matches', matches)
	// const fixedMatches = matches
	// 	? matches
	// 			.map((match) => {
	// 				if (match.length >= 12) {
	// 					if (/\d{12}/.test(match)) {
	// 						return match
	// 					} else {
	// 						return replaceLettersWithLikelyDigits(match)
	// 					}
	// 				} else {
	// 					return ''
	// 				}
	// 			})
	// 			.filter((match) => match)
	// 	: []
	return <div>{typeof text === 'string' && text}</div>
	// return matches ? (
	// 	<div className='App'>
	// 		{fixedMatches.map((match, i) => (
	// 			<BarcodeContainer
	// 				totalUPCs={fixedMatches.length}
	// 				UPC={match}
	// 				key={i}
	// 				index={i}
	// 			/>
	// 		))}
	// 		<p className='scan-more'>
	// 			<a
	// 				className='button'
	// 				href='shortcuts://run-shortcut?name=Scan%20Barcodes'
	// 			>
	// 				Scan More UPCs
	// 			</a>
	// 		</p>
	// 	</div>
	// ) : (
	// 	<>
	// 		<h1>no matches found</h1>
	// 		<div>raw data:</div>
	// 		<div>{text}</div>
	// 	</>
	// )
}

export default App
