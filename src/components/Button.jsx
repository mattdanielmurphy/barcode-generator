import { Button as AntButton } from 'antd'
import React from 'react'

export const Button = (props) => (
	<AntButton
		css={`
			&:active,
			&:focus {
				border: 1px solid #ddd;
			}
		`}
		{...props}
		size='large'
	/>
)
