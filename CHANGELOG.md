# Changelog

This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.2] (September 25, 2022)

### Optimized
- Improved setting the internal inline style declaration ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/a8d4125))
- Removed unnecessary code, and improved file size ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/a8d4125))

## [2.0.1] (September 23, 2022)

### Fixed
- Scroll indicators did not update after readding the element to the DOM ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/9a8de7f))
- The Custom Elements Manifest file included incorrect paths ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/a9b1d39))

### Optimized
- Simplified code for improved file size ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/1a5cb2b))

## [2.0.0] (September 21, 2022)

### Removed
- Removed "el" attribute in favor of auto-detecting tbody use case ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/3f04ce3))
- Removed legacy exports entry and file ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/84cfaab))

### Changed
- Changed the used file extension from .mjs to .js ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/992fc88))

## [1.1.6] (August 22, 2022)

### Fixed
- Scroll element inner size change only didn’t trigger update ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/1689195))

## [1.1.5] (April 14, 2022)

### Fixed
- Removed customElements entry point from export map ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/1605f0a))

## [1.1.4] (April 12, 2022)

### Added
- Custom Elements Manifest file ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/956af1b))

### Optimized
- Distribution build with minified HTML and CSS ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/82124eb))
- Shorthand hexadecimal notation for RGBA colors ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/29a10d2))
- Export map in package.json ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/3e57bad) and
  new [hint for using with Jest](https://github.com/ingmarh/scroll-shadow-element/tree/v1.1.4#using-with-jest))

## [1.1.3] (November 22, 2021)

### Fixed
- Remove use of CSS contain property ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/4c6142a))

### Optimized
- Save bytes when minified ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/3243c8c))

## [1.1.2] (September 15, 2021)

### Fixed
- Glitch when momentum scrolling in Safari ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/45f2808))

### Optimized
- Optimize for minified and compressed file size ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/7a16465))

## [1.1.1] (August 24, 2021)

### Fixed
- Incorrect child element shadow inset in case of overflowing container ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/e56b502))

## [1.1.0] (April 7, 2021)

### Added
- `el` attribute to enable `tbody` use case ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/6b424de))
- TypeScript definitions ([see commit](https://github.com/ingmarh/scroll-shadow-element/commit/871dfa8))

## [1.0.0] (March 24, 2021)

Initial release

[2.0.2]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v2.0.2
[2.0.1]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v2.0.1
[2.0.0]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v2.0.0
[1.1.6]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.6
[1.1.5]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.5
[1.1.4]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.4
[1.1.3]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.3
[1.1.2]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.2
[1.1.1]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.1
[1.1.0]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.1.0
[1.0.0]: https://github.com/ingmarh/scroll-shadow-element/releases/tag/v1.0.0
