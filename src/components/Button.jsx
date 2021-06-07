import { Button as AntButton } from 'antd'
import React from 'react'

export const Button = (props) => (
	<AntButton
		css={`
			border: 1.5px solid #ccc;
			text-transform: uppercase;
			font-weight: 500;
			border-radius: 5px;
			&:active,
			&:focus,
			&:hover {
				border: 1px solid #ddd;
				color: black;
			}
			line-height: 0.1;
			color: #444;
			@media (prefers-color-scheme: dark) {
				color: #ccc;
				background: none;
				border: 1px solid #555;
				&:hover {
					color: #ccc;
					background: rgba(255, 255, 255, 0.3);
					border: 1px solid #555;
				}
			}
		`}
		{...props}
		size='large'
	/>
)
