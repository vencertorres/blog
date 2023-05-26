import { seed } from "@/lib/seed";
import { Post } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { format, formatISO } from "date-fns";
import Link from "next/link";

export default async function Home() {
  let posts;

  try {
    let result = await sql<Post>`SELECT * FROM posts;`;
    posts = result.rows;
  } catch (error) {
    console.log(
      "Table does not exist, creating and seeding it with dummy data now..."
    );
    await seed();
    let result = await sql<Post>`SELECT * FROM posts;`;
    posts = result.rows;
  }

  return (
    <section className="bg-base-100 py-24 sm:py-32">
      <div className="mx-auto max-w-[42rem] px-6 lg:px-8">
        <header className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Most recent
          </h2>
        </header>

        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={formatISO(post.createdAt)}>
                  {format(post.createdAt, "LLLL dd, yyyy")}
                </time>
              </div>
              <div className="group">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                  <Link href="#">{post.title}</Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm leading-6">
                  {post.body}
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="#"
                  className="text-sm font-semibold leading-6 hover:text-gray-600"
                >
                  Author
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
