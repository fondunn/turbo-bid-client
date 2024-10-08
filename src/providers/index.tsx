'use client'

import { client } from '@/apollo/client'
import { ApolloProvider } from '@apollo/client'

interface RootProvider {
	children: React.ReactNode
}
export const RootProvider: React.FC<RootProvider> = ({ children }) => {
	return (
		<>
			<ApolloProvider client={client}>{children}</ApolloProvider>
		</>
	)
}
