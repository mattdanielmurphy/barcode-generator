import { Button as AntButton } from 'antd'
import React from 'react'

export const Button = (props) => (
	<AntButton
		css={`
			&:active,
			&:focus,
			&:hover {
				border: 1px solid #ddd;
				color: black;
			}
		`}
		{...props}
		size='large'
	/>
)
