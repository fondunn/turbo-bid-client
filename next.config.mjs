/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		SERVER_PROTOCOL: process.env.SERVER_PROTOCOL,
		SERVER_HOST: process.env.SERVER_HOST,
		SERVER_URI: process.env.SERVER_URI,
	},
	// reactStrictMode: true,
	// swcMinify: true,
	// output: 'standalone',
	// experimental: {
	// 	externalDir: true,
	// },
	// webpack: (config, { isServer }) => {
	// 	if (!isServer) {
	// 		config.resolve.fallback = {
	// 			fs: false,
	// 			path: false,
	// 			os: false,
	// 			tty: false,
	// 		}
	// 	}
	// 	return config
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
			{
				protocol: 'http',
				hostname: '**',
			},
			{
				protocol: process.env.SERVER_PROTOCOL,
				hostname: process.env.SERVER_HOST,
			},
		],
	},
}

export default nextConfig
