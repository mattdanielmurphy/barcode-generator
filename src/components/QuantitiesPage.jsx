import Barcode from 'react-barcode'
import { Button } from './Button'
import { Space } from 'antd'
import styled from 'styled-components'
import { useState } from 'react'

const quantityPresets = [
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	12,
	15,
	16,
	18,
	20,
	21,
	24,
	25,
	27,
	30,
	40,
	44,
	50,
	60,
	63,
	70,
	80,
	90,
	100,
]

function QuantitiesPage() {
	const [quantity, setQuantity] = useState(2)
	const handleChange = (e) => setQuantity(e.target.value)
	return (
		<Space
			direction='vertical'
			css={`
				text-align: center;
				margin: 2em;
				margin-top: 4em;
				display: flex;
			`}
		>
			<Barcode
				{...{
					width: 3,
					height: 200,
					displayValue: false,
					margin: 0,
				}}
				value={quantity}
			/>
			<Input
				type='number'
				onFocus={(e) => {
					e.preventDefault()
					e.target.select()
				}}
				onClick={(e) => {
					e.preventDefault()
					e.target.select()
				}}
				onMouseUp={(e) => {
					e.preventDefault()
					e.target.select()
				}}
				onChange={handleChange}
				value={quantity}
			/>
			<Space wrap>
				{quantityPresets.map((quantity) => (
					<QuantityButton onClick={() => setQuantity(quantity)} key={quantity}>
						{quantity}
					</QuantityButton>
				))}
			</Space>
		</Space>
	)
}

const QuantityButton = styled(Button)`
	width: 5em;
`
const Input = styled.input`
	-webkit-appearance: none;
	width: 100%;
	background: none;
	border: none;
	text-align: center;
	font-family: monospace;
	font-size: 1.4em;
`

export default QuantitiesPage
