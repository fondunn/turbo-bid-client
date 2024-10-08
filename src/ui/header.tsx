'use client'

import { HEADER_URIS } from '@/config'
import { Button } from '@/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export const Header = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<header className='sticky top-0 z-50 w-full  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='container grid h-14 max-w-screen-2xl mx-auto grid-cols-2 md:grid-cols-3 items-center px-1 md:px-2 lg:px-4'>
				<div className='flex items-center'>
					<Link className='flex items-center space-x-2' href='/'>
						<span className='font-bold'>LOGO</span>
					</Link>
				</div>
				<nav className='hidden md:flex items-center justify-center space-x-6 text-sm font-medium'>
					{HEADER_URIS.map(({ title, uri }) => (
						<Link
							key={title}
							href={uri}
							className='transition-colors hover:text-foreground/80 text-foreground/60'
						>
							{title}
						</Link>
					))}
				</nav>
				<div className='flex items-center justify-end'>
					<Button className='hidden md:inline-flex'>Login</Button>
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button
								variant='ghost'
								className='px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
							>
								<Menu className='h-6 w-6' />
								<span className='sr-only'>Toggle Menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side='right' className='pr-0'>
							<MobileNav />
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}

function MobileNav() {
	return (
		<div className='flex flex-col space-y-3'>
			{HEADER_URIS.map(({ title, uri }) => (
				<Link
					key={title}
					href={uri}
					className='text-foreground/60 transition-colors hover:text-foreground/80'
				>
					{title}
				</Link>
			))}
			<Button>Login</Button>
		</div>
	)
}
