import { SERVER_URI } from '@/constants/serverUri'
import { getLabel } from '../utils/getLabel'

export const useProductCard = ({
	status,
	imageSrc,
}: {
	status: boolean
	imageSrc: string | undefined
}) => {
	const label = getLabel({ status })
	const imageUrl = imageSrc ? `${SERVER_URI}${imageSrc}` : '/img/thumbnail.jpg'
	return {
		label,
		imageUrl,
	}
}
