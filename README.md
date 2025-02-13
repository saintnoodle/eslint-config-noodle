# eslint-config-noodle

An easy to use eslint config generator to help me setup faster. 

It configures the following plugins and configs:
- eslint defaults
- [Import](https://github.com/import-js/eslint-plugin-import/tree/main) (still likely requires additional configuration)
- [Perfectionist](https://perfectionist.dev/)
- [Prettier](https://github.com/prettier/eslint-plugin-prettier) (disabled by default)
- [React](https://github.com/jsx-eslint/eslint-plugin-react/tree/master) (disabled by default)
- [React Hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) (enabled alongside react plugin)
- [React Refresh](https://github.com/ArnaudBarre/eslint-plugin-react-refresh) (enabled alongside react plugin)
- [Stylistic](https://eslint.style/) use eslint as a formatter by default
- [Typescript Eslint](https://typescript-eslint.io/)

### Options

| Name         | Type                                                                 | Default  | Description |
|-------------|----------------------------------------------------------------------|----------|-------------|
| `import`    | `boolean`                                                            | `true`   | Enables base import plugin config. Could need additional configuration |
| `perfectionist` | `boolean \| "alphabetical" \| "line-length" \| "natural"`        | `true`   | Enables perfectionist. |
| `prettier`  | `boolean`                                                            | `false`  | Enables Prettier linting rules for use with Prettier as a formatter. |
| `react`     | `{ refresh?: boolean \| "vite", version?: number \| "detect" } \| boolean` | `false` | Enables React plugin config. |
| `stylistic` | boolean \| [StylisticCustomizeOptions](https://eslint.style/guide/config-presets#configuration-factory) | `true`   | Enables formatting rules. |
| `typescript` | `{ typeChecked?: "only" \| boolean, strict?: boolean; }> \| boolean` | `true`   | Enables Typescript rules. |

### Notes:
- By default, it is assume this will be used to lint Typescript projects, but Typescript linting can be disabled if used in a Javascript environment.
- If Prettier is preferred as a formatter, the prettier config can be enabled and stylistic disabled.
