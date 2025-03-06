import { phoneSchema } from "@/components/ui/customize/phone-input";
import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

// export const loginFormSchema = z.object({
//   email: z.string().email({ message: "Invalid email address" }),
//   password: z
//     .string({
//       required_error: "Password can not be empty.",
//     })
//     .regex(/^.{8,20}$/, {
//       message: "Minimum 8 and maximum 20 characters.",
//     })
//     .regex(/(?=.*[A-Z])/, {
//       message: "At least one uppercase character.",
//     })
//     .regex(/(?=.*[a-z])/, {
//       message: "At least one lowercase character.",
//     })
//     .regex(/(?=.*\d)/, {
//       message: "At least one digit.",
//     })
//     .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
//       message: "At least one special character.",
//     }),
// });
export const loginFormSchema = z.object({
  username: z
    .string({
      required_error: "Username can not be empty.",
    })
    .min(2, { message: "Name must be at least 2 characters long" }),

  password: z
    .string({
      required_error: "Password can not be empty.",
    })
    .regex(/^.{8,20}$/, {
      message: "Minimum 8 and maximum 20 characters.",
    }),
  // .regex(/^.{8,20}$/, {
  //   message: "Minimum 8 and maximum 20 characters.",
  // })
  // .regex(/(?=.*[A-Z])/, {
  //   message: "At least one uppercase character.",
  // })
  // .regex(/(?=.*[a-z])/, {
  //   message: "At least one lowercase character.",
  // })
  // .regex(/(?=.*\d)/, {
  //   message: "At least one digit.",
  // })
  // .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
  //   message: "At least one special character.",
  // }),
});
export const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string({
        required_error: "Password can not be empty.",
      })
      .regex(/^.{8,20}$/, {
        message: "Minimum 8 and maximum 20 characters.",
      })
      .regex(/(?=.*[A-Z])/, {
        message: "At least one uppercase character.",
      })
      .regex(/(?=.*[a-z])/, {
        message: "At least one lowercase character.",
      })
      .regex(/(?=.*\d)/, {
        message: "At least one digit.",
      })
      .regex(/[$&+,:;=?@#|'<>.^*()%!-]/, {
        message: "At least one special character.",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const emailFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" })
      .regex(passwordValidation, {
        message:
          "Password must have least one uppercase letter, one lowercase letter, one number and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

// Schema for contact form validation
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  subject: z
    .string()
    .min(10, { message: "Subject must be at least 10 characters long" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" }),
  phone: phoneSchema,
});

export const profileFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: phoneSchema,
});

export const addressFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First Name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last Name must be at least 2 characters long" }),
  company: z.string(),
  address: z.string({
    required_error: "Please insert street address",
  }),
  country: z.string({
    required_error: "Please select a country",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: phoneSchema,
});
