import { z } from "zod";

const Base = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Must contain at least 8 characters" }),
  confirm: z.string(),
});

export const SignUpSchema = Base.refine(
  (data) => data.password === data.confirm,
  {
    message: "Passwords don't match",
    path: ["confirm"],
  }
);

export const SignInSchema = Base.pick({ email: true, password: true });
