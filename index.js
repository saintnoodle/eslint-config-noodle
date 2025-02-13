// @ts-check

import eslint from "@eslint/js"
import pluginStylistic from "@stylistic/eslint-plugin"
import configPrettier from "eslint-config-prettier"
// @ts-expect-error cjs module
import pluginImport from "eslint-plugin-import"
import pluginJsxA11y from "eslint-plugin-jsx-a11y"
import pluginPerfectionist from "eslint-plugin-perfectionist"
import pluginReact from "eslint-plugin-react"
import pluginReactHooks from "eslint-plugin-react-hooks"
import pluginReactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

/** @typedef ConfigProps
	@prop import {boolean=}
	@prop perfectionist {boolean | "alphabetical" | "line-length" | "natural"=}
	@prop prettier {boolean=}
	@prop react {Partial<{ refresh: boolean | "vite", version: `${number}` | "detect" }> | boolean=}
	@prop typescript {Partial<{ typeChecked: "only" | boolean, strict: boolean; }> | boolean=}
	@prop stylistic {boolean | Omit<import("@stylistic/eslint-plugin").StylisticCustomizeOptions, "flat">}
*/

/**
 * # eslint-config-noodle
 * A function that generates an opinionated and customisable flat config array
 * @param {ConfigProps} props
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
