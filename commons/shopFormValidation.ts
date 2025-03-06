import { z } from "zod";

export const categoryFormSchema = z.object({
  slug: z
    .string()
    .min(2, { message: "Slug must be at least 2 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  url: z.string().url({ message: "Image must be an url" }),
});

export const productFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  description: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  price: z.coerce.number({ message: "Price must be a number" }),
  category: z.string({
    required_error: "Category can not be empty.",
  }),
  brand: z
    .string({
      required_error: "Brand can not be empty.",
    })
    .min(2, { message: "Brand name must be at least 2 characters long" }),
  // weight: z.union([z.coerce.number().nullish(), z.literal("")]),
  weight: z.coerce.number().optional(),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
  depth: z.coerce.number().optional(),
  tags: z.array(z.string()),
  warrantyInformation: z.string().optional(),
  shippingInformation: z.string().optional(),
  returnPolicy: z.string().optional(),
  availabilityStatus: z.string().optional(),
  sku: z.string({
    required_error: "sku can not be empty.",
  }),
  stock: z.union([z.coerce.number().optional(), z.literal("")]),
  // images: z.union([z.string().optional().array() , z.literal("")]),
  images: z
    .array(
      z.string().url({
        message: "Image must ne a url",
      })
    ),
    // .nonempty({ message: "Image can not be empty." }),

  thumbnail: z.string().url({ message: "Image must ne a url" }),
});

export const postFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Post title must be at least 2 characters long" }),
  body: z
    .string()
    .min(2, { message: "Post body must be at least 2 characters long" }),
  // tag: z.array(z.string()),
  // views: z.number(),
  userId: z.coerce.number(),
});

export const userProfileFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  firstName: z
    .string()
    .min(2, { message: "firstName must be at least 2 characters long" })
    .optional(),
  lastName: z
    .string()
    .min(2, { message: "lastName must be at least 2 characters long" })
    .optional(),
  maidenName: z
    .string()
    .min(2, { message: "maidenName must be at least 2 characters long" })
    .optional(),
  gender: z.string().optional(),
  age: z.number().optional(),
  birthDate: z.string().optional(),
  image: z
    .string()
    .url({
      message: "Image must ne a url",
    })
    .optional(),
});

export const userAddressFormSchema = z.object({
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  stateCode: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

export const shippingStatusFormSchema = z.object({
  shippingStatus: z.string().optional(),
});
