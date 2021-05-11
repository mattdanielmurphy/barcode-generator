import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import { Button } from './Button'
import NumberPicker from './NumberPicker'
import { Space } from 'antd'

export function BarcodeViewer({ UPCs, removeCheckDigit, setRemoveCheckDigit }) {
	const [index, setIndex] = useState(0)
	const removeLeadingZeros = (n) => n.replace(/^0*/, '')
	const getCurrentUPC = (UPC = UPCs[index]) => {
		UPC = removeLeadingZeros(UPC)
		if (removeCheckDigit && UPC.length > 10) UPC = UPC.replace(/\d$/, '')
		return UPC
	}
	const [currentUPC, setCurrentUPC] = useState(getCurrentUPC())
	useEffect(() => {
		let UPC = UPCs[index]
		UPC = removeLeadingZeros(UPC)
		console.log(UPC.length)
		if (removeCheckDigit && UPC.length > 10) UPC = UPC.replace(/\d$/, '')
		setCurrentUPC(UPC)
	}, [index, UPCs, removeCheckDigit])

	const navUp = () => UPCs[index - 1] && setIndex(index - 1)
	const navDown = () => UPCs[index + 1] && setIndex(index + 1)
	const reset = () => setCurrentUPC(getCurrentUPC())
	const changeToMilkPrefix = () =>
		setCurrentUPC('687' + currentUPC.substring(3))

	const [editingMode, setEditingMode] = useState(false)

	return (
		<Space
			direction='vertical'
			css={`
				text-align: center;
				margin-top: 4em;
				display: flex;
			`}
		>
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
				<NumberPicker
					currentUPC={currentUPC}
					editingMode={editingMode}
					setEditingMode={setEditingMode}
					setCurrentUPC={setCurrentUPC}
				/>
			)}
			<Space direction='vertical'>
				{currentUPC.match(/^[\d\s]*$/) && (
					<Space>
						<Button
							disabled={/^687/.test(currentUPC)}
							onClick={changeToMilkPrefix}
						>
							687
						</Button>
						<Button onClick={() => setEditingMode(true)}>Edit</Button>
						<Button onClick={reset}>Reset</Button>
					</Space>
				)}
				<Space>
					{currentUPC.match(/^[\d\s]*$/) && (
						<Button
							onClick={() => setRemoveCheckDigit(!removeCheckDigit)}
							type='text'
							css={`
								color: ${removeCheckDigit ? '#00DE43' : 'black'};
								border: 1px solid
									${removeCheckDigit ? '#32FC6F' : 'transparent'};
							`}
						>
							Check Digit
						</Button>
					)}
					<Button onClick={navUp}>▲</Button>
					<Button onClick={navDown}>▼</Button>
				</Space>
			</Space>
		</Space>
	)
}
