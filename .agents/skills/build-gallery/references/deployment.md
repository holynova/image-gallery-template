# Deployment routing

Choose exactly one provider for a run. Both adapters build the same `dist/` directory; neither should be enabled automatically alongside the other.

## GitHub Pages

Use `.github/workflows/deploy-pages.yml` after the user has chosen GitHub Pages and enabled Pages with GitHub Actions in repository settings. It is manual-only by default, uses `npm ci`, runs `npm run build`, uploads `dist` with `actions/upload-pages-artifact`, then calls `actions/deploy-pages`. The workflow passes the repository name as `PUBLIC_BASE_PATH`, so assets work for project pages. A push, remote creation, or workflow run requires explicit authorization.

## Cloudflare Pages

Use `wrangler.toml` with `pages_build_output_dir = "dist"` and the documented command `npm run deploy:cloudflare -- --project-name <name>`. The project name, account, token, domain, and login remain provider/user state; do not add them to tracked files. In the Cloudflare Pages dashboard, use build command `npm run build` and output directory `dist` if using a connected repository. Invoke a deploy only after the user selects Cloudflare Pages and authorizes the external mutation.
