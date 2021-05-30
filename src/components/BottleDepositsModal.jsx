import { BarcodeViewer } from '.'
import { Button } from '.'
import { Confirm } from './Confirm'
import Cookies from 'js-cookie'
import { Modal } from 'antd'
import { useState } from 'react'

const DepositCategory = ({ categoryName, quantities, setDepositCategory }) => {
	const handleChange = (e) => {
		if (
			e.target.value
				.split('\n')
				.every((line) => /^[1-9]+[\d\n]*$|^$/g.test(line))
		)
			setDepositCategory(e.target.value.split('\n'))
	}

	return (
		<>
			<p>{categoryName}</p>
			<textarea
				name={categoryName}
				value={quantities && quantities.length > 0 ? quantities.join('\n') : ''}
				onChange={handleChange}
				rows={10}
			/>
			<p>
				sum:{' '}
				<strong>{quantities.reduce((a, b) => Number(a) + Number(b), 0)}</strong>
			</p>
		</>
	)
}

const defaultDeposits = {
	zeroTo1LitreCartons: [],
	twoLitreCartons: [],
	zeroTo1LitreBottles: [],
	over1LitreBottles: [],
	sixPackBottles: [],
}

const Deposits = ({ savedDeposits = defaultDeposits }) => {
	const [deposits, setDeposits] = useState(savedDeposits)
	const [barcodes, setBarcodes] = useState([])

	const depositsAndLevies = {
		zeroTo1LitreCartons: { deposit: '40009066428', levy: '40031215780' },
		twoLitreCartons: { deposit: '40030050838', levy: '68113171045' },
		zeroTo1LitreBottles: { deposit: '40009066414', levy: '40009066421' },
		over1LitreBottles: { deposit: '40009066456', levy: '40009066463' },
		sixPackBottles: { deposit: '40009066470', levy: '40009066477' },
	}

	const setDepositCategory = (value, categoryName) => {
		const newDeposits = { ...deposits, [categoryName]: value }
		setDeposits(newDeposits)
		Cookies.set('deposits', newDeposits)

		function padToElevenDigits(n) {
			return '0'.repeat(11 - String(n).length) + String(n)
		}

		const barcodes = []
		Object.entries(newDeposits).forEach(([categoryName, quantities]) => {
			if (quantities && quantities.length > 0) {
				if (depositsAndLevies[[categoryName]]) {
					const c = depositsAndLevies[[categoryName]]
					const totalQuantity = quantities.reduce(
						(a, b) => Number(a) + Number(b),
						0,
					)
					if (totalQuantity) {
						const quantity =
							totalQuantity >= 100
								? '10' + padToElevenDigits(totalQuantity) + 'y'
								: String(totalQuantity)
						barcodes.push(c.deposit, quantity, c.levy, quantity)
						console.log(quantity)
					}
				}
			}
		})
		setBarcodes(barcodes)
	}
	return (
		<>
			<Button
				onClick={() =>
					Confirm(
						'Are you sure you want to clear all deposit quantites? (No going back)',
						'',
						() => {
							setDeposits(defaultDeposits)
							Cookies.set('deposits', {})
						},
					)
				}
			>
				Clear
			</Button>
			{Object.entries(deposits).map(([categoryName, quantities]) => (
				<DepositCategory
					categoryName={categoryName}
					quantities={quantities}
					setDepositCategory={(value) =>
						setDepositCategory(value, categoryName)
					}
				/>
			))}
			{barcodes.length > 0 && (
				<BarcodeViewer UPCs={barcodes} barcodeOptions={{ height: 200 }} />
			)}
		</>
	)
}

export const BottleDepositsModal = () => {
	const depositsCookie = Cookies.get('deposits')
	const savedDeposits = depositsCookie ? JSON.parse(depositsCookie) : undefined
	Modal.info({
		icon: false,
		content: <Deposits savedDeposits={savedDeposits} />,
		onOk() {},
		maskClosable: true,
		okButtonProps: {
			size: 'large',
		},
		centered: true,
	})
}
