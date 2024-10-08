'use client'
import { GET_PRODUCT_BY_SLUG } from '@/apollo/queries'
import { Button } from '@/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/ui/card'
import { Input } from '@/ui/input'
import { Separator } from '@/ui/separator'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
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
	const {
		title,
		description,
		bids,
		current_bid,
		start_price,
		start_date,
		end_date,
	} = data.product
	return (
		<div className='container mx-auto p-4'>
			<Card className='w-full mx-auto'>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div>
							<Image
								src='https://images.unsplash.com/photo-1659651933304-5234df40dda3?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								alt='funko'
								width={400}
								height={300}
								className='rounded-lg object-cover w-full h-auto max-h-96'
							/>
						</div>
						<div className='space-y-4'>
							<p>{description}</p>
							<div className='flex justify-between'>
								<span>Start Price:</span>
								<span className='font-semibold'>{start_price} uah</span>
							</div>
							<div className='flex justify-between'>
								<span>Current Bid:</span>
								<span className='font-semibold'>
									{current_bid ? current_bid : start_price} uah
								</span>
							</div>
							<div className='flex justify-between'>
								<span>Time Left:</span>
								<span className='font-semibold'>time left</span>
							</div>
							<div className='flex space-x-2'>
								<Input
									type='number'
									placeholder='Enter bid amount'
									// value={bidAmount}
									// onChange={(e) => setBidAmount(e.target.value)}
									className='flex-grow'
								/>
								<Button>Place Bid</Button>
							</div>
						</div>
					</div>
					<Separator className='my-6' />
					<div>
						<h3 className='text-lg font-semibold mb-4'>Bid History</h3>
						<ul className='space-y-4'>
							{/* {bids.map(bid => (
								<li key={bid.id} className='flex items-center justify-between'>
									<div className='flex items-center space-x-2'>
										<Avatar>
											<AvatarFallback>{bid.user[0]}</AvatarFallback>
										</Avatar>
										<span>{bid.user}</span>
									</div>
									<div className='flex items-center space-x-4'>
										<span className='font-semibold'>${bid.amount}</span>
										<span className='text-sm text-muted-foreground'>
											{new Date(bid.time).toLocaleString()}
										</span>
									</div>
								</li>
							))} */}
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
