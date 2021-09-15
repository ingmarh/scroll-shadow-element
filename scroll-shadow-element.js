const template = `
  <style>
  :host {
    display: inline-block;
    contain: layout;
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
    background-image:
      var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, rgba(0,0,0,.2), rgba(0,0,0,0))),
      var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0))),
      var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, rgba(0,0,0,.2), rgba(0,0,0,0))),
      var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, rgba(0,0,0,.2), rgba(0,0,0,0)));
    background-position: top, bottom, left, right;
    background-repeat: no-repeat;
    background-size: 100% var(--top, 0), 100% var(--bottom, 0), var(--left, 0) 100%, var(--right, 0) 100%;
  }
  </style>
  <slot></slot>
  <s></s>
`

const updaters = new WeakMap()

export class ScrollShadowElement extends HTMLElement {
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

  attributeChangedCallback(_name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.scrollEl = newValue ? this.querySelector(newValue) : null
      this.start()
    }
  }

  start() {
    const el = this.scrollEl || this.firstElementChild
    updaters.get(this).start(el, this.scrollEl ? this.firstElementChild : null)
  }
}

class Updater {
  constructor(targetElement) {
    const update = this.update.bind(this, targetElement, getComputedStyle(targetElement))

    this.handleScroll = throttle(update)
    this.resizeObserver = new ResizeObserver(update)
  }

  start(element, rootElement) {
    if (this.el) this.stop()
    if (element) {
      element.addEventListener('scroll', this.handleScroll)
      this.resizeObserver.observe(element)
      this.el = element
    }
    if (rootElement) {
      this.resizeObserver.observe(rootElement)
      this.rootEl = rootElement
    }
  }

  stop() {
    if (!this.el) return
    this.el.removeEventListener('scroll', this.handleScroll)
    this.resizeObserver.disconnect()
    this.el = null
    this.rootEl = null
  }

  update(targetElement, computedStyle) {
    const { el, rootEl } = this
    if (!el) return

    const maxSize = Number(computedStyle.getPropertyValue('--scroll-shadow-size') || 14)
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

function clamp(num, min, max) {
  if (min === undefined) return num > 0 ? num : 0
  if (num < min) return min
  if (num > max) return max
  return num
}

function throttle(callback) {
  let id = null
  return () => {
    if (id) return
    id = requestAnimationFrame(() => {
      callback()
      id = null
    })
  }
}

if ('customElements' in window && 'ResizeObserver' in window) {
  customElements.define('scroll-shadow', ScrollShadowElement)
}
