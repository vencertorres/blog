import { z } from "zod";
import { SignInSchema, SignUpSchema } from "./schemas";

export interface Post {
  title: string;
  body: string;
  created_at: Date;
  slug: string;
  author: string;
}

export type User = z.infer<typeof SignUpSchema> & { id: number };

export type SignInErrors = z.inferFlattenedErrors<typeof SignInSchema>;
export type SignUpErrors = z.inferFlattenedErrors<typeof SignUpSchema>;
