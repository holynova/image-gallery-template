# Gallery contract

The source contract is intentionally small:

- `content/site.yml` owns the site title/description, `features.download`, `features.share`, `layout.mode`, `layout.batchSize`, `layout.maxOutputBytes`, thumb/detail widths, output quality, and `analytics` provider toggle.
- `content/collections.yml` owns unique lowercase collection IDs, display labels, descriptions, and ordering.
- `content/images.yml` has one exact `source` path per file under `incoming/`, a known collection, and a non-empty `alt`; `caption` and `slug` are optional.
- `incoming/` is never published. Supported source extensions are AVIF, GIF, JPEG, PNG, SVG, TIFF, and WebP.

`npm run ingest` writes a versioned `src/data/manifest.json`. Each image includes `id`, `slug`, `source`, SHA-256 `sourceHash`, oriented width/height, source format, collection, alt, caption, a data URL placeholder, and `thumb`/`detail` AVIF/WebP/JPEG arrays. Each variant includes width, height, `/media/...` source, format, and bytes. Same-content files reuse canonical variant files and may carry `duplicateOf`.

The validator must reject missing files, unknown files, missing collections, duplicate source/slug/id, empty alt, malformed hashes, duplicate non-deduplicated output URLs, missing output files, invalid dimensions, and a manifest/config count mismatch. A source change invalidates its variants; changes to width or quality settings also regenerate affected variants. EXIF orientation is applied before output and output metadata is stripped by Sharp's default pipeline.

## Analytics events

When all of `PUBLIC_UMAMI_SCRIPT_URL` and `PUBLIC_UMAMI_WEBSITE_ID` are present (with optional `PUBLIC_UMAMI_DOMAINS`) and site analytics is enabled, inject the Umami script. Otherwise inject nothing. Emit only these events from the client:

| Event | Allowed properties |
| --- | --- |
| `gallery_view` | `collection` |
| `collection_select` | `collection` |
| `image_open` | `image_id`, `collection` |
| `image_download` | `image_id`, `collection` |
| `share_click` | `image_id`, `collection` |

Never pass raw captions, source paths, query strings, email addresses, or visitor-entered values to analytics.
