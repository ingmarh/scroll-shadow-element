import { readFileSync, writeFileSync } from 'node:fs'
import { minifyHTMLLiterals } from 'minify-html-literals'
import type { BuildContext } from 'unbuild'
import type { Template } from 'parse-literals'

function isComponentHTMLTemplate(template: Template) {
	return template.parts.some((part) => part.text.includes('<slot>'))
}

export default {
	hooks: {
		'build:done': (ctx: BuildContext) => {
			// Minify HTML and CSS in the component
			writeFileSync(
				ctx.pkg.main,
				minifyHTMLLiterals(readFileSync(ctx.pkg.main, { encoding: 'utf8' }), {
					fileName: ctx.pkg.main,
					shouldMinify: isComponentHTMLTemplate,
				}).code
			)

			console.log(`✔ Minified HTML template literals in ${ctx.pkg.main}`)
		},
	},
}
