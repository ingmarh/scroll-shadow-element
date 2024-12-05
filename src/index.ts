import { ScrollShadowElement } from './ScrollShadowElement.js'
import './jsx-augmentations.d.ts'

declare global {
	interface HTMLElementTagNameMap {
		'scroll-shadow': ScrollShadowElement
	}
}

if ('customElements' in window && 'ResizeObserver' in window) {
	customElements.define('scroll-shadow', ScrollShadowElement)
}

export { ScrollShadowElement }
