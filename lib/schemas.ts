import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Must be at least 8 characters long" }),
});

export const SignInSchema = SignUpSchema.pick({ email: true, password: true });
