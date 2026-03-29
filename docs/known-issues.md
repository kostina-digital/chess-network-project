# Known Issues

## Local file storage is not production-scalable

Uploaded avatars and post images are stored on the local filesystem. This is simple and effective for development, but it is not ideal for multi-instance deployments or ephemeral hosting environments.

## News quality depends on external data

The news section depends on GNews. Missing images, incomplete article text, or inconsistent formatting can come directly from the upstream source.

## UI consistency still needs a full pass

The project now has shared typography helpers, but some screens still rely on page-specific spacing and hand-tuned layouts. A broader design-system pass would make the application feel even more cohesive.

## Search is intentionally lightweight

Search currently covers core user and post discovery, but it is not ranked with a dedicated search engine and does not yet support advanced filtering.

## No dedicated test suite yet

The codebase currently relies heavily on manual verification and linting. Automated integration and component tests would reduce regression risk.
