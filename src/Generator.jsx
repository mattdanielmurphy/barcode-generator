import 'antd/dist/antd.css'

import { Card, Layout, Modal, Space } from 'antd'
import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import { Button } from './components'
import NumberPicker from './NumberPicker'
import axios from 'axios'
import styled from 'styled-components'

const { Header, Content } = Layout

const StyledCard = styled(Card)`
	margin: 2em auto;
	/* width: 400px; */
	text-align: center;
`

require('dotenv').config()

const appURL = 'https://barcode-generator-beta.vercel.app/'

const BarcodeWrapper = ({ children, title, noWrapper }) =>
	noWrapper ? (
		<Space
			direction='vertical'
			css={`
				text-align: center;
				display: flex;
			`}
		>
			{children}
		</Space>
	) : (
		<StyledCard title={title}>
			<Space direction='vertical'>{children}</Space>
		</StyledCard>
	)

function BarcodeViewer({ UPCs, noWrapper }) {
	const [index, setIndex] = useState(0)
	const [currentUPC, setCurrentUPC] = useState(UPCs[index])
	useEffect(() => {
		setCurrentUPC(UPCs[index])
	}, [index, UPCs])
	const navUp = () => UPCs[index - 1] && setIndex(index - 1)
	const navDown = () => UPCs[index + 1] && setIndex(index + 1)
	const reset = () => setCurrentUPC(UPCs[index])
	const title = `${index + 1} of ${UPCs.length}`
	return (
		<BarcodeWrapper title={title} noWrapper={noWrapper}>
			<Barcode
				{...{
					width: 3,
					height: 400,
					displayValue: false,
					margin: 0,
				}}
				value={currentUPC.replace(/\s/, '')}
			/>
			{currentUPC.match(/^[\d\s]*$/) && (
				<NumberPicker currentUPC={currentUPC} setCurrentUPC={setCurrentUPC} />
			)}
			<Space
				css={`
					margin: 1em;
				`}
			>
				{currentUPC.match(/^[\d\s]*$/) && (
					<Button onClick={reset}>Reset</Button>
				)}
				<Button onClick={navUp}>▲</Button>
				<Button onClick={navDown}>▼</Button>
			</Space>
		</BarcodeWrapper>
	)
}

const SignInCodes = () => (
	<BarcodeViewer
		noWrapper
		UPCs={[process.env.REACT_APP_USER, process.env.REACT_APP_PASS]}
	/>
)

function Generator() {
	// const [text, setText] = useState('')
	const [UPCs, setUPCs] = useState([])

	async function getTextFromDatabase() {
		if (window.location.hostname === '192.168.1.1') {
			return `068258002405:681131911955:67495900008:681131911962:67495900009:67495900010:67495900006:67495900002
			67495900003:67495900012:68258618422:068258618309:067495900022`
				.split(':')
				.join('\n')
		} else {
			const { data } = await axios.get(appURL + 'api/text')
			console.log(data)
			return data.text
		}
	}

	useEffect(() => {
		async function getText() {
			const text = await getTextFromDatabase()
			// setText(text)
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
						const newMatch = match.replace(/\./, '')
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

	const [isModalVisible, setIsModalVisible] = useState(false)

	const showModal = () => setIsModalVisible(true)

	const handleOk = () => setIsModalVisible(false)

	const handleCancel = () => setIsModalVisible(false)

	return (
		<Layout
			css={`
				background: white;
			`}
		>
			<Header
				css={`
					position: fixed;
					bottom: 0;
					width: 100%;
					z-index: 9999;
					background: white;
					box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
				`}
			>
				<Space>
					<Button
						type='link'
						href='shortcuts://run-shortcut?name=Scan%20Barcodes'
					>
						Back
					</Button>
					<Button onClick={showModal}>Show Sign-In Codes</Button>
					<Modal
						title='Sign-In Codes'
						visible={isModalVisible}
						onOk={handleOk}
						onCancel={handleCancel}
					>
						<SignInCodes />
					</Modal>
				</Space>
			</Header>
			<Content>{UPCs.length > 0 && <BarcodeViewer UPCs={UPCs} />}</Content>
		</Layout>
	)
}

export default Generator

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
