# React Compiler (optional)

BPI enables the React Compiler via `@rolldown/plugin-babel` and `babel-plugin-react-compiler`. Measure build time before adopting.

1. Add devDependencies: `@babel/core`, `@rolldown/plugin-babel`, `babel-plugin-react-compiler`.
2. In `vite.config.ts`:

```ts
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";

plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] })];
```

See [BPI `vite.config.ts`](../../../bpi/bpi-frontend/vite.config.ts) as a reference implementation.
