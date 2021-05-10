import 'antd/dist/antd.css'

import { BarcodeViewer, Button } from './components'
import { Layout, Space } from 'antd'
import { useEffect, useState } from 'react'

import { SignInCodesModal } from './components/SignInCodesModal'
import axios from 'axios'
import { replaceLettersWithLikelyDigits } from './components/replaceLettersWithLikelyDigits'

require('dotenv').config()

const { Header, Content } = Layout

const appURL = 'https://barcode-generator-beta.vercel.app/'

function Generator() {
	const [UPCs, setUPCs] = useState([])
	const [removeCheckDigit, setRemoveCheckDigit] = useState(true)

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
			console.log('text from database:', text)
			function filterScannedText() {
				const elevenTo12Digits = /[\d\w]{10,12}/g
				const matches = text
					.match(elevenTo12Digits)
					.map((match) => {
						if (/^\d.$/.test(match)) return match
						else return replaceLettersWithLikelyDigits(match)
					})
					.map((match) => {
						match = match.replace(/\D/, '')
						// if (/^\d{10,11}/.exec(match))
						return match
					})
				return matches
			}
			setUPCs(filterScannedText())
		}
		getText()
	}, [])

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
					z-index: 999;
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
					<Button onClick={SignInCodesModal}>Sign In</Button>
					<Button
						onClick={() => setRemoveCheckDigit(!removeCheckDigit)}
						type='text'
						css={`
							color: ${removeCheckDigit ? '#00DE43' : 'black'};
							border: 1px solid ${removeCheckDigit ? '#32FC6F' : 'transparent'};
						`}
					>
						Check Digit
					</Button>
				</Space>
			</Header>
			<Content>
				{UPCs.length > 0 && (
					<BarcodeViewer removeCheckDigit={removeCheckDigit} UPCs={UPCs} />
				)}
			</Content>
		</Layout>
	)
}

export default Generator
