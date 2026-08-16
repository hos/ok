# Dependency pins — why

## eslint 9.39.5, typescript 6.0.3

Tried `bun update --latest` (2026-08-03). It moved both and broke the build:

- eslint 10.8.0 crashes inside `eslint-config-next`'s plugin chain — that chain still caps its peer
  range at eslint 9.
- TypeScript 7.0.2 is rejected outright by `next build` ("does not provide the compiler API required
  by Next.js") and by typescript-eslint, which does not support TS 7.

Rolled both back to the latest version in their working major (eslint 9.39.5, typescript 6.0.3).
`AGENTS.md` states the pin as a standing rule; this is the investigation behind it.

## sharp, postcss `resolutions`

`next` pins `sharp@^0.34.5` and `postcss@8.4.31` internally, both of which had open Dependabot
advisories. A plain semver bump in `package.json` doesn't reach them because `next` re-pins its own
copy — only a `resolutions` override forces the whole tree onto the patched version.
