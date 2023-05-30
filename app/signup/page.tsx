import { User } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { hash } from "bcrypt";
import Form from "./form";

export default function SignUp() {
  async function action(credentials: User) {
    "use server";

    const { name, email, password } = credentials;

    try {
      await sql`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${await hash(password, 10)});
      `;
    } catch (error) {
      throw new Error("Email is already taken");
    }
  }

  return (
    <>
      <h1 className="text-center text-2xl">Sign Up</h1>
      <Form signUp={action} />
    </>
  );
}
