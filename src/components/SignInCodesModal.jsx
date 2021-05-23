import { BarcodeViewer } from '.'
import Cookies from 'js-cookie'
import { Modal } from 'antd'
import { useState } from 'react'

const SignInCodesViewer = ({ authenticated }) => {
	const [auth, setAuth] = useState(authenticated)
	return auth ? (
		<BarcodeViewer
			noWrapper
			UPCs={[process.env.REACT_APP_USER, process.env.REACT_APP_PASS]}
		/>
	) : (
		<input
			type='password'
			onChange={(e) => {
				if (e.target.value === 'houseplants') {
					Cookies.set('user', 'houseplants')
					setAuth(true)
				}
			}}
		/>
	)
}

export const SignInCodesModal = () => {
	const user = Cookies.get('user')
	Modal.info({
		icon: false,
		content: <SignInCodesViewer authenticated={user === 'houseplants'} />,
		onOk() {},
		maskClosable: true,
		okButtonProps: {
			size: 'large',
		},
		centered: true,
	})
}
