import z from "zod";

//---------- Login Form Schema ----------- //

export const loginFormSchema = z.object({
  email: z
    .email({ error: "Invalid email address" })
    .max(64, { error: "Email must not be exceed of 64 characters" })
    .toLowerCase(),

  password: z
    .string()
    .min(8, { error: "Password must be minimum 8 characters long" })
    .max(128, { error: "Password must not exceed 128 characters" })
    .regex(/[A-Z]/, { error: "Must contain an uppercase latter" })
    .regex(/[a-z]/, { error: "Must contain an lowercase latter" })
    .regex(/[0-9]/, { error: "Must contain a number" })
    .regex(/[^A-Za-z0-9]/, { error: "Must contain a special character" }),

  rememberMe: z.boolean().optional(),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;

//--------Register Schema ----------//

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(5, { error: "Name must be at least 5 characters long" })
      .max(32, { error: "Name must not be exceed 32 characters" })
      .regex(/^[A-Z]/, { error: "Name must start with an uppercase letter" }),

    email: z
      .email({ error: "Invalid email address" })
      .max(64, { error: "Email must not be exceed of 64 characters" })
      .toLowerCase(),

    password: z
      .string()
      .min(8, { error: "Password must be minimum 8 characters long" })
      .max(128, { error: "Password must not exceed 128 characters" })
      .regex(/[A-Z]/, { error: "Must contain an uppercase latter" })
      .regex(/[a-z]/, { error: "Must contain an lowercase latter" })
      .regex(/[0-9]/, { error: "Must contain a number" })
      .regex(/[^A-Za-z0-9]/, { error: "Must contain a special character" }),

    confirmPassword: z.string().min(1, { error: "confirm Your Passoward" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    error: "Passoward did't match",
    path: ["confirmPassword"],
  });
export type RegisterFormType = z.infer<typeof registerFormSchema>;
