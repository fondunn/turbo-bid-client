'use client'
import { GET_PRODUCT_BY_SLUG } from '@/apollo/queries'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
import { Separator } from '@/ui/separator'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { io } from 'socket.io-client'
interface SingleProductProps {
	slug: string
}
interface Image {
	url: string
}
interface SingleProduct {
	title: string
	description: string
	start_price: number
	start_date: string
	end_date: string
	images: Image[]
	bids: any[]
	current_bid: number
	minimal_step: number | null | undefined
}

import { useEffect, useState } from 'react'
import { initBidInput } from './utils/initBidInput'

export const SingleProduct: React.FC<SingleProductProps> = ({ slug }) => {
	if (!slug) notFound()
	const { data, loading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
		variables: {
			documentId: slug,
		},
	})

	const [socket, setSocket] = useState(null)
	const [bidAmount, setBidAmount] = useState(0)
	const [currentBid, setCurrentBid] = useState(undefined)
	const [bids, setBids] = useState(data?.product?.bids || [])

	useEffect(() => {
		const newSocket = io('http://localhost:8881')
		setSocket(newSocket)

		newSocket.emit('JOIN_AUCTION', slug)
		newSocket.on(
			'AUCTION_DATA',
			({ start_price, current_bid, bids, minimal_step }) => {
				console.log({
					start_price,
					current_bid,
					bids,
					minimal_step,
				})
				const bid = initBidInput({ minimal_step, currentBid: current_bid })
				if (bid) setBidAmount(bid)
				setCurrentBid(current_bid)
				setBids(bids)
			}
		)
		newSocket.on('BID_UPDATED', ({ current_bid, bids }) => {
			setCurrentBid(current_bid)
			setBids(bids)
		})

		return () => {
			newSocket.disconnect()
		}
	}, [slug])

	const handleBid = () => {
		if (socket) {
			socket.emit('PLACE_BID', { documentId: slug, newBid: bidAmount })
		}
	}

	if (loading) return <div>loading skeleton</div>
	if (error) return <div>{slug}</div>

	const {
		title,
		description,
		start_price,
		start_date,
		end_date,
		images,
		minimal_step,
	} = data.product as SingleProduct

	const initialInputValue = initBidInput({ minimal_step, currentBid })
	return (
		<div className='container mx-auto p-4'>
			<Card className='w-full mx-auto'>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							{images &&
								images.length > 0 &&
								images.map((image, idx) => (
									<Image
										key={idx}
										src={`http://localhost:1337${image.url}`}
										alt='funko'
										width={400}
										height={300}
										className='rounded-lg object-cover w-full h-auto max-h-96'
									/>
								))}
						</div>
						<div className='space-y-4'>
							<p>{description}</p>
							<BidInfoRow title='Start Price:' price={start_price} />
							{currentBid && (
								<BidInfoRow title='Current Bid:' price={currentBid} />
							)}
							<div className='flex space-x-2'>
								<Input
									step={minimal_step ?? undefined}
									min={initialInputValue}
									value={bidAmount}
									type='number'
									placeholder='Enter bid amount'
									onChange={e => setBidAmount(Number(e.target.value))}
									className='flex-grow'
								/>
								<Button onClick={handleBid}>Place Bid</Button>
							</div>
						</div>
					</div>
					<Separator className='my-6' />
					<div>
						<h3 className='text-lg font-semibold mb-4'>Bid History</h3>
						<ul className='space-y-4'>
							{bids &&
								bids.map((bid, idx) => {
									if (typeof bid === 'string' || typeof bid === 'number') return
									return (
										<div key={idx} className='flex gap-2'>
											<p>user: {bid?.bid_user || '---'}</p>
											<p>amount: {bid?.bid_value || '---'}</p>
											<p>date: {bid?.bid_date || '---'}</p>
										</div>
									)
								})}
						</ul>
					</div>
				</CardContent>
				<CardFooter className='justify-between'>
					<Button variant='outline'>Share</Button>
					<Button variant='outline'>Add to Watchlist</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

const BidInfoRow = ({ title, price }: { title: string; price: number }) => {
	return (
		<div className='flex justify-between'>
			<span>{title}</span>
			<span className='font-semibold'>{price} uah</span>
		</div>
	)
}
