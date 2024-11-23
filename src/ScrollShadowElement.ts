const template = `
	<slot></slot>
	<s></s>
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
			--m: var(--scroll-shadow-size, 14) * 1px;
			background:
				var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, #0003, #0000)) top /
					100% min(var(--t), var(--m)),
				var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, #0003, #0000)) bottom /
					100% min(var(--b), var(--m)),
				var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, #0003, #0000)) left /
					min(var(--l), var(--m)) 100%,
				var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, #0003, #0000)) right /
					min(var(--r), var(--m)) 100%;
			background-repeat: no-repeat;
		}
	</style>
`

const updaters = new WeakMap<ScrollShadowElement, Updater>()

export class ScrollShadowElement extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
		this.shadowRoot!.innerHTML = template
		this.shadowRoot!.addEventListener('slotchange', () => this.connectedCallback())
		updaters.set(this, new Updater(<HTMLElement>this.shadowRoot!.children[1]))
	}

	connectedCallback() {
		updaters.get(this)!.on(<HTMLElement>this.children[0])
	}

	disconnectedCallback() {
		updaters.get(this)!.on()
	}
}

class Updater {
	private cb: () => void
	private rO: ResizeObserver
	private mO: MutationObserver
	private el!: HTMLElement

	constructor(targetElement: HTMLElement) {
		this.cb = () => this.update(targetElement)
		this.rO = new ResizeObserver(this.cb)
		this.mO = new MutationObserver(() => this.on(this.el))
	}

	on(element?: HTMLElement) {
		if (this.el) {
			this.el.removeEventListener('scroll', this.cb)
			this.rO.disconnect()
			this.mO.disconnect()
		}

		if (element) {
			if (
				element.nodeName === 'TABLE' &&
				!/scroll|auto/.test(getComputedStyle(element).getPropertyValue('overflow'))
			) {
				this.rO.observe(element)
				element = (<HTMLTableElement>element).tBodies[0]!
			}
			element.addEventListener('scroll', this.cb)
			;[element, ...element.children].forEach(el => this.rO.observe(el))
			this.mO.observe(element, { childList: true })
			this.el = element
		}
	}

	update(targetElement: HTMLElement) {
		let cssText = `
			--t: ${this.el.scrollTop}px;
			--b: ${this.el.scrollHeight - this.el.offsetHeight - this.el.scrollTop}px;
			--l: ${this.el.scrollLeft}px;
			--r: ${this.el.scrollWidth - this.el.offsetWidth - this.el.scrollLeft}px;
		`

		if (this.el.nodeName === 'TBODY') {
			const clientRect = this.el.getBoundingClientRect()
			const rootClientRect = (<HTMLTableElement>this.el.parentElement).getBoundingClientRect()

			cssText += `
				top: ${clientRect.top - rootClientRect.top}px;
				bottom: ${rootClientRect.bottom - clientRect.bottom}px;
				left: ${clientRect.left - rootClientRect.left}px;
				right: ${rootClientRect.right - clientRect.right}px;
			`
		}

		requestAnimationFrame(() => {
			targetElement.style.cssText = cssText
		})
	}
}
