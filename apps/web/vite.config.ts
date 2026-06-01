import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@xenon/web': path.resolve(__dirname, './src'),
			'@xenon/api': path.resolve(__dirname, '../api/src'),
			components: path.resolve(__dirname, 'src/components'),
			ui: path.resolve(__dirname, 'src/common/components/ui'),
			lib: path.resolve(__dirname, 'src/common/lib'),
			hooks: path.resolve(__dirname, 'src/common/hooks'),
			utils: path.resolve(__dirname, 'src/common/utils'),
		},
	},
})
