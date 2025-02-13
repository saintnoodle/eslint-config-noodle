import type { StylisticCustomizeOptions } from "@stylistic/eslint-plugin";
import type { FlatConfig } from "@typescript-eslint/utils/ts-eslint";

/**
 * # eslint-config-noodle
 * Generates an opinionated and customisable eslint flat-config array
 */
export default function generateConfig({ import: optionImport, perfectionist, prettier, react, stylistic, typescript }: Options): FlatConfig.ConfigArray;
export interface Options {
    /**
     * @default
	 * true
     */
    import?: boolean;
    /**
     * @default
	 * true
     */
    perfectionist?: boolean | "alphabetical" | "line-length" | "natural";
    /**
     * The default of this config is to use stylistic.
     * However, the prettier plugin can be enabled if it is preferred over using ESLint as a formatter.
     *
     * @default
	 * false
     */
    prettier?: boolean;
    /**
     * @default
	 * false
     */
    react?: boolean | ReactOptions;
    /**
     * @default 
	 * true
     */
    stylistic?: boolean | FlatStylisticCustomizeOptions;
    /**
     * It is expected that this config will be used in Typescript projects,
     * however typescript plugins can be disabled if the project is Javascript
     *
     * @default
	 * true
     */
    typescript?: boolean | TypescriptOptions;
}
export interface ReactOptions { refresh?: boolean | "vite"; version?: number | "detect"; }
export interface TypescriptOptions { typeChecked: "only" | boolean; strict: boolean; }
export type FlatStylisticCustomizeOptions = Omit<StylisticCustomizeOptions<true>, "flat">;
