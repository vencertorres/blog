import { sql } from "@vercel/postgres";

export async function seed() {
  await sql`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            body TEXT NOT NULL,
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `;

  console.log('Created "posts" table');

  await sql`
        INSERT INTO posts (title, body)
        VALUES ('First Blog Post', 'Welcome!')
    `;

  console.log('Seeded "posts" table');
}
