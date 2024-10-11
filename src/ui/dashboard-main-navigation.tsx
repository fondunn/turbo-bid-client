'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const routes = [
	{ href: '/dashboard', label: 'Статистика' },
	{ href: '/dashboard/my-auctions', label: 'Мої аукціони' },
	{ href: '/dashboard/settings', label: 'Налаштування' },
]

export const DashboardMainNavigation = () => {
	return (
		<div className='flex justify-between container mx-auto mt-4'>
			<nav className='flex gap-4'>
				{routes.map(route => (
					<Link
						key={route.href}
						href={route.href}
						className={clsx(useActiveLink(route.href))}
					>
						{route.label}
					</Link>
				))}
			</nav>
		</div>
	)
}

export const useActiveLink = (href: string) => {
	const pathname = usePathname()
	return pathname === href
		? 'text-green-500'
		: 'text-stone-200 hover:text-stone-200/90 hover:underline'
}
