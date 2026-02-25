/**
 * Umami Analytics plugin for Docusaurus.
 * Injects the Umami tracker script in production only.
 * @see https://docs.umami.is/docs/tracker-configuration
 */

const DEFAULT_SCRIPT_URL = 'https://cloud.umami.is/script.js';

/** @type {import('@docusaurus/types').PluginModule} */
function umamiAnalyticsPlugin(context, options = {}) {
  const {
    websiteId = process.env.UMAMI_WEBSITE_ID,
    scriptUrl = DEFAULT_SCRIPT_URL,
    hostUrl,
    dataDomains,
    dataDoNotTrack = false,
    dataExcludeSearch = false,
    dataExcludeHash = false,
    dataAutoTrack = true,
    dataTag,
  } = options;

  const isProduction = process.env.NODE_ENV === 'production';
  const effectiveWebsiteId = websiteId || '';

  return {
    name: 'umami-analytics',

    injectHtmlTags() {
      if (!isProduction || !effectiveWebsiteId) {
        return {};
      }

      const attrs = {
        src: scriptUrl,
        defer: true,
        'data-website-id': effectiveWebsiteId,
      };
      if (hostUrl) attrs['data-host-url'] = hostUrl;
      if (dataDomains) attrs['data-domains'] = dataDomains;
      if (dataDoNotTrack) attrs['data-do-not-track'] = 'true';
      if (dataExcludeSearch) attrs['data-exclude-search'] = 'true';
      if (dataExcludeHash) attrs['data-exclude-hash'] = 'true';
      if (dataAutoTrack === false) attrs['data-auto-track'] = 'false';
      if (dataTag) attrs['data-tag'] = dataTag;

      return {
        headTags: [
          {
            tagName: 'script',
            attributes: attrs,
          },
        ],
      };
    },
  };
}

module.exports = umamiAnalyticsPlugin;
