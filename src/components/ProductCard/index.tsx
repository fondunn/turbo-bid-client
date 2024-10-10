'use client'
import { useAuctionTimer } from '@/hooks/useAuctionTimer'
import Link from 'next/link'
import React from 'react'
import { useProductCard } from './hooks/useProductCard'
import { ProductCardContainer } from './ui/container'
import { Thumbnail } from './ui/thumbnail'

export const ProductCard: React.FC<ProductCardProps> = ({
	slug,
	title,
	imageSrc,
	start_date,
	end_date,
	auction_status,
}) => {
	const { timeLeft, isAuctionStarted } = useAuctionTimer(start_date, end_date)
	const { label, imageUrl } = useProductCard({
		status: isAuctionStarted,
		imageSrc,
	})
	return (
		<ProductCardContainer status={auction_status}>
			<Link href={slug} className='dark:text-stone-950'>
				{title}
				<div className='p-2 '>
					<Thumbnail imageUrl={imageUrl} alt={title} />
				</div>
				{timeLeft && (
					<p className='text-stone-900 mt-2'>
						{label}
						<strong>{timeLeft}</strong>
					</p>
				)}
			</Link>
		</ProductCardContainer>
	)
}
