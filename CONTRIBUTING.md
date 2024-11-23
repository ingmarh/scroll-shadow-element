# Contributing

Please follow these basic guidelines:

1. Test manually with `npm run dev`.
2. Run the [test suites](#visual-regression-tests).
3. Follow the existing code style.

## Visual regression tests

Since the visual regression baseline images can slightly differ per operating
system, the repository only contains baseline images that are used on CI.

For development, first create local baseline images:

1. `npm test -- --update-visual-baseline` to create local baseline images.
2. `npm test` to run the tests against these local baseline images after making changes
   (`npm test -- --watch` for watch mode).
