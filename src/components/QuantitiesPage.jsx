import { useEffect, useState } from 'react'

import Barcode from 'react-barcode'
import { Button } from './Button'
import { Space } from 'antd'
import styled from 'styled-components'

const quantityPresets = [
	0, 1, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65,
	70, 75, 80, 85, 90, 95,
]

function QuantitiesPage({ prevQuantity = 2, setPrevQuantity }) {
	const [quantity, setQuantity] = useState(prevQuantity)
	const handleChange = (e) => {
		const isNegative = /^-/.test(e.target.value)
		const q = e.target.value.replaceAll(/\D/g, '')
		if (isNegative) setQuantity('-' + q)
		else setQuantity(q)
	}
	useEffect(() => {
		if (prevQuantity !== quantity) setPrevQuantity(quantity)
	}, [quantity, prevQuantity, setPrevQuantity])
	const decrement = () => setQuantity(quantity - 1)
	const increment = () => setQuantity(quantity + 1)
	return (
		<Space
			direction='vertical'
			css={`
				text-align: center;
				margin: 2em;
				margin-top: 2.2em;
				display: flex;
			`}
		>
			<Space direction='horizontal'>
				<Button onClick={decrement}>-</Button>
				<Barcode
					{...{
						width: 3,
						height: 200,
						displayValue: false,
						margin: 0,
					}}
					value={quantity}
				/>
				<Button onClick={increment}>+</Button>
			</Space>
			<Input
				type='text'
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
