import { Divider, Modal, Typography } from 'antd'
import { useEffect, useState } from 'react'

import { BarcodeViewer } from '.'
import { Button } from '.'
import { Confirm } from './Confirm'
import Cookies from 'js-cookie'
import TextareaAutosize from 'react-textarea-autosize'

const { Title } = Typography

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
		<div
			css={`
				margin-top: 2em;
				margin-bottom: 4em;
			`}
		>
			<Title level={2}>{categoryName}</Title>
			<TextareaAutosize
				name={categoryName}
				value={quantities && quantities.length > 0 ? quantities.join('\n') : ''}
				onChange={handleChange}
				rows={10}
				css={`
					font-size: 1.3em;
					border: 2.5px solid #777;
					padding: 0.4em;
					font-weight: 500;
					border-radius: 0.2em;
					width: 100%;
					&:focus {
						outline: none;
						border: 2.5px solid #ff0005;
					}
				`}
			/>
			<Title level={4}>
				= {quantities.reduce((a, b) => Number(a) + Number(b), 0)}
			</Title>
			<Divider />
		</div>
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
	function makeBarcodes(deposits) {
		const depositsAndLevies = {
			zeroTo1LitreCartons: { deposit: '40009066428', levy: '40031215780' },
			twoLitreCartons: { deposit: '40030050838', levy: '68113171045' },
			zeroTo1LitreBottles: { deposit: '40009066414', levy: '40009066421' },
			over1LitreBottles: { deposit: '40009066456', levy: '40009066463' },
			sixPackBottles: { deposit: '40009066470', levy: '40009066477' },
		}

		const barcodes = []
		Object.entries(deposits).forEach(([categoryName, quantities]) => {
			if (quantities && quantities.length > 0) {
				if (depositsAndLevies[[categoryName]]) {
					const c = depositsAndLevies[[categoryName]]
					const totalQuantity = quantities.reduce(
						(a, b) => Number(a) + Number(b),
						0,
					)
					if (totalQuantity >= 100) {
						barcodes.push(
							c.deposit,
							totalQuantity,
							'y',
							c.levy,
							totalQuantity,
							'y',
						)
					} else if (totalQuantity) {
						barcodes.push(c.deposit, totalQuantity, c.levy, totalQuantity)
					}
				}
			}
		})
		return barcodes
	}

	const [deposits, setDeposits] = useState(() =>
		Object.values(savedDeposits).length > 0 ? savedDeposits : defaultDeposits,
	)
	const [barcodes, setBarcodes] = useState(() => {
		console.log('savedDeposits', savedDeposits)
		if (Object.values(savedDeposits).length > 0) {
			return makeBarcodes(savedDeposits)
		} else return []
	})
	const setDepositCategory = (value, categoryName) => {
		const newDeposits = { ...deposits, [categoryName]: value }
		setDeposits(newDeposits)
		Cookies.set('deposits', newDeposits)
		setBarcodes(makeBarcodes(newDeposits))
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
			<div>
				{Object.entries(deposits).map(([categoryName, quantities]) => (
					<DepositCategory
						categoryName={categoryName}
						quantities={quantities}
						setDepositCategory={(value) =>
							setDepositCategory(value, categoryName)
						}
					/>
				))}
			</div>
			{
				<Title level={2}>
					Total bottles:{' '}
					{Object.values(deposits).length > 0 &&
						Object.values(deposits).reduce(
							(prev, curr) =>
								Number(prev) +
								curr.reduce(
									(prevC, currC) => Number(prevC) + Number(currC),
									[],
								),
							[],
						)}
				</Title>
			}
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
