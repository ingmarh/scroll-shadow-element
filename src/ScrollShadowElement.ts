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
	constructor() {
		super()

		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.innerHTML = template
		shadowRoot.addEventListener('slotchange', () => {
			updaters.get(this).start(this.firstElementChild)
		})

		updaters.set(this, new Updater(shadowRoot.lastElementChild))
	}

	connectedCallback() {
		updaters.get(this).start(this.firstElementChild)
	}

	disconnectedCallback() {
		updaters.get(this).stop()
	}
}

class Updater {
	private handleScroll: () => void
	private rO: ResizeObserver
	private mO: MutationObserver
	private el?: HTMLElement

	constructor(targetElement: Element) {
		const update = this.update.bind(this, targetElement, getComputedStyle(targetElement))

		this.handleScroll = throttle(update)
		this.rO = new ResizeObserver(update)
		this.mO = new MutationObserver(() => this.start(this.el))
	}

	start(element: HTMLElement | null) {
		if (this.el) this.stop()
		if (!element) return

		if (element.nodeName === 'TABLE') {
			this.rO.observe(element)
			element = element.querySelector('tbody')
		}

		element.addEventListener('scroll', this.handleScroll)
		;[element, ...element.children].forEach(el => this.rO.observe(el))
		this.mO.observe(element, { childList: true })
		this.el = element
	}

	stop() {
		this.el.removeEventListener('scroll', this.handleScroll)
		this.mO.disconnect()
		this.rO.disconnect()
		this.el = null
	}

	update(targetElement: HTMLElement, computedStyle: CSSStyleDeclaration) {
		const { el } = this
		if (!el) return

		const maxSize = Number(computedStyle.getPropertyValue('--scroll-shadow-size')) || 14
		const clamp = (num: number) => num > maxSize ? maxSize : num < 0 ? 0 : num

		applyStyle(targetElement, {
			'--top': clamp(el.scrollTop),
			'--bottom': clamp(el.scrollHeight - el.offsetHeight - el.scrollTop),
			'--left': clamp(el.scrollLeft),
			'--right': clamp(el.scrollWidth - el.offsetWidth - el.scrollLeft),
		})

		if (el.nodeName === 'TBODY') {
			const clientRect = el.getBoundingClientRect()
			const rootClientRect = el.parentElement.getBoundingClientRect()

			applyStyle(targetElement, {
				top: clientRect.top - rootClientRect.top,
				bottom: rootClientRect.bottom - clientRect.bottom,
				left: clientRect.left - rootClientRect.left,
				right: rootClientRect.right - clientRect.right,
			})
		}
	}
}

function applyStyle(targetElement: HTMLElement, styles: Record<string, number>) {
	for (const key in styles) {
		targetElement.style.setProperty(key, `${styles[key]}px`)
	}
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
