import 'react-number-picker/dist/style.css'

import { Confirm } from './Confirm'
import React from 'react'
import styled from 'styled-components'

function NumberPicker({
	currentUPC,
	setCurrentUPC,
	editingMode,
	setEditingMode,
}) {
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
	function handleKeyUp({ target, key, keyCode }, i) {
		target.select()
		if (keyCode === 8)
			Confirm('Are you sure you want to delete this digit?', target.value, () =>
				setCurrentUPC(currentUPC.substring(0, i) + currentUPC.substring(i + 1)),
			)

		if (key === ' ')
			Confirm(
				'Are you sure you want to insert a digit BEFORE this digit?',
				target.value,
				() =>
					setCurrentUPC(
						currentUPC.substring(0, i) + ' ' + currentUPC.substring(i),
					),
			)
	}
	return (
		<Container>
			{editingMode ? (
				<input
					type='number'
					value={currentUPC}
					onChange={(e) => setCurrentUPC(e.target.value)}
					onBlur={() => setEditingMode(false)}
					onKeyUp={({ key }) => key === 'Enter' && setEditingMode(false)}
					autoFocus={true}
					css={`
						font-size: 1.4em;
						font-family: monospace;
						border: none;
						letter-spacing: 0.1em;
						padding: 0.1em 0.2em 0.1em 0.2em;
						margin-bottom: 0;
					`}
				/>
			) : (
				currentUPC.split('').map((digit, i) => (
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
						key={i}
					/>
				))
			)}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`
const Input = styled.input`
	-webkit-appearance: none;
	width: 1.6em;
	background: none;
	border: none;
	text-align: center;
	font-family: monospace;
	font-size: 1.4em;
`

export default NumberPicker
