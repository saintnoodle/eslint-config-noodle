// @ts-check

import eslint from "@eslint/js"
import pluginStylistic from "@stylistic/eslint-plugin"
import configPrettier from "eslint-config-prettier"
import globals from "globals"
// @ts-expect-error cjs module
import pluginImport from "eslint-plugin-import"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"
import pluginPerfectionist from "eslint-plugin-perfectionist"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginReactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"

/** @typedef Options
 * @prop [import] {boolean} default: true
 * @prop [perfectionist] {boolean | "alphabetical" | "line-length" | "natural"} default: true
 * @prop [prettier] {boolean}
 * The default of this config is to use stylistic.
 * However, the prettier plugin can be enabled if it is preferred over using ESLint as a formatter.
 *
 * default: false
 * @prop [react] {Partial<{ refresh: boolean | "vite", version: `${number}` | "detect" }> | boolean} default: false
 * @prop [stylistic] {boolean | Omit<import("@stylistic/eslint-plugin").StylisticCustomizeOptions, "flat">} default: true
 * @prop [typescript] {Partial<{ typeChecked: "only" | boolean, strict: boolean; }> | boolean}
 * It is expected that this config will be used in Typescript projects,
 * however typescript plugins can be disabled if the project is Javascript
 *
 * default: true
 */

/**
 * # eslint-config-noodle
 * Generates an opinionated and customisable eslint flat-config array
 * @param {Options} options
 * @returns {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray}
 */
export default function generateConfig({
	import: optionImport = true,
	perfectionist: optionPerfectionist = true,
	prettier: optionPrettier = false,
	react: optionReact = false,
	stylistic: optionStylistic = true,
	typescript: optionTypescript = true,
}) {
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
	let eslintImport = []
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config} */
	let eslintPerfectionist = {}
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config} */
	let eslintPrettier = {}
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
	let eslintReact = []
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray} */
	let eslintTs = []
	/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config} */
	let eslintStylistic = {}

	if (optionImport) {
		if (optionReact) {
			eslintImport.push(pluginImport.flatConfigs.react)
		}
		if (optionTypescript) {
			eslintImport.push(pluginImport.flatConfigs.typescript)
		}
		eslintImport.push(pluginImport.flatConfigs.recommended)
	}

	if (optionPrettier) {
		eslintPrettier = {
			rules: configPrettier.rules,
		}
	}

	if (optionReact) {
		/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config["rules"]} */
		const reactRefreshRules = typeof optionReact === "object" && optionReact.refresh
			? pluginReactRefresh.configs[optionReact.refresh === "vite" ? "vite" : "recommended"].rules
			: {}

		/** @type {import("@typescript-eslint/utils/ts-eslint").FlatConfig.Config} */
		const reactConfig = {
			files: ["**/*.{t,j}sx"],
			languageOptions: {
				parserOptions: {
					globals: {
						...globals.browser,
					},
				},
			},
			name: "noodle/react",
			plugins: {
				// @ts-expect-error not sure what you're talking about
				"react-hooks": pluginReactHooks,
				"react-refresh": pluginReactRefresh,
			},
			rules: {
				"react-hooks/exhaustive-deps": "warn",
				"react-hooks/rules-of-hooks": "error",
				...reactRefreshRules,
			},
			settings: {
				react: {
					version: typeof optionReact === "object" && optionReact.version ? optionReact.version : "detect",
				},
			},
		}

		eslintReact.push(pluginReact.configs.flat["recommended"], reactConfig, pluginJsxA11y.flatConfigs.recommended)
	}

	if (optionPerfectionist === true) {
		eslintPerfectionist = pluginPerfectionist.configs["recommended-natural"]
	} else if (optionPerfectionist) {
		eslintPerfectionist = pluginPerfectionist.configs[`recommended-${optionPerfectionist}`]
	}

	if (optionTypescript) {
		if (typeof optionTypescript === "object") {
			const { strict, typeChecked } = optionTypescript
			switch (typeChecked) {
				case "only":
					eslintTs.push(...tseslint.configs[strict ? "strictTypeCheckedOnly" : "recommendedTypeCheckedOnly"])
					break
				case true:
					eslintTs.push(...tseslint.configs[strict ? "strictTypeChecked" : "recommendedTypeChecked"])
					break
				default:
					eslintTs.push(...tseslint.configs[strict ? "strict" : "recommended"])
			}
		} else {
			eslintTs.push(...tseslint.configs.recommended)
		}
	}

	if (optionStylistic) {
		eslintStylistic = pluginStylistic.configs.customize({
			flat: true,
			...(typeof optionStylistic === "object"
				? optionStylistic
				: {
						arrowParens: true,
						blockSpacing: true,
						braceStyle: "1tbs",
						commaDangle: "always-multiline",
						indent: "tab",
						jsx: optionReact ? true : false,
						quoteProps: "as-needed",
						quotes: "double",
						semi: false,
					}),
		})
	}

	return tseslint.config(
		eslint.configs.recommended,
		...eslintTs,
		...eslintReact,
		eslintPerfectionist,
		eslintStylistic,
		eslintPrettier,
	)
}
