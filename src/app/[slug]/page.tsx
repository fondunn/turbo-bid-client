import { SingleProduct } from '@/components/SingleProduct'
import { notFound } from 'next/navigation'

export default function SingleProductPage({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = params
	if (!slug) notFound()
	return <SingleProduct slug={slug} />
}
