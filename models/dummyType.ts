export interface IMetaData {
  createdAt: Date;
  updatedAt: Date;
  barcode: string;
  qrCode: string;
}

export interface IReviewType {
  rating: number;
  comment: string;
  date: Date;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ICategoryType {
  slug: string;
  name: string;
  url: string;
}

export interface IProductType {
  id?: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  brand: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  returnPolicy: string;
  availabilityStatus: string;
  sku: string;
  stock: number;
  meta: IMetaData;
  review?: IReviewType[];
  minimumOrderQuantity?: number;
  thumbnail?: string;
}

export interface IPageType {
  page: number;
  perPage: number;
}

export interface IUserType {
  id?: number;
  username: string;
  email: string;
  accessToken: string;
  refreshToken: string;
  password: string;
  phone: string;

  firstName: string;
  lastName: string;
  maidenName: string;
  gender: "male" | "female" | "no mention";
  age: number;
  birthDate: Date;

  image: string;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: string;
    country: string;
  };

  role: "admin" | "moderator" | "user";
}

export interface IAuthType {
  username: string;
  password: string;
}

export interface IBreadcrumbType {
  name: string;
  href: string;
}

export interface IPostType {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: {
    likes?: number;
    dislikes?: number;
  };
  views?: number;
  userId: number;
}

export interface IProdCartType {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountTotal: number;
  thumbnail: string;
}
export interface ICartType {
  id: number;
  products: IProdCartType[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
  availabilityStatus: "Processing" | "Shipped" | "Delivered";
  meta: IMetaData;
}

export interface CartArr {
  carts: ICartType[];
  total: number;
}
