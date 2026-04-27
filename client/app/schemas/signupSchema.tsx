import { z } from "zod";

export const signupSchema = z
  .object({
    username: z.string().min(2, "Username is required"),

    email: z.string().email("Enter a valid email"),

    password: z
      .string()
      .min(8, "Min 8 characters")
      .regex(/[A-Z]/, "Add uppercase")
      .regex(/[a-z]/, "Add lowercase")
      .regex(/[0-9]/, "Add number")
      .regex(/[^A-Za-z0-9]/, "Add special character"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;