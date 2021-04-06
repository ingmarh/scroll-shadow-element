import { ScrollShadowElement } from './scroll-shadow-element'

declare global {
  interface HTMLElementTagNameMap {
    'scroll-shadow': ScrollShadowElement
  }

  namespace JSX {
    interface IntrinsicElements {
      'scroll-shadow': {
        el?: string
        [prop: string]: any
      }
    }
  }
}
