import { ScrollShadowElement } from './ScrollShadowElement'
import './global.d.ts'

export { ScrollShadowElement }

if ('customElements' in window && 'ResizeObserver' in window) {
  customElements.define('scroll-shadow', ScrollShadowElement)
}

