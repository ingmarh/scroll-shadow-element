import { ScrollShadowElement } from './ScrollShadowElement'

declare global {
  interface HTMLElementTagNameMap {
    'scroll-shadow': ScrollShadowElement
  }

  namespace JSX {
    interface IntrinsicElements {
      'scroll-shadow': {
        el?: string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        [prop: string]: any
      }
    }
  }
}