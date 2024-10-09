export const initBidInput = ({ minimal_step, currentBid }) => {
	if (currentBid === null) return undefined
	if (currentBid && minimal_step === null) return currentBid
	if (currentBid && minimal_step) return currentBid + minimal_step
}
