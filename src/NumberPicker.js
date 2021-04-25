import 'react-number-picker/dist/style.css'

// import NumberPicker from 'react-number-picker'
import React from 'react'

class Wrapper extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: 1.99,
		}
	}

	handleChange(new_value) {
		console.log('new value', new_value)
		this.setState({ value: new_value })
	}

	render() {
		return (
			<div>hi</div>
			// <NumberPicker
			// 	value={this.state.value}
			// 	onChange={this.handleChange.bind(this)}
			// />
		)
	}
}

export default Wrapper
