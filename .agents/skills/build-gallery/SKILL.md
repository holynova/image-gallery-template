---
name: build-gallery
description: Build or refresh a validated, accessible static image gallery from user-supplied images and content configuration, then prepare one explicitly chosen deployment target.
---

# Build Gallery

Use this skill when a user wants to turn a folder of images into this repository's reusable gallery, refresh content, or prepare a gallery for publishing. Keep the work inside the repository unless the user separately authorizes external writes or deployment.

## Workflow

1. Intake: read the repository `AGENTS.md`, this skill's references, `content/site.yml`, `content/collections.yml`, and `content/images.yml`. Confirm the intended visual language, audience, image rights, and whether download/share are allowed. Treat any missing rights or protected content as a blocking input question.
2. Image processing: place or verify user-approved originals under `incoming/`, keep source-to-metadata paths exact, and run `npm run ingest`. Never hand-edit generated manifest or media output. Resolve missing metadata, empty alt, unsupported files, duplicate slugs, and unexpected source changes before continuing.
3. Content completion: write descriptive, non-PII alt text and captions based only on provided evidence. Preserve the user's language and collection taxonomy. Do not invent people, locations, licenses, or sensitive attributes.
4. Preview: run `npm run validate`, `npm run check`, `npm test`, and `npm run build`; then run `npm run preview` and smoke-test keyboard navigation, focus return, filter controls, mobile layout, responsive image requests, and the selected feature flags.
5. QA: verify only one first-paint eager/high candidate, lazy loading and batching for later images, no original source copied to `dist`, no missing manifest references, and no analytics script when Umami variables are absent. Read [references/schema.md](references/schema.md) for field-level checks.
6. Deployment choice: ask the user to choose GitHub Pages or Cloudflare Pages if no target was named. Read only the selected provider section in [references/deployment.md](references/deployment.md). Configure one target; never enable two automatic deployment paths at once.
7. Publish: deployment is an external mutation. Require explicit authorization immediately before pushing, creating a remote, or invoking a provider deploy command. Without that authorization, deliver the verified `dist/` and exact next command instead.

## Decision boundaries

- Keep generated state deterministic and scoped to `public/media/` and `src/data/`; do not remove unrelated user files.
- Keep Umami disabled unless the complete approved environment configuration is present; report missing variables without failing the site at runtime.
- Prefer fixing input/config issues over silently guessing. A preview or build failure is incomplete work, not a successful delivery.
- Route schema and event details to the references instead of duplicating them here.
