# &lt;scroll-shadow&gt; element

[![npm version][npm-version-badge-src]][npm-package-href]
[![bundle size (minified and gzipped)][bundlesize-badge-src]][bundlesize-href]

A small web component to enhance scrollable elements with dynamic scroll
indicators.

🔎 [See the demo][demo-href]

## Usage

### Install

```bash
npm install scroll-shadow-element
```

<details><summary>Or load from a CDN like unpkg or Skypack</summary>

```html
<!-- unpkg CDN -->
<script type="module" src="https://unpkg.com/scroll-shadow-element"></script>

<!-- Skypack CDN -->
<script type="module" src="https://cdn.skypack.dev/scroll-shadow-element"></script>

<!-- Skypack CDN (minified) -->
<script type="module" src="https://cdn.skypack.dev/scroll-shadow-element?min"></script>
```

</details>

### Import

Import the module as part of your app bundle, or load it with a script tag.

```js
import 'scroll-shadow-element'
```

```html
<script type="module" src="./node_modules/scroll-shadow-element/dist/index.js"></script>
```

### Use

Wrap any element for dynamically added scroll indicators. For example:

```html
<scroll-shadow>
	<nav>Long navigation…</nav>
</scroll-shadow>
```

> **Note**
> When used with a non-scrollable `<table>` element, then it will be applied to
> the first `<tbody>`.

## Configuration

You can change the default appearance with CSS:

```css
/* Default configuration */
scroll-shadow {
	display: inline-block;
	--scroll-shadow-size: 14;
	--scroll-shadow-top: radial-gradient(farthest-side at 50% 0%, #0003, #0000);
	--scroll-shadow-bottom: radial-gradient(farthest-side at 50% 100%, #0003, #0000);
	--scroll-shadow-left: radial-gradient(farthest-side at 0%, #0003, #0000);
	--scroll-shadow-right: radial-gradient(farthest-side at 100%, #0003, #0000);
}

/* Example: dark mode */
@media (prefers-color-scheme: dark) {
	scroll-shadow {
		--scroll-shadow-top: radial-gradient(farthest-side at 50% 0%, #fff3, #0000);
		--scroll-shadow-bottom: radial-gradient(farthest-side at 50% 100%, #fff3, #0000);
		--scroll-shadow-left: radial-gradient(farthest-side at 0%, #fff3, #0000);
		--scroll-shadow-right: radial-gradient(farthest-side at 100%, #fff3, #0000);
	}
}
```

### CSS custom properties

| CSS property           | Description                                            | Syntax            |
| :--------------------- | :----------------------------------------------------- | :---------------- |
| --scroll-shadow-size   | Sets the maximum size of the scroll indicators         | `<integer>`       |
| --scroll-shadow-top    | Controls the appearance of the top scroll indicator    | `none \| <image>` |
| --scroll-shadow-bottom | Controls the appearance of the bottom scroll indicator | `none \| <image>` |
| --scroll-shadow-left   | Controls the appearance of the left scroll indicator   | `none \| <image>` |
| --scroll-shadow-right  | Controls the appearance of the right scroll indicator  | `none \| <image>` |

## Browser support

`scroll-shadow-element` works in all major browsers: all browsers that support
[Custom Elements][custom-elementsv1], [Resize Observer][resizeobserver] and the
[`min()` CSS function][css-math-functions]. In older browsers, the element just
won’t add scroll indicators.

The package is written with ES6 syntax. If you need to support older browsers,
you can configure your bundler to compile it to ES5 syntax.

## Using with Jest

```json
{
	"jest": {
		"moduleNameMapper": {
			"^scroll-shadow-element$": "jest-transform-stub"
		}
	}
}
```

[Jest doesn’t fully support ES modules][jest-esm]: Depending on your
configuration, you might see `SyntaxError: Unexpected token 'export'` along
with a few hints in the error output. Jest’s ["moduleNameMapper"
option][jest-modulenamemapper] can be used to stub the module out. You can use
any empty module, or [`jest-transform-stub`][jest-transform-stub].

## Pure CSS alternative

`<scroll-shadow>` is inspired by Lea Verou’s great [pure CSS scrolling shadows
technique with `background-attachment: local`][pure-css-alternative].

The main motivation to create a custom element was to find a solution to have
the shadows above the content and independent of the element’s background. If
you don’t have these requirements, the pure CSS technique might work for you
too.

## Development

- `npm install` to install dependencies
- `npm test -- --update-visual-baseline` to create local visual regression test baseline images
- `npm test` to run tests
- `npm start` to open a demo page for manual testing
- `npm run lint` to run linting checks
- `npm run lint:fix` to fix linting issues
- `npm run build` to build

## License

Distributed under the terms of the MIT license. See [LICENSE](LICENSE) for details.

[custom-elementsv1]: https://caniuse.com/custom-elementsv1
[resizeobserver]: https://caniuse.com/resizeobserver
[css-math-functions]: https://caniuse.com/css-math-functions
[pure-css-alternative]: https://lea.verou.me/2012/04/background-attachment-local/
[jest-esm]: https://jestjs.io/docs/ecmascript-modules
[jest-modulenamemapper]: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
[jest-transform-stub]: https://www.npmjs.com/package/jest-transform-stub
[npm-version-badge-src]: https://img.shields.io/npm/v/scroll-shadow-element?style=flat-square
[bundlesize-badge-src]: https://img.shields.io/bundlephobia/minzip/scroll-shadow-element?color=a8da93&style=flat-square
[npm-package-href]: https://npmjs.com/package/scroll-shadow-element
[bundlesize-href]: https://bundlephobia.com/package/scroll-shadow-element
[demo-href]: https://ingmarh.github.io/scroll-shadow-element/demo/
