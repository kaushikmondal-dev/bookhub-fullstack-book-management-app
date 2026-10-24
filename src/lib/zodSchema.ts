import z from "zod";

//--------Login Schema ----------//

export const loginFormSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .max(64, { error: "Email must not exceed 64 characters" })
    .lowercase(),

  password: z
    .string()
    .min(8, { error: "Password must be minimum 8 characters long" })
    .max(128, { error: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, { error: "Must contain an uppercase letter" })
    .regex(/[a-z]/, { error: "Must contain a lowercase letter" })
    .regex(/[0-9]/, { error: "Must contain a number" })
    .regex(/[^A-Za-z0-9]/, { error: "Must contain a special character" }),

  rememberMe: z.boolean().optional(),
});
export type LogingFormType = z.infer<typeof loginFormSchema>;

//--------Register Schema ----------//
export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { error: "Name must be at least 5 characters long" })
      .max(32, { error: "Name must not exceed 64 characters" }),

    email: z
      .email({ error: "Invalid email address" })
      .max(64, { error: "Email must not exceed 64 characters" })
      .lowercase(),

    password: z
      .string()
      .min(8, { error: "Password must be minimum 8 characters long" })
      .max(128, { error: "Password must not exceed 128 characters" })
      .regex(/[A-Z]/, { error: "Must contain an uppercase letter" })
      .regex(/[a-z]/, { error: "Must contain a lowercase letter" })
      .regex(/[0-9]/, { error: "Must contain a number" })
      .regex(/[^A-Za-z0-9]/, { error: "Must contain a special character" }),

    confirmPassword: z
      .string()
      .min(1, { error: "Please comfirm your Password" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passoward did't match",
    path: ["confirmPassword"],
  });

export type RegisterFormType = z.infer<typeof registerFormSchema>;

//--------Book Schema ----------//
export const bookFormSchema = z.object({
  // image: z.string().trim().min(1, { error: "Image URL is required" }),
  title: z
    .string()
    .trim()
    .min(1, { error: "Title is required" })
    .max(120, { error: "Title must not exceed 120 characters" }),

  author: z
    .string()
    .trim()
    .min(1, { error: "Author is required" })
    .max(80, { error: "Author must not exceed 80 characters" }),

  isbn: z
    .string()
    .trim()
    .regex(/^\d{13}$/, {
      error: "ISBN must contain exactly 13 digits",
    }),

  publishedYear: z.coerce
    .number({ message: "Published year must be a number" })
    .int("Published year must be a whole number")
    .min(1000, "Year must be at least 1000")
    .max(new Date().getFullYear(), "Year cannot be in the future"),

  price: z.coerce
    .number({ error: "Price must be a number" })
    .positive({ error: "Price must be a positive number" }),

  pages: z.coerce
    .number({ error: "Pages must be a number" })
    .int({ error: "Pages must be a whole number" })
    .positive({ error: "Pages must be greater than 0" }),

  language: z
    .string()
    .trim()
    .min(1, { error: "Language is required" })
    .max(30, { error: "Language must not exceed 30 characters" }),

  category: z
    .string({ error: "Must select book category" })
    .min(1, "Must select book category"),

  description: z
    .string()
    .trim()
    .min(10, { error: "Description must be at least 10 characters" })
    .max(2000, { error: "Description must not exceed 2000 characters" }),
});

export type BookFormType = z.infer<typeof bookFormSchema>;
