import { BarcodeViewer } from '.'
import { Modal } from 'antd'

const SignInCodesViewer = () => (
	<BarcodeViewer
		noWrapper
		UPCs={[process.env.REACT_APP_USER, process.env.REACT_APP_PASS]}
	/>
)

const modalOptions = {
	icon: false,
	content: <SignInCodesViewer />,
	onOk() {},
	maskClosable: true,
	okButtonProps: {
		size: 'large',
	},
	centered: true,
}

export const SignInCodesModal = () => Modal.info(modalOptions)
