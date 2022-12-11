import { defineConfig } from 'tsup'
import { minifyHTMLLiteralsPlugin } from 'esbuild-plugin-minify-html-literals'

export default defineConfig({
	entry: ['src/index.ts'],
	format: 'esm',
	platform: 'browser',
	target: 'es2020',
	dts: true,
	clean: true,
	esbuildPlugins: [
		// Minify HTML and CSS in the component
		minifyHTMLLiteralsPlugin({
			shouldMinify(template) {
				return template.parts.some(
					(part) => part.text.includes('<slot>') || part.text.includes('px;')
				)
			},
		}),
	],
})
