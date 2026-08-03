# ok — Project Instructions

Karen Ohanyan's gallery site (karenohanyan.art). Next.js App Router, TypeScript, Tailwind v4,
`next-intl`. All content lives in the repo as JSON and HTML — there is no backend, no database, no
auth and no API routes. The only env var is `HOST_URL`, optional, defaulting to the public hostname.

Keep this file small on purpose — it is re-read on every message.

## Commands

**bun is the package manager, and it is not on PATH.** It lives at `~/.bun/bin/bun`, so a bare `bun`
fails with "command not found" — start with `export PATH="$HOME/.bun/bin:$PATH"`.

- `bun run dev` — Turbopack dev server on **port 3011** (not 3000). Ready in under a second.
- `bun run build` — production build **and** the only typecheck. Run it before claiming anything works.
- `bun run lint` — `eslint .`. Clean as of the last commit; keep it that way.

`bun install` blocks three postinstalls (`@parcel/watcher`, `@swc/core`, `unrs-resolver`). That is
fine — build, lint and dev all work with them blocked. Don't trust them just to silence the notice.

**There are no tests.** Verification is `build` + `lint`, plus clicking through `dev` for anything
visual. Do not report a UI change as working on the strength of a build alone.

## Layout

```
src/app/[locale]/          routes; [album]/[image] is the gallery viewer
src/app/robots.ts sitemap.ts
src/proxy.ts               the next-intl middleware — Next 16 renamed middleware → proxy
src/i18n/request.ts        assembles the message catalogue from public/locales/<locale>/*.json
src/config.ts              enabled locales + HOST_URL
src/data/albums.json       the album list: name, path, artform, default index, images[]
src/data/texts.json        text metadata, keyed by slug
src/components/            ui/carousel.tsx and ui/button.tsx are shadcn-derived; the rest is bespoke
src/lib/                   image paths, album/page navigation, ld+json, cn()
public/images/large/       every artwork, filename is the identity used everywhere
public/locales/{en,hy,ru}/ translations + docs/*.html, the body text of every essay
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

- **`README.md` is stale.** It describes an express/pug app; the site was rewritten in Next long ago.
  Ignore it, don't reason from it.
- **`src/lib/images.ts` is dead code** — a static import map nothing imports. Do not extend it when
  adding artwork; `AlbumImage` builds `/images/large/<fileName>` directly.
- **`ru` is translated but not enabled.** It is absent from `locales` in `src/config.ts` and its
  `media.json` is missing, so switching it on without that file breaks the catalogue.
- **eslint 9.39.5 and typescript 6.0.3 are pinned deliberately** — `bun update --latest` will move
  both and break the build. eslint 10 crashes inside `eslint-config-next`'s plugin chain, which caps
  at eslint 9; TypeScript 7 is rejected outright by both `next build` and typescript-eslint.
- **`next-env.d.ts` flips** between a dev and a build variant. That churn is noise — revert it rather
  than committing it.
- `typedRoutes` is on, so route strings are checked and some `Link href` values need `as Route`.
- **If a `yarn.lock` ever reappears, delete it.** With no bun lockfile present bun *migrates*
  `yarn.lock` instead of resolving from the registry, and any range that file doesn't cover fails
  with "failed to resolve" — a confusing error that looks like a network problem and isn't.
- **`bun update <pkg>` adds `<pkg>` as a direct dependency.** It does not bump a transitive pin. To
  move transitives, delete `bun.lock` and reinstall so the tree resolves fresh.
- The `resolutions` block pins `sharp` and `postcss` above what `next` asks for, to clear Dependabot
  advisories. bun honours it. Don't drop it without rechecking the alerts.

## Conventions

Prettier runs as an eslint rule, imports are sorted by `simple-import-sort` — `eslint . --fix` settles
both. Commit subjects are lowercase and imperative ("add album charlies-dream").
