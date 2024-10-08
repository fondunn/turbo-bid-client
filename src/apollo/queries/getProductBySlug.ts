import { gql } from '@apollo/client'

export const GET_PRODUCT_BY_SLUG = gql`
	query GetProductBySlug($documentId: ID!) {
		product(documentId: $documentId) {
			title
			start_price
			start_date
			end_date
			description
			bids
			current_bid
		}
	}
`
