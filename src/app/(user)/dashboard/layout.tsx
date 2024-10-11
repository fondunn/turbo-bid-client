import { DashboardMainNavigation } from '@/ui/dashboard-main-navigation'

interface DashboardLayoutProps {
	children: React.ReactNode
}
export default function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<>
			<DashboardMainNavigation />
			{children}
		</>
	)
}
