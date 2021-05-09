import 'react-number-picker/dist/style.css'

import React from 'react'
import styled from 'styled-components'

function NumberPicker({ currentUPC, setCurrentUPC }) {
	function handleChange(e, i) {
		let { value } = e.target
		console.log('change', value)
		if (/^\d$/.test(value)) {
			if (value === '-1') value = 9
			else if (value === '10') value = 0
			console.log(value)
			let newUPC =
				currentUPC.substring(0, i) + value + currentUPC.substring(i + 1)
			setCurrentUPC(newUPC)
			e.target.select()
		}
	}
	function handleKeyUp(e, i) {
		e.target.select()
		if (
			e.keyCode === 8 &&
			window.confirm('Are you sure you want to delete this digit?')
		)
			setCurrentUPC(currentUPC.substring(0, i) + currentUPC.substring(i + 1))
		if (
			e.key === ' ' &&
			window.confirm(
				'Are you sure you want to insert a digit BEFORE this digit?',
			)
		)
			setCurrentUPC(currentUPC.substring(0, i) + ' ' + currentUPC.substring(i))
	}
	return (
		<Container>
			{currentUPC.split('').map((digit, i) => (
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
					onChange={(e) => handleChange(e, i)}
					onKeyPress={(e) => e.target.select()}
					onKeyUp={(e) => handleKeyUp(e, i)}
					value={digit}
				/>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`
const Input = styled.input`
	-webkit-appearance: none;
	width: 1.5em;
	background: none;
	border: none;
	text-align: center;
	font-family: monospace;
	font-size: 1.5em;
`

export default NumberPicker
