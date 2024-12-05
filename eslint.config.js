import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

export default tseslint.config(
	{ ignores: ['dist'] },
	js.configs.recommended,
	tseslint.configs.recommended,
	stylistic.configs['recommended-flat'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.mocha,
			},
		},
		rules: {
			'@stylistic/indent': ['error', 'tab'],
			'@stylistic/no-tabs': 'off',
			'@stylistic/operator-linebreak': 'off',
			'@stylistic/keyword-spacing': ['error', {
				overrides: {
					this: { before: false },
				},
			}],
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-namespace': ['error', {
				allowDeclarations: true,
			}],
		},
	},
)
