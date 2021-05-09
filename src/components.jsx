import { Button as AntButton } from 'antd'
import React from 'react'
import styled from 'styled-components'

const LargeButton = (props) => <AntButton {...props} size='large' />

export const Button = styled(LargeButton)`
	&:active,
	&:focus {
		border: 1px solid #ddd;
	}
`
