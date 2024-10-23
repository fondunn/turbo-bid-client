import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
	query Products {
		products(
			filters: { auction_status: { in: ["pending", "running"] } }
			sort: ["start_date:asc"]
		) {
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
