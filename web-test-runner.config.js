import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin'
import { esbuildPlugin } from '@web/dev-server-esbuild'

export default {
	nodeResolve: true,
	plugins: [
		esbuildPlugin({ ts: true }),
		visualRegressionPlugin({
			baseDir: process.env.CI ? 'test/ci/screenshots' : 'test/screenshots',
			update: process.argv.includes('--update-visual-baseline'),
		}),
	],
}
