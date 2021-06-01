import { Modal } from 'antd'
import React from 'react'

export const Confirm = (
	question,
	description = '',
	callback = () => {},
	modalOptions = {},
) => {
	const buttonProps = { size: 'large' }
	Modal.confirm({
		title: question,
		content: <p style={{ fontSize: '2em' }}>{description}</p>,
		onOk() {
			callback()
		},
		onCancel() {},
		okButtonProps: buttonProps,
		cancelButtonProps: buttonProps,
		centered: true,
		...modalOptions,
	})
}
