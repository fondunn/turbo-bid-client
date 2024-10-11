import { DashboardPageNavigation } from './dashboard-page-navigation'
interface DashboardPageLayoutProps {
	children: React.ReactNode
}
export const DashboardPageLayout: React.FC<DashboardPageLayoutProps> = ({
	children,
}) => {
	return (
		<>
			<DashboardPageNavigation />
			{children}
		</>
	)
}
