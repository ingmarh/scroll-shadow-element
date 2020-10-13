import { render } from './utils'
import { visualDiff } from '@web/test-runner-visual-regression'

import '../scroll-shadow-element.js'

describe('scroll shadow element', () => {
  it('should display vertical scroll shadows', async () => {
    const { el, scrollEl } = await render()

    await visualDiff(el, 'shadow-top0-bottom14')

    scrollEl.scrollTop = 4
    await visualDiff(el, 'shadow-top4-bottom14')

    scrollEl.scrollTop = 200
    await visualDiff(el, 'shadow-top14-bottom14')

    scrollEl.scrollTop = scrollEl.scrollHeight - scrollEl.offsetHeight - 8
    await visualDiff(el, 'shadow-top14-bottom8')

    scrollEl.scrollTop = scrollEl.scrollHeight - scrollEl.offsetHeight
    await visualDiff(el, 'shadow-top14-bottom0')
  })

  it('should display horizontal scroll shadows', async () => {
    const { el, scrollEl } = await render({ horizontal: true })

    await visualDiff(el, 'shadow-left0-right14')

    scrollEl.scrollLeft = 4
    await visualDiff(el, 'shadow-left4-right14')

    scrollEl.scrollLeft = 200
    await visualDiff(el, 'shadow-left14-right14')

    scrollEl.scrollLeft = scrollEl.scrollWidth - scrollEl.offsetWidth - 8
    await visualDiff(el, 'shadow-left14-right8')

    scrollEl.scrollLeft = scrollEl.scrollWidth - scrollEl.offsetWidth
    await visualDiff(el, 'shadow-left14-right0')
  })

  it('should be possible to use a different size', async () => {
    const { el, scrollEl } = await render({ size: 20 })

    await visualDiff(el, 'shadow-top0-bottom20')

    scrollEl.scrollTop = 200
    await visualDiff(el, 'shadow-top20-bottom20')
  })
})
