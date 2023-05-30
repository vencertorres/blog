import { Post } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  const { rows: posts } = await sql<Post>`
      SELECT title, body, created_at, name as author FROM posts
      INNER JOIN users ON posts.user_id = users.id WHERE slug = ${slug};
    `;
  return posts[0];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return {
    title: `${post.title} | by ${post.author} | Blog`,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <article className="prose">
      <header>
        <h1>{post.title}</h1>
        <small>
          by {post.author} {format(post.created_at, "LLLL dd, yyyy")}
        </small>
      </header>
      <p>{post.body}</p>
    </article>
  );
}
