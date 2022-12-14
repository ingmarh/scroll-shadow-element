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
	<slot></slot>
	<s></s>
`

const updaters = new WeakMap()

export class ScrollShadowElement extends HTMLElement {
	constructor() {
		super()
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.innerHTML = template
		shadowRoot.addEventListener('slotchange', () => this._on())
		updaters.set(this, new Updater(shadowRoot.lastElementChild as HTMLElement))
	}

	connectedCallback() {
		this._on()
	}

	disconnectedCallback() {
		updaters.get(this).off()
	}

	private _on() {
		updaters.get(this).on(this.firstElementChild)
	}
}

class Updater {
	private update: () => void
	private rO: ResizeObserver
	private mO: MutationObserver
	private el: HTMLElement | null

	constructor(targetElement: HTMLElement) {
		this.update = () => update(this.el, targetElement)
		this.rO = new ResizeObserver(this.update)
		this.mO = new MutationObserver(() => this.on(this.el))
	}

	on(element: HTMLElement | null) {
		if (this.el) this.off()
		if (!element) return
		if (element.nodeName === 'TABLE') {
			this.rO.observe(element)
			element = element.querySelector('tbody')
		}
		element.addEventListener('scroll', this.update)
		;[element, ...element.children].forEach(el => this.rO.observe(el))
		this.mO.observe(element, { childList: true })
		this.el = element
	}

	off() {
		this.el.removeEventListener('scroll', this.update)
		this.mO.disconnect()
		this.rO.disconnect()
		this.el = null
	}
}

function update(element: HTMLElement | null, targetElement: HTMLElement) {
	if (!element) return

	let cssText = `
		--t: ${element.scrollTop}px;
		--b: ${element.scrollHeight - element.offsetHeight - element.scrollTop}px;
		--l: ${element.scrollLeft}px;
		--r: ${element.scrollWidth - element.offsetWidth - element.scrollLeft}px;
	`

	if (element.nodeName === 'TBODY') {
		const clientRect = element.getBoundingClientRect()
		const rootClientRect = element.parentElement.getBoundingClientRect()

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
