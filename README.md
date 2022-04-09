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

Or directly load from a CDN, e.g.: `https://unpkg.com/scroll-shadow-element`

## Usage

### Import

Import the module, or load it with a script tag.

```js
import 'scroll-shadow-element'
```

```html
<script type="module" src="./node_modules/scroll-shadow-element/scroll-shadow-element.js"></script>
```

### Use

Use `<scroll-shadow>` on any element. It will dynamically add scroll
shadows when scrollable. For example:

```html
<scroll-shadow>
  <nav>Long navigation…</nav>
</scroll-shadow>
```

If you can’t directly wrap your element, you can target a child element with a
CSS selector using the `el` attribute. This is only recommended for `<tbody>`
in a `<table>`, where only specific elements are permitted as a direct child.

<details><summary>Example usage for table body</summary>

```html
<scroll-shadow el="tbody">
  <table>
    <thead>
      <tr>
        <th>User ID</th>
        <th>Full name</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>John Doe</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Jane Doe</td>
      </tr>
      <tr>
        <td>3</td>
        <td>Carl Example</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="2">Only tbody will have scroll shadows.</td>
      </tr>
    </tfoot>
  </table>
</scroll-shadow>
```

</details>



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

Support for these features is checked before defining the custom element in the
browser.

`<scroll-shadow>` is written with ES6 syntax. If you need to support older
browsers, you can configure your bundler to compile the package to ES5 syntax.

## Using with Jest

Depending on your configuration, you might see `SyntaxError: Unexpected token
'export'` when using Jest. This is because [Jest doesn’t fully support ES
modules][jest-esm]. There are a few hints in the Jest error output. One of them
is to use ["moduleNameMapper"][jest-modulenamemapper].

To stub the module out (probably not relevant for your tests) with
"moduleNameMapper", you can use any empty module, or
[`jest-transform-stub`][jest-transform-stub]:

```json
{
  "jest": {
    "moduleNameMapper": {
      "^scroll-shadow-element$": "jest-transform-stub"
    }
  }
}
```

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
```

## License

Distributed under the terms of the MIT license. See [LICENSE](LICENSE) for details.

[custom-elementsv1]: https://caniuse.com/custom-elementsv1
[resizeobserver]: https://caniuse.com/resizeobserver
[pure-css-alternative]: https://lea.verou.me/2012/04/background-attachment-local/
[jest-esm]: https://jestjs.io/docs/ecmascript-modules
[jest-modulenamemapper]: https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
[jest-transform-stub]: https://www.npmjs.com/package/jest-transform-stub
