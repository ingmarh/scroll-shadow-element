import { defineConfig } from 'tsup'
import { minifyHTMLLiterals } from 'minify-html-literals'
import { readFileSync, writeFileSync } from 'node:fs'
import type { Template } from 'parse-literals'

const pkg = JSON.parse(readFileSync('./package.json', { encoding: 'utf8' }))

function isComponentHTMLTemplate(template: Template) {
	return template.parts.some((part) => part.text.includes('<slot>'))
}

export default defineConfig({
	entry: ['src/index.ts'],
	format: 'esm',
	platform: 'browser',
	target: 'es2020',
	dts: true,
	clean: true,

	async onSuccess() {
		// Minify HTML and CSS in the component
		writeFileSync(
			pkg.main,
			minifyHTMLLiterals(readFileSync(pkg.main, { encoding: 'utf8' }), {
				fileName: pkg.main,
				shouldMinify: isComponentHTMLTemplate,
			}).code
		)
		console.log(`✔ Minified HTML template literals in ${pkg.main}`)
	}
})
