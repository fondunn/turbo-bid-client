'use client'
import { GET_PRODUCTS } from '@/apollo/queries'
import { useQuery } from '@apollo/client'
import { FC } from 'react'
import { ProductCard } from '../ProductCard'

const Products: FC = () => {
	const { data, loading, error } = useQuery(GET_PRODUCTS)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>
	const { products } = data as IProductData
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 container mx-auto px-1 md:px2 lg:px-4'>
			{products.map(
				(
					{ title, documentId, auction_status, start_date, end_date, images },
					index: number
				) => {
					return (
						<ProductCard
							key={index}
							title={title}
							slug={documentId}
							auction_status={auction_status}
							end_date={end_date}
							start_date={start_date}
							imageSrc={images[0]?.url || undefined}
						/>
					)
				}
			)}
		</div>
	)
}

export default Products
