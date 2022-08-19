const template = `
  <style>
    :host {
      display: inline-block;
      position: relative;
    }

    :host([hidden]) {
      display: none;
    }

    s {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      pointer-events: none;
      background:
        var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, #0003, #0000)) top / 100% var(--top),
        var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, #0003, #0000)) bottom / 100% var(--bottom),
        var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, #0003, #0000)) left / var(--left) 100%,
        var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, #0003, #0000)) right / var(--right) 100%;
      background-repeat: no-repeat;
    }
  </style>

  <slot></slot>
  <s></s>
`

const updaters = new WeakMap()

export class ScrollShadowElement extends HTMLElement {
  private scrollEl?: HTMLElement

  static get observedAttributes() {
    return ['el']
  }

  get el() {
    return this.getAttribute('el')
  }

  set el(value) {
    this.setAttribute('el', value)
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' }).innerHTML = template
    updaters.set(this, new Updater(this.shadowRoot.lastElementChild))
  }

  connectedCallback() {
    this.shadowRoot.querySelector('slot').addEventListener('slotchange', () => this.start())
    this.start()
  }

  disconnectedCallback() {
    updaters.get(this).stop()
  }

  attributeChangedCallback(_name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.scrollEl = newValue ? this.querySelector(newValue) : null
      this.start()
    }
  }

  private start() {
    updaters.get(this).start(
      this.scrollEl || this.firstElementChild,
      this.scrollEl ? this.firstElementChild : null,
    )
  }
}

class Updater {
  private handleScroll: () => void
  private rO: ResizeObserver
  private mO: MutationObserver
  private el?: HTMLElement
  private rootEl?: HTMLElement

  constructor(targetElement: Element) {
    const update = this.update.bind(this, targetElement, getComputedStyle(targetElement))

    this.handleScroll = throttle(update)
    this.rO = new ResizeObserver(update)
    this.mO = new MutationObserver(() => this.start(this.el, this.rootEl))
  }

  start(element?: HTMLElement, rootElement?: HTMLElement) {
    if (this.el) this.stop()

    if (element) {
      element.addEventListener('scroll', this.handleScroll)
      ;[element, ...element.children].forEach(el => this.rO.observe(el))
      this.mO.observe(element, { childList: true })
      this.el = element
    }

    if (rootElement) {
      this.rO.observe(rootElement)
      this.rootEl = rootElement
    }
  }

  stop() {
    this.el.removeEventListener('scroll', this.handleScroll)
    this.mO.disconnect()
    this.rO.disconnect()
    this.el = this.rootEl = null
  }

  update(targetElement: HTMLElement, computedStyle: CSSStyleDeclaration) {
    const { el, rootEl } = this
    if (!el) return

    const maxSize = Number(computedStyle.getPropertyValue('--scroll-shadow-size')) || 14
    const style = {
      '--top': clamp(el.scrollTop, 0, maxSize),
      '--bottom': clamp(el.scrollHeight - el.offsetHeight - el.scrollTop, 0, maxSize),
      '--left': clamp(el.scrollLeft, 0, maxSize),
      '--right': clamp(el.scrollWidth - el.offsetWidth - el.scrollLeft, 0, maxSize),
    }

    if (rootEl) {
      const clientRect = el.getBoundingClientRect()
      const rootClientRect = rootEl.getBoundingClientRect()

      Object.assign(style, {
        top: clamp(clientRect.top - rootClientRect.top),
        bottom: clamp(rootClientRect.bottom - clientRect.bottom),
        left: clamp(clientRect.left - rootClientRect.left),
        right: clamp(rootClientRect.right - clientRect.right),
      })
    }

    for (const key in style) {
      targetElement.style.setProperty(key, `${style[key]}px`)
    }
  }
}

function clamp(num: number, min = 0, max?: number) {
  if (num < min) return min
  if (num > max) return max
  return num
}

function throttle(callback: () => void) {
  let id = null
  return () => {
    if (id) return
    id = requestAnimationFrame(() => {
      callback()
      id = null
    })
  }
}

