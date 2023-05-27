import { Post } from "@/lib/types";
import { sql } from "@vercel/postgres";
import { format } from "date-fns";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

async function getPost(slug: string) {
  try {
    const { rows } = await sql<Post>`SELECT * FROM posts WHERE slug = ${slug}`;
    return rows[0];
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: `${post.title} | by Author | Blog`,
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article className="prose">
      <header>
        <h1>{post.title}</h1>
        <small>by Author {format(post.createdAt, "LLLL dd, yyyy")}</small>
      </header>
      <p>{post.body}</p>
    </article>
  );
}
