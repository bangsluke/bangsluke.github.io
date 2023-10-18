// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

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
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
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

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/bangsluke.github.io-social-card.png",
      navbar: {
        title: "bangsluke Documentation",
        logo: {
          alt: "bangsluke Logo",
          src: "img/bangsluke.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            to: "/docs",
            label: "    Documents",
            position: "left",
          },
          {
            href: "https://github.com/bangsluke",
            label: "GitHub",
            position: "right",
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
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Links",
            items: [
              {
                label: "bangsluke Homepage",
                href: "https://bangsluke.github.io/Homepage.html",
              },
              {
                label: "bangsluke New Tab",
                href: "https://bangsluke.github.io/pages/NewTab.html",
              },
            ],
          },
          {
            title: "Docusaurus Links",
            items: [
              {
                label: "Stack Overflow",
                href: "https://stackoverflow.com/questions/tagged/docusaurus",
              },
              {
                label: "Docusaurus GitHub",
                href: "https://github.com/facebook/docusaurus",
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
    }),
};

module.exports = config;
