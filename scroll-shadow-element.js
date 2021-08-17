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
const positions = ['top', 'bottom', 'left', 'right']

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
    this.scheduleUpdate = throttle(() => this.update(targetElement, getComputedStyle(targetElement)))
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleUpdate()
      if (this.rootElement) this.updateInset(targetElement)
    })
  }

  start(element, rootElement) {
    if (this.element) this.stop()
    if (element) {
      element.addEventListener('scroll', this.scheduleUpdate)
      this.resizeObserver.observe(element)
      this.element = element
    }
    if (rootElement) {
      this.resizeObserver.observe(rootElement)
      this.rootElement = rootElement
    }
  }

  stop() {
    if (!this.element) return
    this.element.removeEventListener('scroll', this.scheduleUpdate)
    this.resizeObserver.unobserve(this.element)
    this.element = null
    if (this.rootElement) {
      this.resizeObserver.unobserve(this.rootElement)
      this.rootElement = null
    }
  }

  update(targetElement, style) {
    if (!this.element) return

    const el = this.element
    const maxSize = Number(style.getPropertyValue('--scroll-shadow-size')) || 14
    const sizes = {
      top: Math.min(el.scrollTop, maxSize),
      bottom: Math.min(Math.max(el.scrollHeight - el.offsetHeight - el.scrollTop, 0), maxSize),
      left: Math.min(el.scrollLeft, maxSize),
      right: Math.min(Math.max(el.scrollWidth - el.offsetWidth - el.scrollLeft, 0), maxSize),
    }

    for (const position of positions) {
      targetElement.style.setProperty(`--${position}`, `${sizes[position]}px`)
    }
  }

  updateInset(targetElement) {
    const clientRect = this.element.getBoundingClientRect()
    const rootClientRect = this.rootElement.getBoundingClientRect()
    const inset = {
      top: Math.max(0, clientRect.top - rootClientRect.top),
      bottom: Math.max(0, rootClientRect.bottom - clientRect.bottom),
      left: Math.max(0, clientRect.left - rootClientRect.left),
      right: Math.max(0, rootClientRect.right - clientRect.right),
    }

    for (const position of positions) {
      targetElement.style.setProperty(position, `${inset[position]}px`)
    }
  }
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
