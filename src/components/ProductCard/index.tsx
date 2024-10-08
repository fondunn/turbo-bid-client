import Link from 'next/link'
import React from 'react'

interface ProductCardProps {
	title: string
	slug: string
}

export const ProductCard: React.FC<ProductCardProps> = ({ slug, title }) => {
	return (
		<div className='dark:bg-stone-200'>
			<Link href={slug} className='dark:text-stone-950'>
				{title}
			</Link>
		</div>
	)
}
