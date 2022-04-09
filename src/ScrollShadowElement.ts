import { Updater } from './Updater'

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

    this.attachShadow({ mode: 'open' }).innerHTML = `
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
            var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) top/100% var(--top),
            var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) bottom/100% var(--bottom),
            var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, rgba(0,0,0,.2), rgba(0,0,0,0))) left/var(--left) 100%,
            var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, rgba(0,0,0,.2), rgba(0,0,0,0))) right/var(--right) 100%;
          background-repeat: no-repeat;
        }
      </style>
      <slot></slot>
      <s></s>
    `

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
    const el = this.scrollEl || this.firstElementChild
    updaters.get(this).start(el, this.scrollEl ? this.firstElementChild : null)
  }
}

