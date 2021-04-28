import './App.css'

import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import NumberPicker from './NumberPicker'
import axios from 'axios'
import styled from 'styled-components'

function BarcodeContainer({ UPC, index, totalUPCs }) {
	const [currentUPC, setCurrentUPC] = useState(() => {
		return UPC
	})
	const navUp = `#upc${index - 1}`
	const navDown = `#upc${index + 1}`

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
			<NumberPicker currentUPC={currentUPC} setCurrentUPC={setCurrentUPC} />
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
		const { data } = await axios.get(
			'https://barcode-generator-beta.vercel.app/api/text',
		)
		// const data = {
		// 	text: `068258002405
		// 681131911955
		// 67495900008
		// 681131911962
		// 67495900009
		// 67495900010
		// 67495900006
		// 67495900002
		// 67495900003
		// 67495900012
		// 68258618422
		// 068258618309
		// 067495900022`,
		// }
		return data.text
	}

	useEffect(() => {
		async function getText() {
			const text = await getTextFromDatabase()
			setText(text)
			function filterScannedText() {
				// const re1 = /[\d]{0,3}[\w]{0,2}[\d]{7,}/g
				const re1 = /[1-9]\d{10}/g
				const matches = text.match(re1)
				return matches
			}
			setUPCs(filterScannedText())
		}
		getText()
	}, [])

	return UPCs.length > 0 ? (
		<Container className='App'>
			<p className='scan-more'>
				<a
					className='button'
					href='shortcuts://run-shortcut?name=Scan%20Barcodes'
				>
					Scan More UPCs
				</a>
			</p>
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
		</Container>
	) : text ? (
		<>
			<h1>no matches found</h1>
			<div>raw data:</div>
			<div>{text}</div>
		</>
	) : (
		<></>
	)
}

export default App

const Container = styled.div`
	margin: 3em auto;
`

// const letterToNumber = {
// 	A: 8,
// 	B: 8,
// 	C: 0,
// 	D: 0,
// 	E: 8,
// 	F: 8,
// 	G: 0,
// 	H: 8,
// 	I: 1,
// 	J: 0,
// 	K: 8,
// 	L: 1,
// 	M: 0,
// 	N: 8,
// 	O: 0,
// 	P: 2,
// 	Q: 0,
// 	R: 8,
// 	S: 5,
// 	T: 7,
// 	U: 0,
// 	V: 0,
// 	W: 0,
// 	X: 0,
// 	Y: 1,
// 	Z: 0,
// }

// function replaceLettersWithLikelyDigits(str) {
// 	return str
// 		.split('')
// 		.map((digit) => {
// 			if (isNaN(Number(digit))) {
// 				console.log(digit)
// 				return letterToNumber[digit]
// 			} else return digit
// 		})
// 		.join('')
// }
