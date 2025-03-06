export interface ICategoryColumn {
  id?: number;
  name: string;
  description: string;
  image: string;
  added?: Date;
  sale: number;
  stock: number;
}

export interface IProductColumn {
  id?: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  categoryId: number;
  category?: ICategoryColumn;
  sku?: number;
  stock?: number;
  status?: "Draft" | "Published" | "Low Stock" | "Out of Stock";
  added?: Date;
  variants?: number;
}

export interface ICustomerColumn {
  id?: number;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  orders?: number;
  balance?: number;
  status?: "Draft" | "Active" | "Blocked";
  created?: Date;
}

export interface IOrderColumn {
  id?: number;
  products: IOrderProductColumn[];
  customerId: number;
  customer: ICustomerColumn;
  total: number;
  created: Date;
  payment: "MasterCard" | "Visa" | "PayPal";
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

export interface IOrderProductColumn {
  qtt: number;
  product: IProductColumn;
}
