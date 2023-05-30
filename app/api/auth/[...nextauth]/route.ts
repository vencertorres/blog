import { SignInSchema } from "@/lib/schemas";
import { User } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // @ts-expect-error
      async authorize(credentials) {
        try {
          const result = SignInSchema.parse(credentials);

          const { rows: users } = await sql<User>`
            SELECT * FROM users WHERE email = ${result.email}
          `;

          const match = await compare(result.password, users[0].password);
          if (!match) throw new Error();

          return {
            id: 1,
            name: users[0].name,
            email: users[0].email,
          };
        } catch (error) {
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
