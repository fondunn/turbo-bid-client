'use client'
import { GET_PRODUCTS } from '@/apollo/queries'
import { useQuery } from '@apollo/client'
import { FC } from 'react'

const Products: FC = () => {
	const { data, loading, error } = useQuery(GET_PRODUCTS)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>

	return <div>{JSON.stringify(data, null, 2)}</div>
}

export default Products
