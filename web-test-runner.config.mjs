import { visualRegressionPlugin } from '@web/test-runner-visual-regression/plugin'

export default {
  plugins: [
    visualRegressionPlugin({
      baseDir: 'test/screenshots',
      update: process.argv.includes('--update-visual-baseline'),
    }),
  ],
}
