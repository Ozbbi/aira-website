// AIRA Android APK — single source of truth for download URL
// When new APK is built, update ONLY this file. All buttons/links
// across the site will pull from here automatically.

export const APK_VERSION = {
  version: "1.0.0",
  buildNumber: 1,
  downloadUrl: "https://expo.dev/artifacts/eas/PLACEHOLDER_APK_URL",
  releasedAt: "2026-05-12",
  changelog: "Initial release — 62 lessons, 5 tabs, full Pro features",
};

// To update: replace downloadUrl above, increment version, update
// releasedAt and changelog. Commit and push. Site auto-deploys with
// new APK link.
