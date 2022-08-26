import { render } from './utils'
import { visualDiff } from '@web/test-runner-visual-regression'
import { html, fixture } from '@open-wc/testing'

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

	it('should work with the first tbody element in a table', async () => {
		const rootEl = await fixture(
			html`
				<scroll-shadow>
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
								<td colspan="2" style="width:20vw">Only the first tbody will have scroll shadows.</td>
							</tr>
						</tfoot>
					</table>
				</scroll-shadow>
			`
		)

		const el = rootEl.querySelector('tbody')

		el.scrollTop = 10
		await visualDiff(rootEl, 'tbody')
	})

	// TODO
	it('should update when scroll width/height changed caused by child node change only')
})
