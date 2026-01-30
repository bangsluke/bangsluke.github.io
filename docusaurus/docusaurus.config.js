// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer").themes.github;
const darkCodeTheme = require("prism-react-renderer").themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "bangsluke Documentation",
  tagline: "Helper documentation for development",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://bangsluke-documentation.netlify.app/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "bangsluke", // Usually your GitHub org/user name.
  projectName: "bangsluke.github.io", // Usually your repo name.

  onBrokenLinks: "throw",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsed: false,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],


  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            attributes: {
              rel: 'icon',
              href: '/img/bangsluke-logo.png',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'manifest',
              href: '/manifest.json',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'theme-color',
              content: '#18191a',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'apple-mobile-web-app-capable',
              content: 'yes',
            },
          },
          {
            tagName: 'meta',
            attributes: {
              name: 'apple-mobile-web-app-status-bar-style',
              content: '#000',
            },
          },
          {
            tagName: 'link',
            attributes: {
              rel: 'apple-touch-icon',
              href: '/img/bangsluke-logo.png',
              sizes: '180x180',
            },
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/bangsluke.github.io-social-card.png",
      navbar: {
        title: "bangsluke",
        logo: {
          alt: "bangsluke Logo",
          src: "img/bangsluke-logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            to: "/docs",
            label: "Documentation",
            position: "left",
          },
          {
            href: "https://github.com/bangsluke",
            label: "GitHub",
            position: "right",
            target: "_blank",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Internal Links",
            items: [
              {
                label: "Documentation Introduction",
                to: "/docs/documentation-intro",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "bangsluke Homepage",
                href: "https://bangsluke.github.io/Homepage.html",
                target: "_blank",
              },
              {
                label: "bangsluke New Tab",
                href: "https://bangsluke.github.io/pages/NewTab.html",
                target: "_blank",
              },
            ],
          },
          {
            title: "Docusaurus Links",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
                target: "_blank",
              },
              {
                label: "Docusaurus GitHub",
                href: "https://github.com/facebook/docusaurus",
                target: "_blank",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} bangsluke Documentation, built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },

      algolia: {
        // The application ID provided by Algolia
        appId: "311LVMR47I",

        // Public API key: it is safe to commit it
        apiKey: "b24f96b1050bb193efd7538dcc75803d",

        indexName: "bangsluke-umentation",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
        replaceSearchResultPathname: {
          from: "/docs/", // or as RegExp: /\/docs\//
          to: "/docs/",
        },

        // Optional: Algolia search parameters
        searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: "search",

        //... other Algolia params
      },
    }),
};

module.exports = config;
