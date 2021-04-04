import { render } from './utils'
import { visualDiff } from '@web/test-runner-visual-regression'
import { html, fixture, expect, elementUpdated } from '@open-wc/testing'

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

  it('should be possible to use a child element, like tbody', async () => {
    const el = await fixture(
      html`
        <scroll-shadow el="tbody">
          <table>
            <thead style="display:block">
              <tr>
                <th style="width:10vw">User ID</th>
                <th style="width:10vw">Full name</th>
              </tr>
            </thead>
            <tbody style="display:block;height:70px;overflow-x:auto">
              <tr>
                <td style="width:10vw">1</td>
                <td style="width:10vw">John Doe</td>
              </tr>
              <tr>
                <td style="width:10vw">2</td>
                <td style="width:10vw">Jane Doe</td>
              </tr>
              <tr>
                <td style="width:10vw">3</td>
                <td style="width:10vw">Carl Example</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="width:20vw">Only tbody will have scroll shadows.</td>
              </tr>
            </tfoot>
          </table>
        </scroll-shadow>
      `
    )

    el.querySelector('tbody').scrollTop = 10
    await visualDiff(el, 'tbody')
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
