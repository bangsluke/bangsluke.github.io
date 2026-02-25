---
slug: /general-documentation/umami-analytics-setup
description: How to set up and configure Umami analytics for this Docusaurus site
---

# Umami Analytics Setup

> [Back to Documentation Intro Contents](../DocumentationIntro.md)

This site uses [Umami](https://umami.is) for privacy-friendly analytics. The tracker is injected only in **production** builds so development traffic is not counted.

## Prerequisites

- **Umami Cloud**: Sign up at [cloud.umami.is](https://cloud.umami.is), or  
- **Self-hosted Umami**: Deploy Umami on your own server and have the tracker script URL (e.g. `https://your-analytics-domain.com/script.js`).

## Getting your Website ID

1. Log in to your Umami dashboard (Cloud or self-hosted).
2. Go to **Settings** → **Websites** (or **Websites** in the main menu).
3. Add a website if needed (e.g. your production URL).
4. Open the website and copy the **Website ID** (UUID). You may see it in the tracking code snippet as `data-website-id="..."`.

## Configuration in this project

### Required: Website ID

You must provide the Website ID in one of two ways:

**Option A – Environment variable (recommended for CI/deploy)**  
Set `UMAMI_WEBSITE_ID` when building or deploying, e.g. in Netlify, GitHub Actions, or your host’s environment:

- `UMAMI_WEBSITE_ID=your-website-id-uuid`

The plugin reads this at build time. No need to commit the ID.

**Option B – In config**  
In `docusaurus.config.js`, in the Umami plugin options, set:

```js
websiteId: 'your-website-id-uuid',
```

Use this only if you are comfortable committing the ID (it is not a secret, but some prefer to keep it in env).

### Optional settings

In the same plugin block in `docusaurus.config.js` you can set:

| Option | Description |
|--------|-------------|
| `scriptUrl` | Tracker script URL. Default: `https://cloud.umami.is/script.js`. For self-hosted use e.g. `https://your-analytics-domain.com/script.js`. |
| `hostUrl` | Override where data is sent (see [Umami tracker config](https://docs.umami.is/docs/tracker-configuration)). |
| `dataDomains` | Comma-separated list of domains where the tracker runs. **Recommended**: set to your production domain(s) (e.g. `bangsluke-documentation.netlify.app`) so staging/preview builds do not report. |
| `dataDoNotTrack` | Set to `true` to respect the browser’s Do Not Track setting. |
| `dataExcludeSearch` | Set to `true` to omit query parameters from the URL in events. |
| `dataExcludeHash` | Set to `true` to omit the URL hash. |
| `dataAutoTrack` | Set to `false` to disable automatic pageview tracking (you would track manually). |
| `dataTag` | Optional tag for segmenting events in the Umami dashboard. |

Example with optional fields:

```js
[
  require.resolve('./plugins/umami-analytics.js'),
  {
    websiteId: process.env.UMAMI_WEBSITE_ID || undefined,
    dataDomains: 'bangsluke-documentation.netlify.app',
    dataDoNotTrack: true,
  },
],
```

## Keeping the ID out of the repo

To avoid committing the Website ID:

1. Set **`UMAMI_WEBSITE_ID`** in your deployment environment (Netlify, Vercel, GitHub Actions, etc.).
2. Leave the plugin config as `websiteId: process.env.UMAMI_WEBSITE_ID || undefined` so the plugin uses the env value at build time.

If the ID is missing in production, the plugin simply does not inject the script (no errors).

## Verification

1. Build the site: `yarn build` (or `npm run build`).
2. Serve the production build: `yarn serve` (or `npm run serve`).
3. Open the site in a browser and load a few pages.
4. In the Umami dashboard, open your website and check **Realtime** or **Stats**. A pageview may take a few minutes to appear.

**Development:** Running `yarn dev` does **not** inject the Umami script, so local dev traffic is not counted.

## References

- [Umami documentation](https://docs.umami.is/)
- [Umami tracker configuration](https://docs.umami.is/docs/tracker-configuration)
- [Umami Cloud](https://cloud.umami.is)
