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
