import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		}
	},
	// server: {
	// 	host: true,
	// 	hmr: {
	// 		protocol: 'wss',
	// 		host: 'ample-jay-top.ngrok-free.app',
	// 		port: 443
	// 	}
	// }
});
