import { html, fixture } from '@open-wc/testing'

export async function render(options = { horizontal: false, size: null }) {
	const rootEl = await fixture(
		html`
			<scroll-shadow style="
				--scroll-shadow-top: radial-gradient(farthest-side at 50% 0%, yellow, #0000);
				--scroll-shadow-bottom: radial-gradient(farthest-side at 50% 100%, yellow, #0000);
				--scroll-shadow-left: radial-gradient(farthest-side at 0%, yellow, #0000);
				--scroll-shadow-right: radial-gradient(farthest-side at 100%, yellow, #0000);
				${options.size ? '--scroll-shadow-size:' + options.size : ''}
			">
				<div style="width:400px;height:400px;padding:2em;overflow:auto">
					<div style="width:${options.horizontal ? '800px' : 'auto'}">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
							commodo quam nisi, eget porta risus feugiat eget. Mauris sed
							consectetur justo. Ut ultrices pretium lobortis. Quisque rhoncus
							tincidunt blandit. Integer consectetur condimentum cursus.
							Phasellus massa dui, mattis nec pretium sodales, mattis non
							sapien. In iaculis augue nec vulputate placerat. Vestibulum nec
							viverra nunc.
						</p>
						<p>
							Curabitur dapibus in mi quis fermentum. Nam mauris nisi, porta nec
							sollicitudin quis, fermentum nec elit. Cras sit amet ligula nisl.
							Maecenas dictum mauris ullamcorper, dictum massa quis, ullamcorper
							nibh. Praesent molestie justo a magna porta, sed dapibus diam
							varius. Sed facilisis condimentum elit, eget blandit enim
							dignissim sed. Etiam bibendum lacinia metus aliquet mollis. Aenean
							aliquet ligula nec urna laoreet, eu efficitur orci pretium. Aenean
							consequat, sapien vitae finibus laoreet, eros metus cursus velit,
							non tincidunt elit lacus a neque. Nullam consectetur risus vel
							ipsum suscipit semper. Sed vitae sollicitudin metus. Class aptent
							taciti sociosqu ad litora torquent per conubia nostra, per
							inceptos himenaeos. Curabitur varius non ex ac eleifend.
							Pellentesque rhoncus placerat arcu, a ultricies mi.
						</p>
						<p>
							Ut ac porta est, at iaculis ante. Duis blandit et nunc et
							molestie. Vivamus in egestas elit. Mauris sed neque id massa
							luctus luctus et vitae purus. Curabitur eu lectus aliquam, dictum
							justo eu, egestas sem. Class aptent taciti sociosqu ad litora
							torquent per conubia nostra, per inceptos himenaeos. Donec eu
							tincidunt nunc. Pellentesque habitant morbi tristique senectus et
							netus et malesuada fames ac turpis egestas. Phasellus augue neque,
							dictum id lacus nec, pharetra pretium velit. Class aptent taciti
							sociosqu ad litora torquent per conubia nostra, per inceptos
							himenaeos. Nullam suscipit orci vitae lacus tempor, a convallis
							metus consequat. Cras nec euismod risus.
						</p>
						<p>
							Integer in fermentum odio. Donec eget turpis est. Vivamus vel
							metus sit amet nulla imperdiet condimentum in sit amet dolor. Sed
							porttitor urna nibh, sit amet rhoncus felis pretium id. Interdum
							et malesuada fames ac ante ipsum primis in faucibus. Morbi viverra
							commodo pharetra. Integer sed leo egestas est molestie lacinia.
							Curabitur feugiat posuere lacus, a vehicula lectus rutrum at.
							Praesent aliquam ut augue in commodo. Phasellus semper pulvinar
							sapien vel euismod. Vivamus eros enim, interdum vitae pellentesque
							nec, volutpat sed enim. Nulla fermentum tincidunt convallis. Sed
							convallis libero non erat vulputate pretium.
						</p>
						<p>
							Integer tempus mi non metus pulvinar finibus. Proin interdum arcu
							ipsum, at ultricies eros finibus sit amet. In tincidunt, arcu sit
							amet ultrices imperdiet, neque sapien porta augue, nec ullamcorper
							ante tortor quis urna. Ut at nunc vitae neque pharetra dignissim
							sed id metus. Nulla a imperdiet eros, ac accumsan ante.
							Pellentesque ac pulvinar metus. Nullam accumsan dolor non ante
							pharetra ornare.
						</p>
					</div>
				</div>
			</scroll-shadow>
		`,
	)

	return { rootEl, el: rootEl.querySelector('div') }
}
