import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
	nodeResolve: true,
	plugins: [
		esbuildPlugin({ ts: true }),
		{
			name: 'html-dev-src-script-replace-plugin',
			transform(context) {
				if (context.response.is('html')) {
					return {
						body: context.body.replace(
							/(<script\s.*)src=".+?"\s(.*)data-dev-src="(.+?)"(.+?>)/g,
							'$1src="$3"$2$4',
						),
					}
				}
			},
		},
	],
}
