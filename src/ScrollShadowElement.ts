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
				var(--scroll-shadow-top, radial-gradient(farthest-side at 50% 0%, #0003, #0000)) top / 100% var(--t),
				var(--scroll-shadow-bottom, radial-gradient(farthest-side at 50% 100%, #0003, #0000)) bottom / 100% var(--b),
				var(--scroll-shadow-left, radial-gradient(farthest-side at 0%, #0003, #0000)) left / var(--l) 100%,
				var(--scroll-shadow-right, radial-gradient(farthest-side at 100%, #0003, #0000)) right / var(--r) 100%;
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
		shadowRoot.addEventListener('slotchange', () => this._start())
		updaters.set(this, new Updater(shadowRoot.lastElementChild as HTMLElement))
	}

	connectedCallback() {
		this._start()
	}

	disconnectedCallback() {
		updaters.get(this).stop()
	}

	private _start() {
		updaters.get(this).start(this.firstElementChild)
	}
}

class Updater {
	private update: () => void
	private rO: ResizeObserver
	private mO: MutationObserver
	private el: HTMLElement | null

	constructor(targetElement: HTMLElement) {
		const computedStyle = getComputedStyle(targetElement)
		this.update = () => update(this.el, targetElement, computedStyle)
		this.rO = new ResizeObserver(this.update)
		this.mO = new MutationObserver(() => this.start(this.el))
	}

	start(element: HTMLElement | null) {
		if (this.el) this.stop()
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

	stop() {
		this.el.removeEventListener('scroll', this.update)
		this.mO.disconnect()
		this.rO.disconnect()
		this.el = null
	}
}

function update(element: HTMLElement | null, targetElement: HTMLElement, computedStyle: CSSStyleDeclaration) {
	if (!element) return

	const maxSize = Number(computedStyle.getPropertyValue('--scroll-shadow-size')) || 14
	const clamp = (num: number) => num > maxSize ? maxSize : num < 0 ? 0 : num

	const style = [
		['--t', clamp(element.scrollTop)],
		['--b', clamp(element.scrollHeight - element.offsetHeight - element.scrollTop)],
		['--l', clamp(element.scrollLeft)],
		['--r', clamp(element.scrollWidth - element.offsetWidth - element.scrollLeft)],
	]

	if (element.nodeName === 'TBODY') {
		const clientRect = element.getBoundingClientRect()
		const rootClientRect = element.parentElement.getBoundingClientRect()

		style.push(
			['top', clientRect.top - rootClientRect.top],
			['bottom', rootClientRect.bottom - clientRect.bottom],
			['left', clientRect.left - rootClientRect.left],
			['right', rootClientRect.right - clientRect.right],
		)
	}

	const cssText = style.reduce((cssText, rule) => `${cssText}${rule[0]}:${rule[1]}px;`, '')

	requestAnimationFrame(() => {
		targetElement.style.cssText = cssText
	})
}
