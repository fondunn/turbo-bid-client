'use client'
import { ChevronLeft, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from './button'

export const DashboardPageNavigation = () => {
	const { goBack } = useDashboardPageNavigation()
	return (
		<div className='container mx-auto my-4 max-w-screen-2xl w-full'>
			<nav className='flex justify-between'>
				<Button onClick={goBack} className='bg-stone-200 text-stone-950 group '>
					<ChevronLeft className='group-hover:-translate-x-1 transition-all duration-150' />
					Назад
				</Button>
				<Button onClick={goBack} className='bg-green-500 text-stone-50 group '>
					Зберегти
					<Save className='group-hover:scale-105 ml-2 transition-all duration-150' />
				</Button>
			</nav>
		</div>
	)
}

const useDashboardPageNavigation = () => {
	const router = useRouter()
	return {
		goBack: () => router.back(),
	}
}
