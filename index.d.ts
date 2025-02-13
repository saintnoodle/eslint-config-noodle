/** @typedef Options
 * @prop [import] {boolean} default: true
 * @prop [perfectionist] {boolean | "alphabetical" | "line-length" | "natural"} default: true
 * @prop [prettier] {boolean}
 * The default of this config is to use stylistic.
 * However, the prettier plugin can be enabled if it is preferred over using ESLint as a formatter.
 *
 * default: false
 * @prop [react] {Partial<{ refresh: boolean | "vite", version: number | "detect" }> | boolean} default: false
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
export default function generateConfig({ import: optionImport, perfectionist: optionPerfectionist, prettier: optionPrettier, react: optionReact, stylistic: optionStylistic, typescript: optionTypescript, }: Options): import("@typescript-eslint/utils/ts-eslint").FlatConfig.ConfigArray;
export type Options = {
    /**
     * default: true
     */
    import?: boolean | undefined;
    /**
     * default: true
     */
    perfectionist?: boolean | "alphabetical" | "line-length" | "natural" | undefined;
    /**
     * The default of this config is to use stylistic.
     * However, the prettier plugin can be enabled if it is preferred over using ESLint as a formatter.
     *
     * default: false
     */
    prettier?: boolean | undefined;
    /**
     * default: false
     */
    react?: boolean | Partial<{
        refresh: boolean | "vite";
        version: number | "detect";
    }> | undefined;
    /**
     * default: true
     */
    stylistic?: boolean | Omit<import("@stylistic/eslint-plugin").StylisticCustomizeOptions<true>, "flat"> | undefined;
    /**
     * It is expected that this config will be used in Typescript projects,
     * however typescript plugins can be disabled if the project is Javascript
     *
     * default: true
     */
    typescript?: boolean | Partial<{
        typeChecked: "only" | boolean;
        strict: boolean;
    }> | undefined;
};
