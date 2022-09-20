# &lt;scroll-shadow&gt; element

[![npm version][npm-version-badge-src]][npm-package-href]
[![bundle size (minified and gzipped)][bundlesize-badge-src]][bundlesize-href]

> Extends a scrollable element with a scroll shadow effect.

A small web component, adding dynamic scroll indicators even when scroll bars
aren’t displayed.

🔎 [See the demo][demo-href]

## Installation

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

## Usage

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
> When used with a `<table>` element, then the scroll indicators will be added to the first `<tbody>`.

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

`scroll-shadow-element` works in all browsers that support [Custom
Elements][custom-elementsv1] and [Resize Observer][resizeobserver]. That is:
all major browsers are supported. In older browsers, the element just won’t add
scroll indicators.

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

```
# Install dependencies
npm install

# Open demo page for manual testing
npm start

# Create visual regression test baseline images for development
npm test -- --update-visual-baseline

# Run tests
npm test

# Run linting checks/fix linting issues
npm run lint
npm run lint:fix

# Build
npm run build
```

## License

Distributed under the terms of the MIT license. See [LICENSE](LICENSE) for details.

[custom-elementsv1]: https://caniuse.com/custom-elementsv1
[resizeobserver]: https://caniuse.com/resizeobserver
[pure-css-alternative]: https://lea.verou.me/2012/04/background-attachment-local/
[jest-esm]: https://jestjs.io/docs/ecmascript-modules
[jest-modulenamemapper]: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
[jest-transform-stub]: https://www.npmjs.com/package/jest-transform-stub
[npm-version-badge-src]: https://img.shields.io/npm/v/scroll-shadow-element?style=flat-square
[bundlesize-badge-src]: https://img.shields.io/bundlephobia/minzip/scroll-shadow-element?color=a8da93&style=flat-square
[npm-package-href]: https://npmjs.com/package/scroll-shadow-element
[bundlesize-href]: https://bundlephobia.com/package/scroll-shadow-element
[demo-href]: https://ingmarh.github.io/scroll-shadow-element/demo/
