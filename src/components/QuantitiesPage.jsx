import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import { Button } from './Button'
import { Space } from 'antd'
import styled from 'styled-components'

const tallButtonStyle = {
	fontSize: '2em',
	padding: '.8em 0 1em 0',
	fontWeight: '300',
	width: '2em',
}

const quantityPresets = [
	80, 85, 90, 95, 60, 65, 70, 75, 40, 45, 50, 55, 20, 25, 30, 35, 9, 10, 12, 15,
	5, 6, 7, 8, 0, 1, 3, 4,
]

function QuantitiesPage({ prevQuantity = 2, setPrevQuantity }) {
	const [quantity, setQuantity] = useState(prevQuantity)
	const [mouseDownY, setMouseDownY] = useState()
	const [quantityClicked, setQuantityClicked] = useState()

	const handleChange = (e) => {
		const isNegative = /^-/.test(e.target.value)
		const q = e.target.value.replaceAll(
			// /\D/g
			/-/g,
			'',
		)
		if (isNegative) setQuantity('-' + q)
		else setQuantity(q)
	}
	useEffect(() => {
		if (prevQuantity !== quantity) setPrevQuantity(quantity)
	}, [quantity, prevQuantity, setPrevQuantity])
	function adjustQuantity(delta) {
		const adjustedQuantity = Number(quantity) + delta
		if (!isNaN(adjustedQuantity)) setQuantity(adjustedQuantity)
	}
	const decrement = () => adjustQuantity(-1)
	const increment = () => adjustQuantity(1)
	return (
		<Space
			onMouseUp={(e) => {
				if (quantityClicked === undefined) return
				if (mouseDownY - e.pageY > 1) {
					setQuantity(quantityClicked + 1)
				} else if (mouseDownY - e.pageY < -1) {
					setQuantity(quantityClicked - 1)
				} else setQuantity(quantityClicked)
				setQuantityClicked()
				setMouseDownY()
			}}
			direction='vertical'
			css={`
				text-align: center;
				margin: 2em;
				margin-top: 2.2em;
				display: flex;
			`}
		>
			<Space direction='horizontal'>
				<Barcode
					{...{
						width:
							String(quantity).length > 16
								? 1
								: String(quantity).length > 10
								? 2
								: 3,
						height: 200,
						displayValue: false,
						margin: 0,
					}}
					value={quantity}
				/>
			</Space>
			<div
				css={`
					text-align: center;
					display: flex;
					flex-wrap: wrap;
					margin: 0 auto;
					* {
						margin: 0.25em;
					}
				`}
			>
				{quantityPresets.map((quantity) => (
					<QuantityButton
						onMouseDown={(e) => {
							setMouseDownY(e.pageY)
							setQuantityClicked(quantity)
						}}
						key={quantity}
					>
						{quantity}
					</QuantityButton>
				))}
			</div>
			<Space direction='horizontal' align='center'>
				<Button onClick={decrement} style={tallButtonStyle}>
					-
				</Button>
				<Input type='text' onChange={handleChange} value={quantity} />
				<Button onClick={increment} style={tallButtonStyle}>
					+
				</Button>
			</Space>
		</Space>
	)
}

const QuantityButton = styled(Button)`
	width: 81.5px;
`
const Input = styled.input`
	-webkit-appearance: none;
	width: 10em;
	width: 60%;
	max-width: 11em;
	background: none;
	border: none;
	text-align: center;
	font-family: monospace;
	font-size: 1.4em;
`

export default QuantitiesPage
