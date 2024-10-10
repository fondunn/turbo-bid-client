type AuctionStatus = 'pending' | 'running' | 'finished'

interface IProduct {
	title: string
	documentId: string
	start_date: string
	end_date: string
	auction_status: AuctionStatus
	images: {
		url: string
	}[]
}

interface IProductData {
	products: IProduct[]
}

interface ProductCardProps {
	title: string
	slug: string
	imageSrc?: string
	start_date: string
	end_date: string
	auction_status: AuctionStatus
}
