import clsx from 'clsx'
import { ReservedClasses } from '../config'

export const ProductCardContainer = ({
	status,
	children,
}: {
	status: AuctionStatus
	children: React.ReactNode
}) => {
	const BackgroundClass = ({ status }: { status: AuctionStatus }) => {
		if (status === 'pending') return ReservedClasses.pending
		if (status === 'running') return ReservedClasses.running
		if (status === 'finished') return ReservedClasses.finished
		return ReservedClasses.finished
	}
	const bg = BackgroundClass({ status })
	return (
		<div
			className={clsx(
				'p-4 rounded-lg hover:scale-105 transition-all duration-200 ease-in-out',
				bg
			)}
		>
			{children}
		</div>
	)
}
