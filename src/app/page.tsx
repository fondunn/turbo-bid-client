import Link from 'next/link'

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
				<Link
					href='discover'
					className='px-8 py-4 bg-stone-200 text-stone-950 hover:bg-stone-200/90'
				>
					Discover
				</Link>
			</main>
		</div>
	)
}
