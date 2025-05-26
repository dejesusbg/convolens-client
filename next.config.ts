/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/analyze',
				destination: '/api/analyze',
			},
		];
	},
};

module.exports = nextConfig;
