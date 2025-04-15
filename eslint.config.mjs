import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname,
})

const eslintConfig = [
	...compat.config({
		extends: [
			'next/core-web-vitals',
			'next/typescript',
			'prettier',
			// 'plugin:@tanstack/eslint-plugin-query/recommended',
		],
		plugins: [/*'@tanstack/query',*/ 'simple-import-sort', 'prettier'],
		rules: {
			// Prettier
			'prettier/prettier': 'warn',
			// Import Sorts
			'simple-import-sort/imports': 'error',
			'simple-import-sort/exports': 'warn',
			// React Query
			// '@tanstack/query/exhaustive-deps': 'error',
			// '@tanstack/query/no-deprecated-options': 'error',
			// '@tanstack/query/prefer-query-object-syntax': 'error',
			// '@tanstack/query/stable-query-client': 'error',
			// TypeScript
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{
					argsIgnorePattern: '^_[^_].*$|^_$',
					varsIgnorePattern: '^_[^_].*$|^_$',
					caughtErrorsIgnorePattern: '^_[^_].*$|^_$',
				},
			],
		},
	}),
]

export default eslintConfig
