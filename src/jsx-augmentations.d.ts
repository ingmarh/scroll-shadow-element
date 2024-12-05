type Augmentation<T extends Record<string, any>, ExtraProps = {}> = {
	'scroll-shadow': T['span'] & ExtraProps
}

declare global {
	// React < 19
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements, { class?: string }> {}
	}
}

declare module 'react' {
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements> {}
	}
}

declare module 'react/jsx-runtime' {
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements> {}
	}
}

declare module 'preact' {
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements> {}
	}
}

declare module 'preact/jsx-runtime' {
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements> {}
	}
}

declare module 'solid-js' {
	namespace JSX {
		interface IntrinsicElements extends Augmentation<IntrinsicElements> {}
	}
}

export {}
