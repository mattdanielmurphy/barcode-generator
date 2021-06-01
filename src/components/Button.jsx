import { Button as AntButton } from 'antd'
import React from 'react'

export const Button = (props) => (
	<AntButton
		css={`
			border: 1.5px solid #666;
			text-transform: uppercase;
			font-weight: 500;
			background: hsl(20, 255, 90);
			border-radius: 2px;
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
