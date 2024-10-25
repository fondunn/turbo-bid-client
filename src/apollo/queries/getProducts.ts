import { gql } from '@apollo/client'
export const GET_PRODUCTS_VARIABLES = {
	sort: {
		asc: ['start_date:asc'],
		desc: ['start_date:desc'],
	},
	filters: {
		default: { auction_status: { in: ['pending', 'running'] } },
	},
}
export const GET_PRODUCTS = gql`
	query Products($sort: [String], $filters: ProductFiltersInput) {
		products(filters: $filters, sort: $sort) {
			documentId
			title
			start_date
			end_date
			auction_status
			images {
				url
			}
		}
	}
`
