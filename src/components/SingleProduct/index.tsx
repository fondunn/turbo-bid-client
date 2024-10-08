'use client'
import { GET_PRODUCT_BY_SLUG } from '@/apollo/queries'
import { useQuery } from '@apollo/client'
import { notFound } from 'next/navigation'

interface SingleProductProps {
	slug: string
}
export const SingleProduct: React.FC<SingleProductProps> = ({ slug }) => {
	if (!slug) notFound()
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
		variables: {
			documentId: slug,
		},
	})

	if (loading) return <div>loading skeleton</div>
	if (error) return <div>{slug}</div>
	const { title, start_price, start_date, end_date } = data.product
	return (
		<div>
			<div>{title}</div>
			<div>{start_price}</div>
			<div>{start_date}</div>
			<div>{end_date}</div>
		</div>
	)
}
