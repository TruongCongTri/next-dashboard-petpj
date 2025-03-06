import { IBreadcrumbType } from "@/models/type";
import { siteConfig } from "./site";

export const categoriesBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Category List", href: "#" },
];
export const categoryDetailBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Category List", href: `${siteConfig.shop.category}` },
  { name: "Category Details", href: "#" },
];
export const categoryAddBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Category List", href: `${siteConfig.shop.category}` },
  { name: "Add Category", href: "#" },
];
export const categoryEditBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Category List", href: `${siteConfig.shop.category}` },
  { name: "Edit Category", href: "#" },
];

export const productsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Product List", href: `${siteConfig.shop.product}` },
];
export const productDetailsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Product List", href: `${siteConfig.shop.product}` },
  { name: "Product Details", href: "#" },
];
export const productAddBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Product List", href: `${siteConfig.shop.product}` },
  { name: "Add Product", href: "#" },
];
export const productEditBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Product List", href: `${siteConfig.shop.product}` },
  { name: "Edit Product", href: "#" },
];

export const ordersBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Order List", href: `${siteConfig.shop.order}` },
];
export const orderDetailsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Order List", href: `${siteConfig.shop.order}` },
  { name: "Order Details", href: `#` },
];

export const postsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Post List", href: "#" },
];
export const postDetailsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Post List", href: `${siteConfig.info.post}` },
  { name: "Post Details", href: "#" },
];
export const postAddBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Post List", href: `${siteConfig.info.post}` },
  { name: "Add Post", href: "#" },
];
export const postEditBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Post List", href: `${siteConfig.info.post}` },
  { name: "Edit Post", href: "#" },
];


export const usersBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Customer List", href: "#" },
];
export const userDetailsBreadcrumb: IBreadcrumbType[] = [
  { name: "Dashboard", href: `${siteConfig.dashboard}` },
  { name: "Customer List", href: `${siteConfig.info.post}` },
  { name: "Customer Details", href: "#" },
];