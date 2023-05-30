import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import slugify from "slugify";

export default async function CreatePost() {
  const session = await getServerSession();

  async function publish(data: FormData) {
    "use server";

    const title = data.get("title") as string;
    const body = data.get("body") as string;
    const slug = slugify(`${title} ${Math.random().toString(36).slice(2, 7)}`, {
      lower: true,
    });

    await sql`
          INSERT INTO posts(title, body, slug, user_id)
          VALUES (${title}, ${body}, ${slug}, (SELECT id FROM users WHERE email = ${session?.user?.email}));
          `;

    redirect(`/posts/${slug}`);
  }

  async function cancel() {
    "use server";
    redirect("/");
  }

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Create post
      </h1>

      <div className="mt-10">
        <form action={publish} className="space-y-6">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="input-bordered input"
            />
          </div>

          <div className="form-control">
            <label htmlFor="body" className="label">
              <span className="label-text">Body</span>
            </label>
            <textarea
              name="body"
              id="body"
              rows={5}
              className="textarea-bordered textarea"
            ></textarea>
          </div>

          <button className="btn">Publish</button>
          <button className="btn-link btn" formAction={cancel}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
