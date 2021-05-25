import 'react-number-picker/dist/style.css'

import { Confirm } from './Confirm'
import React from 'react'
import styled from 'styled-components'

const SingleDigitInput = ({ handleChange, handleKeyUp, digit, i }) => (
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
)

function NumberPicker({
	currentUPC,
	setCurrentUPC,
	editingMode,
	setEditingMode,
}) {
	const handleChange = (e, i) => {
		let { value } = e.target
		if (i) {
			console.log('i')
			if (/^\d$/.test(value)) {
				if (value === '-1') value = 9
				else if (value === '10') value = 0
				const newUPC =
					currentUPC.substring(0, i) + value + currentUPC.substring(i + 1)
				setCurrentUPC(newUPC)
				e.target.select()
			}
		} else {
			const isNegative = /^-/.test(e.target.value)
			const upc = e.target.value.replace(/\D/, '')
			console.log('upc', upc)
			if (isNegative) setCurrentUPC('-' + upc)
			else setCurrentUPC(upc)
		}
	}

	function handleKeyUp({ target, key, keyCode }, i) {
		console.log('key uo')
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
	if (editingMode) {
		return (
			<Container>
				<input
					type='text'
					value={currentUPC}
					onChange={handleChange}
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
			</Container>
		)
	} else {
		currentUPC = currentUPC || '0'
		return (
			<Container>
				{currentUPC.split('').map((digit, i) => (
					<SingleDigitInput digit={digit} i={i} handleKeyUp={handleKeyUp} />
				))}
			</Container>
		)
	}
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
