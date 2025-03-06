export interface ICategoryType {
  id?: number;
  name: string;
  description: string;
  image: string;
  added?: Date;
}

export interface IProductType {
  id?: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  category?: ICategoryType;
  added?: Date;
}

export interface IPageType {
  page: number;
  perPage: number;
}

export interface IUserType {
  id?: number;
  name: string;
  email: string;
  password: string;
  phone?: string;
  created?: Date;
}

export interface IOrderProduct {
  qtt: number;
  product: IProductType;
}
export interface IOrderType {
  id?: number;
  products: IOrderProduct[];
  customerId: number;
  customer: IUserType;
  total: number;
  created: Date;
  payment: "MasterCard" | "Visa" | "PayPal";
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export interface IBreadcrumbType {
  name: string;
  href: string;
}
