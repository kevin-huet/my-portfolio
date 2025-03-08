import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression';

// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
import vuetify from 'vite-plugin-vuetify'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@services': path.resolve(__dirname, 'src/services'),
			'@components': path.resolve(__dirname, 'src/components'),
			'@stores': path.resolve(__dirname, 'src/stores'),
			'@utils': path.resolve(__dirname, 'src/utils'),
			'@dto': path.resolve(__dirname, 'src/dto'),
			'@plugins': path.resolve(__dirname, 'src/plugins')
		}
	},
  	plugins: [
	    viteCompression(),
		vue(),
		vuetify({ autoImport: true }),
	],
	define: {
		__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
	}
})
