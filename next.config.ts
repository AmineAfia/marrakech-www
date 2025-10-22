import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		qualities: [75, 80, 85, 90, 95, 100],
	},
	webpack: (config) => {
		config.externals.push("@libsql/client");
		return config;
	},
};

export default nextConfig;
