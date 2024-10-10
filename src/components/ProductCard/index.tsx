'use client'
import { SERVER_URI } from '@/constants/serverUri'
import { useAuctionTimer } from '@/hooks/useAuctionTimer'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface ProductCardProps {
	title: string
	slug: string
	imageSrc?: string
	start_date: string
	end_date: string
	auction_status: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
	slug,
	title,
	imageSrc,
	start_date,
	end_date,
	auction_status,
}) => {
	const { timeLeft, isAuctionStarted } = useAuctionTimer(start_date, end_date)

	return (
		<div className='dark:bg-stone-200 p-4 rounded-lg'>
			<Link href={slug} className='dark:text-stone-950 text-xl font-bold'>
				{title}
			</Link>
			<div>
				<Image
					src={imageSrc ? `${SERVER_URI}${imageSrc}` : '/img/thumbnail.jpg'}
					alt={title}
					width={0}
					height={0}
					sizes='100vw'
					className='w-full h-48 object-cover mt-2 rounded'
				/>
			</div>
			{timeLeft && (
				<p className='text-stone-900 mt-2'>
					{isAuctionStarted ? 'Початок через: ' : 'Закінчення через: '}
					<strong>{timeLeft}</strong>
				</p>
			)}
		</div>
	)
}
