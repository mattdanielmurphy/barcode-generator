import 'react-number-picker/dist/style.css'

import React from 'react'
import styled from 'styled-components'

function NumberPicker({ currentUPC, setCurrentUPC }) {
	function handleChange(e, i) {
		let { value } = e.target
		console.log(value)
		if (!value) value = ' '
		else if (value === '-1') value = 9
		else if (value === '10') value = 0
		console.log(value)
		let newUPC =
			currentUPC.substring(0, i) + value + currentUPC.substring(i + 1)
		setCurrentUPC(newUPC)
	}

	// const [origin, setOrigin] = useState()
	// const [selectedDigit, setSelectedDigit] = useState()

	// function handleMouseDown(e) {
	// 	setOrigin(e.screenY)
	// 	setSelectedDigit(e.target)
	// 	e.preventDefault()
	// }

	// useEffect(() => {
	// 	function handleMouseMove(e) {
	// 		if (origin !== undefined && Math.abs(origin - e.screenY) > 5) {
	// 			if (e.screenY >= origin) {
	// 				e.target.value = Math.round((e.screenY - origin) / 10)
	// 			} else {
	// 				console.log(origin - e.screenY)
	// 				console.log(Math.round((origin - e.screenY) / 10))
	// 				e.target.value = Math.round((origin - e.screenY) / 10)
	// 			}
	// 		} else {
	// 			// console.log(selectedDigit)
	// 		}
	// 	}
	// 	function handleMouseUp(e) {
	// 		// console.log(origin - e.screenY)
	// 		// if (origin !== undefined && Math.abs(origin - e.screenY) > 5) {
	// 		// 	if (e.screenY > origin) e.target.value++
	// 		// 	else e.target.value--
	// 		// } else {
	// 		// 	console.log(selectedDigit)
	// 		// }
	// 		setOrigin(undefined)
	// 	}
	// 	document.addEventListener('mouseup', handleMouseUp)
	// 	document.addEventListener('mousemove', handleMouseMove)
	// 	return () => {
	// 		document.removeEventListener('mouseup', handleMouseUp)
	// 		document.removeEventListener('mousemove', handleMouseMove)
	// 	}
	// }, [origin, selectedDigit])

	return (
		<Container>
			{currentUPC.split('').map((digit, i) => (
				<Input
					type='number'
					onChange={(e) => handleChange(e, i)}
					// onMouseDown={handleMouseDown}
					value={digit}
				/>
				// <Select
				// 	key={i}
				// 	type='number'
				// 	value={digit}
				// 	onChange={(e) => handleChange(e, i)}
				// >
				// 	{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => (
				// 		<option value={v}>{v}</option>
				// 	))}
				// </Select>
			))}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: center;
`
// const Select = styled.select`
// 	-webkit-appearance: none;
// 	border: none;
// 	font-size: 1.5em;
// 	width: 0.8em;
// 	margin: 0;
// 	background: none;
// `

const Input = styled.input`
	-webkit-appearance: none;
	width: 2em;
`

export default NumberPicker
