export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Dinsor",
  description: "Portfolio and creative works",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Portfolios",
      href: "/portfolios",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Portfolios",
      href: "/portfolios",
    },
  ],
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    docs: "https://heroui.com",
    discord: "https://discord.gg",
    sponsor: "https://patreon.com",
  },
};
