import { DeleteOutlined } from '@ant-design/icons'
import { Modal } from 'antd'
import React from 'react'

export const Confirm = (question, value = '', callback) => {
	const buttonProps = { size: 'large' }
	Modal.confirm({
		icon: <DeleteOutlined style={{ color: 'red' }} />,
		title: question,
		content: <p style={{ fontSize: '2em' }}>{value}</p>,
		onOk() {
			callback()
		},
		onCancel() {},
		maskClosable: true,
		okButtonProps: buttonProps,
		cancelButtonProps: buttonProps,
		centered: true,
	})
}
