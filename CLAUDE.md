# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Eleventy dev server with live reload at http://localhost:8080
- `npm run build` — production build into `_site/` (`NODE_ENV=production` turns on esbuild minification and turns off sourcemaps)

There is no test suite, linter, or formatter configured. Formatting follows `.editorconfig` (4-space indent, LF).

## Architecture

Eleventy 3 static site (ESM config in `eleventy.config.js`), input `src/`, output `_site/`. Templates are Nunjucks; `.md` and `.html` are also preprocessed with Nunjucks.

**Assets are built by esbuild, not by Eleventy.** An `eleventy.before` hook runs two esbuild builds before every Eleventy build:
- `src/assets/css/main.css` → `_site/main.css`, **bundled** (so `@import` of the `_*.css` partials is resolved).
- `src/assets/js/main.js` → `_site/main.js`, **not bundled** (ESM output). Imports inside `main.js` will not be resolved; keep it self-contained or switch `bundle` to `true`.

Only those two entry points are built. Other files in `src/assets/` (`kelp.css`/`kelp.js` — vendored KelpUI, `dark-mode-auto.js`, `test.js`/`utils.js` — esbuild smoke tests, `_components.css`, `_typography.css`) are not referenced by `main.css`/`main.js` and do not reach `_site/` unless wired in. The KelpUI files (`kelp.css`, `kelp.js`, `dark-mode-auto.js`) are kept intentionally for later use — don't delete them as dead code. Both outputs land at the site root, so templates reference them as `main.css` / `/main.js`.

`.avif` files are passthrough-copied as-is. Other `<img>` tags in rendered HTML go through `@11ty/eleventy-img`'s transform plugin (webp + jpeg, lazy/async attributes).

**Page behavior lives in client-side JS.** `src/index.njk` (layout `src/_includes/base.njk`) renders almost nothing; `src/assets/js/main.js` holds a hardcoded array of Cloudflare Images URLs, shuffles it, and prepends a `<figure>` with a random width (25–50%) into `<main>` on each click. After the list is exhausted it shows `assets/img/last.avif`. Adding/removing photos means editing the `imgs` array in `main.js`.

## README discrepancies

The README mentions TypeScript support and HTML minification. Neither is wired up: there are no `.ts` files, and `html-minifier-next` is installed but not used in `eleventy.config.js`.
