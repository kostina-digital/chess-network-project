# Known Issues

## Local file storage is not production-scalable

Uploaded avatars are stored under `/tmp/uploads/avatars` by default to avoid read-only `public` in serverless, so they are non-persistent across deploys. Post images still live under `public/uploads/posts`. A durable blob/storage backend is needed for production.

## News quality depends on external data

The news section depends on GNews. Missing images, incomplete article text, or inconsistent formatting can come directly from the upstream source.

## UI consistency still needs a full pass

The project now has shared typography helpers, but some screens still rely on page-specific spacing and hand-tuned layouts. A broader design-system pass would make the application feel even more cohesive.

## Search is intentionally lightweight

Search currently covers core user and post discovery, but it is not ranked with a dedicated search engine and does not yet support advanced filtering.

## No dedicated test suite yet

The codebase currently relies heavily on manual verification and linting. Automated integration and component tests would reduce regression risk.
