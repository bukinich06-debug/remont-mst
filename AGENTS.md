# remont-mst

React + Next.js + Tailwind CSS landing page for appliance repair in Mstislavl.

## Development Server

```bash
pnpm install
pnpm dev
```

- Preview URL: http://localhost:3000
- Hot reload: Changes to source files are reflected immediately

## Project Structure

- `app/layout.tsx` — Root layout: fonts (`next/font`), metadata, global CSS
- `app/page.tsx` — Home page entry; renders the landing
- `app/globals.css` — Tailwind CSS v4 import and theme tokens
- `components/LandingPage.tsx` — Client landing UI (nav, form, sections)
- `next.config.ts` — Next.js config (remote images)
- `package.json` — Dependencies and scripts
- `.mise.toml` — Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: Next.js 15, React 19, React DOM 19
- Styling: Tailwind CSS v4 with `@tailwindcss/postcss`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through `@tailwindcss/postcss`. `app/globals.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX. Fonts are loaded via `next/font/google` (Nunito + Fraunces) and exposed as `--font-nunito` / `--font-fraunces`.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings.
- Ensure JSX tags are closed and braces are balanced.
- Export page/layout components as default exports.
