import 'react-number-picker/dist/style.css'

import React from 'react'
import styled from 'styled-components'

function NumberPicker({ currentUPC, setCurrentUPC }) {
	function handleChange(e, i) {
		const { value } = e.target
		let newUPC =
			currentUPC.substring(0, i) + value + currentUPC.substring(i + 1)
		setCurrentUPC(newUPC)
	}

	return (
		<Container>
			{currentUPC.split('').map((digit, i) => (
				<Select
					key={i}
					type='number'
					value={digit}
					onChange={(e) => handleChange(e, i)}
				>
					{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
						<option value={v}>{v}</option>
					))}
				</Select>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`
const Select = styled.select`
	-webkit-appearance: none;
	border: none;
	font-size: 1.2em;
	margin: 0;
`

export default NumberPicker
