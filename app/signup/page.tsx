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
    <main className="hero min-h-[calc(100vh_-_4.1rem)] bg-base-200 px-4">
      <div className="card bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-xl font-medium">Sign Up</h1>
          <Form signUp={action} />
        </div>
      </div>
    </main>
  );
}
