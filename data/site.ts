export const siteConfig = {
  name: "shadcn/ui",
  url: "https://ui.shadcn.com",
  ogImage: "https://ui.shadcn.com/og.jpg",
  description:
    "Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn-ui/ui",
  },

  dashboard: "/dashboard",
  shop: {
    product: "/dashboard/products",
    category: "/dashboard/categories",
    order: "/dashboard/orders",
    customer: "/dashboard/customers",
    seller: "/dashboard/sellers",
    analytic: "/dashboard/analytics",
    post: "/dashboard/posts"
  },
  info: {
    post: "/dashboard/posts"
  },
  management: {
    contact: "/support",
    setting: "/setting",
    profile: "/profile",
  },
  authorization: {
    login: "/login",
    register: "/register",
    forgotPassword: "/forgot-password",
    resetPassword: "/reset-password",
  },
};

export type SiteConfig = typeof siteConfig;

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};
