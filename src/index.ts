import { ScrollShadowElement } from './ScrollShadowElement.js'

type IntrinsicBase = JSX.IntrinsicElements extends { span: infer SpanElement }
	? SpanElement
	: Record<string, unknown>

declare global {
	interface HTMLElementTagNameMap {
		'scroll-shadow': ScrollShadowElement
	}

	namespace JSX {
		interface IntrinsicElements {
			'scroll-shadow': IntrinsicBase & { class?: string }
		}
	}
}

export { ScrollShadowElement }

if ('customElements' in window && 'ResizeObserver' in window) {
	customElements.define('scroll-shadow', ScrollShadowElement)
}
