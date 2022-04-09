export class Updater {
  private handleScroll: () => void
  private resizeObserver: ResizeObserver
  private el?: HTMLElement
  private rootEl?: HTMLElement

  constructor(targetElement: Element) {
    const update = this.update.bind(this, targetElement, getComputedStyle(targetElement))

    this.handleScroll = throttle(update)
    this.resizeObserver = new ResizeObserver(update)
  }

  start(element?: HTMLElement, rootElement?: HTMLElement) {
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

  update(targetElement: HTMLElement, computedStyle: CSSStyleDeclaration) {
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

