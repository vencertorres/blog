import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL, { ssl: "require" });

await sql`
    CREATE TABLE IF NOT EXISTS migrations (
        id TEXT PRIMARY KEY NOT NULL,
        timestamp TIMESTAMP NOT NULL
    );
`;

await sql.begin(async (sql) => {
  const dir = path.resolve(process.cwd(), "./postgres/migrations");

  for (const fileName of fs.readdirSync(dir)) {
    const result = await sql`
        SELECT * FROM migrations
        WHERE id = ${fileName}
    `;

    if (result.length === 0) {
      console.log(`Running migration ${fileName}`);

      await sql.file(path.resolve(dir, fileName));

      await sql`
            INSERT INTO migrations (id, timestamp)
            VALUES (${fileName}, ${new Date()})
        `;
    }
  }
});

await sql.end();
