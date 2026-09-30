# Split Tailwind theme file

When `@theme` tokens grow beyond a screenful, move them to `src/tailwind-theme.css`:

```css
/* src/index.css */
@import "tailwindcss";
@import "./tailwind-theme.css";
```

```css
/* src/tailwind-theme.css */
@theme {
  --color-brand-navy: #0f172a;
  /* … */
}
```

Reference: [`caissak12-frontend/src/tailwind-theme.css`](../../../caissak12/caissak12-frontend/src/tailwind-theme.css).

Update Prettier `tailwindStylesheet` in `.prettierrc` to point at `src/index.css`.
