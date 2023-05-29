import { Post } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { format, formatISO } from "date-fns";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { rows: posts } = await sql<Post>`
    SELECT title, body, slug, created_at, name as author FROM posts
    INNER JOIN users ON posts.user_id = users.id;
  `;

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Most recent
      </h2>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none">
        {posts.length !== 0 ? (
          posts.map((post) => (
            <article
              key={post.slug}
              className="flex max-w-xl flex-col items-start justify-between"
            >
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={formatISO(post.created_at)}>
                  {format(post.created_at, "LLLL dd, yyyy")}
                </time>
              </div>
              <div className="group">
                <h3 className="mt-3 text-lg font-semibold leading-6 group-hover:text-gray-600">
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
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
                  {post.author}
                </Link>
              </div>
            </article>
          ))
        ) : (
          <p className="text-center">No posts yet.</p>
        )}
      </div>
    </>
  );
}
