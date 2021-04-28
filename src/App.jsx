import './App.css'

import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import NumberPicker from './NumberPicker'
import axios from 'axios'
import styled from 'styled-components'

require('dotenv').config()

function BarcodeContainer({ UPC, index, totalUPCs, signInCodes }) {
	const [currentUPC, setCurrentUPC] = useState(() => {
		return UPC
	})
	const c = signInCodes ? 'signIn' : 'upc'
	const navUp = `#${c}${index - 1}`
	const navDown = `#${index === 1 ? 'upc' : c}${index + 1}`

	function reset() {
		setCurrentUPC(UPC)
	}
	return (
		<div key={index} id={`${c}${index}`} className='upc'>
			<h3>
				{signInCodes && 'Sign-In Codes: '}
				{index + 1} of {totalUPCs}
			</h3>
			<Barcode
				{...{
					width: 3,
					height: 400,
					displayValue: false,
					margin: 10,
				}}
				value={currentUPC}
			/>
			{/^\d*$/.test(currentUPC) && (
				<NumberPicker currentUPC={currentUPC} setCurrentUPC={setCurrentUPC} />
			)}
			<nav>
				{signInCodes ? (
					<a className='button' href={`#upc0`}>
						skip
					</a>
				) : (
					<a className='button' href={`#${c}${index}`} onClick={reset}>
						reset
					</a>
				)}
				<div className='up-down-nav'>
					<a className='button' href={navUp}>
						⬆
					</a>
					<a className='button' href={navDown}>
						⬇
					</a>
				</div>
			</nav>
		</div>
	)
}

function SignInCodes() {
	return (
		<>
			<BarcodeContainer
				totalUPCs={2}
				UPC={process.env.REACT_APP_USER}
				index={0}
				signInCodes
			/>
			<BarcodeContainer
				totalUPCs={2}
				UPC={process.env.REACT_APP_PASS}
				index={1}
				signInCodes
			/>
		</>
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
				const elevenTo12Digits = /[\d\w]{11,12}/g
				const matches = text
					.match(elevenTo12Digits)
					.map((match) => {
						if (/^\d.$/.test(match)) return match
						else return replaceLettersWithLikelyDigits(match)
					})
					.map((match) => {
						console.log('mat', match)
						const newMatch = match.replace(/^0/, '')
						console.log(newMatch)
						return /^\d{11}/.exec(newMatch)[0]
					})
				// const re1 = /[1-9]\d{10}/g
				// const matches = text.match(re1)
				return matches
			}
			setUPCs(filterScannedText())
		}
		getText()
	}, [])

	return UPCs.length > 0 ? (
		<Container className='App'>
			<SignInCodes />
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
