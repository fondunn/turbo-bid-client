'use client'
import Image from 'next/image'
import { FC, memo } from 'react'

interface ThumbnailProps {
	imageUrl: string
	alt: string
}

export const Thumbnail: FC<ThumbnailProps> = memo(({ imageUrl, alt }) => {
	return (
		<Image
			src={imageUrl}
			alt={alt}
			width={0}
			height={0}
			sizes='100vw'
			className='w-full h-48 object-contain'
			loading='lazy'
		/>
	)
})
