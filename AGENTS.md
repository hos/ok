# ok — Project Instructions

Karen Ohanyan's gallery site (karenohanyan.art). Next.js App Router, TypeScript, Tailwind v4,
`next-intl`. Content is JSON and HTML in the repo — no backend, no database, no auth, no API routes.
The only env var is `HOST_URL`, optional, defaulting to the public hostname.

Keep this file small — it is re-read on every message.

## Commands

**bun is the package manager and is not on PATH.** Start with `export PATH="$HOME/.bun/bin:$PATH"`.

- `bun run dev` — Turbopack dev server on **port 3011**, not 3000.
- `bun run build` — the build **and** the only typecheck. Run it before claiming anything works.
- `bun run lint` — `eslint .`; currently clean.

**There are no tests.** Verification is `build` + `lint`, plus clicking through `dev` for anything
visual — never report a UI change as working on the strength of a build alone.

`bun install` blocks three postinstalls (`@parcel/watcher`, `@swc/core`, `unrs-resolver`); build,
lint and dev all work anyway, so don't trust them just to silence the notice.

## Layout

```
src/app/[locale]/          routes; [album]/[image] is the gallery viewer
src/proxy.ts               the next-intl middleware — Next 16 renamed middleware → proxy
src/i18n/request.ts        builds the message catalogue from public/locales/<locale>/*.json
src/components/            ui/carousel.tsx and ui/button.tsx are shadcn-derived, the rest bespoke
public/images/large/       every artwork; the filename is the identity used everywhere
public/locales/{en,hy,ru}/ translations, plus docs/*.html — the body of every essay
```

## Content is data, not code

Adding an album touches four places and misses are silent:

1. the JPEGs into `public/images/large/` — the **filename minus extension is the key** everywhere else
2. an entry in `src/data/albums.json` (`path` becomes the URL segment)
3. the album title in each `public/locales/<locale>/albums.json`
4. a per-image title in each `public/locales/<locale>/images.json`, one key per filename

A text is the same shape: metadata in `src/data/texts.json`, body as
`public/locales/<locale>/docs/<slug>.html`, title in `texts.json`.

## Traps

- **`src/lib/images.ts` is dead code**, a static import map nothing imports. Don't extend it when
  adding artwork; `AlbumImage` builds `/images/large/<fileName>` directly.
- **`ru` is translated but not enabled** — absent from `locales` in `src/config.ts`, and its
  `media.json` is missing, so switching it on without that file breaks the catalogue.
- **eslint 9.39.5 and typescript 6.0.3 are pinned deliberately.** `bun update --latest` moves both
  and breaks the build: eslint 10 crashes inside `eslint-config-next`'s plugin chain, and TypeScript
  7 is rejected by `next build` and typescript-eslint alike.
- **`next-env.d.ts` flips** between a dev and a build variant — revert that churn, don't commit it.
- The `resolutions` pins on `sharp` and `postcss` clear Dependabot advisories. Don't drop them
  without rechecking the alerts.
- `bun update <pkg>` adds `<pkg>` as a direct dependency; to move a transitive, delete `bun.lock`
  and reinstall so the tree resolves fresh.

## Conventions

Prettier runs as an eslint rule and imports are sorted by `simple-import-sort` — `eslint . --fix`
settles both. Commit subjects are lowercase and imperative ("add album charlies-dream").
