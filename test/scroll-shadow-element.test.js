import { render, renderTable } from './utils'
import { visualDiff } from '@web/test-runner-visual-regression'
import { fixture, expect, elementUpdated } from '@open-wc/testing'

import '../src/index'

describe('scroll shadow element', () => {
  it('should display vertical scroll shadows', async () => {
    const { rootEl, el } = await render()

    await visualDiff(rootEl, 'shadow-top0-bottom14')

    el.scrollTop = 4
    await visualDiff(rootEl, 'shadow-top4-bottom14')

    el.scrollTop = 200
    await visualDiff(rootEl, 'shadow-top14-bottom14')

    el.scrollTop = el.scrollHeight - el.offsetHeight - 8
    await visualDiff(rootEl, 'shadow-top14-bottom8')

    el.scrollTop = el.scrollHeight - el.offsetHeight
    await visualDiff(rootEl, 'shadow-top14-bottom0')
  })

  it('should display horizontal scroll shadows', async () => {
    const { rootEl, el } = await render({ horizontal: true })

    await visualDiff(rootEl, 'shadow-left0-right14')

    el.scrollLeft = 4
    await visualDiff(rootEl, 'shadow-left4-right14')

    el.scrollLeft = 200
    await visualDiff(rootEl, 'shadow-left14-right14')

    el.scrollLeft = el.scrollWidth - el.offsetWidth - 8
    await visualDiff(rootEl, 'shadow-left14-right8')

    el.scrollLeft = el.scrollWidth - el.offsetWidth
    await visualDiff(rootEl, 'shadow-left14-right0')
  })

  it('should be possible to use a different size', async () => {
    const { rootEl, el } = await render({ size: 20 })

    await visualDiff(rootEl, 'shadow-top0-bottom20')

    el.scrollTop = 200
    await visualDiff(rootEl, 'shadow-top20-bottom20')
  })

  it('should be possible to use a child element, like tbody', async () => {
    const { rootEl, el } = await renderTable({ el: 'tbody' })

    el.scrollTop = 10
    await visualDiff(rootEl, 'tbody')
  })

  // TODO
  it('should update when scroll width/height changed caused by child node change only')

  it('should be possible to use a child element with overflowing container', async () => {
    const { rootEl, el } = await renderTable({ el: 'tbody', overflowingContainer: true })

    el.scrollTop = 10
    await visualDiff(rootEl, 'tbody-overflow')
  })

  it('should be possible to set the el attribute', async () => {
    const el = await fixture('<scroll-shadow><p>Content</p></scroll-shadow>')
    expect(el.el).to.equal(null)

    el.el = 'tbody'
    await elementUpdated(el)
    expect(el.el).to.equal('tbody')
    expect(el).dom.to.equal('<scroll-shadow el="tbody"><p>Content</p></scroll-shadow>')
  })
})
