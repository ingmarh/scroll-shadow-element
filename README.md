# &lt;scroll-shadow&gt; element

> Extends a scrollable element with a scroll shadow effect.

A custom element adding dynamic scroll shadows to the contained element.
This indicates scrollable content even when scroll bars aren’t displayed
(e.g. on touch input devices), or are only shown when scrolling (macOS default).

[See the demo](https://ingmarh.github.io/scroll-shadow-element/demo/).

## Installation

```bash
# With npm:
npm install scroll-shadow-element

# With Yarn:
yarn add scroll-shadow-element
```

`<scroll-shadow>` is distributed as an ES module. Import the module, or load it
with a script tag:

```js
import 'scroll-shadow-element'
```

```html
<script type="module" src="./node_modules/scroll-shadow-element/scroll-shadow-element.js"></script>
```

You can also use a CDN, e.g. `https://unpkg.com/scroll-shadow-element`.

## Usage

Use `<scroll-shadow>` on any element. It will dynamically add scroll
shadows when scrollable. For example:

```html
<scroll-shadow>
  <nav>Long navigation…</nav>
</scroll-shadow>
```

## Configuration

Use CSS Custom Properties to change the appearance.

```css
/* Default configuration */
scroll-shadow {
  display: inline-block;
  --scroll-shadow-size: 14;
  --scroll-shadow-top: radial-gradient(farthest-side at 50% 0%, rgba(0,0,0,.2), rgba(0,0,0,0));
  --scroll-shadow-bottom: radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0));
  --scroll-shadow-left: radial-gradient(farthest-side at 0%, rgba(0,0,0,.2), rgba(0,0,0,0));
  --scroll-shadow-right: radial-gradient(farthest-side at 100%, rgba(0,0,0,.2), rgba(0,0,0,0));
}
```

## Browser support

`<scroll-shadow>` works in all browsers that support [Custom
Elements][custom-elementsv1] and [Resize Observer][resizeobserver].

It checks whether these features are supported in the browser before defining
the custom element.

`<scroll-shadow>` is written with ES6 syntax. If you need to support older
browsers, you can configure your bundler to compile the package to ES5 syntax.

## Pure CSS alternative

`<scroll-shadow>` is inspired by Lea Verou’s CSS `background-attachment: local`
technique: [Pure CSS scrolling shadows with background-attachment:
local][pure-css-alternative].

The pure CSS technique already works great. The main motivation to create a
custom element was to meet the requirements of having the shadows above the
element‘s content and not as part of the element‘s background.

## Development

```
# Install dependencies
npm install

# Open demo page for manual testing
npm start

# Create visual regression test baseline images for development
npm test -- --update-visual-baseline

# Run visual regression tests
npm test
```

## License

Distributed under the terms of the MIT license. See [LICENSE](LICENSE) for details.

[custom-elementsv1]: https://caniuse.com/custom-elementsv1
[resizeobserver]: https://caniuse.com/resizeobserver
[pure-css-alternative]: https://lea.verou.me/2012/04/background-attachment-local/
