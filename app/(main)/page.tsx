import prisma from '@/lib/db';
import { format, formatISO9075 } from 'date-fns';
import Link from 'next/link';

export default async function Home() {
	const posts = await prisma.post.findMany({
		where: {
			published: true,
		},
		include: {
			author: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return (
		<div className="mx-auto max-w-prose space-y-10 px-6 py-12">
			{posts.map((post) => (
				<article key={post.id} className="group first:border-b-2 first:py-8">
					<div className="text-xs font-medium">
						<Link
							href={`/profile/@${post.author.username}`}
							className="text-sky-500 underline hover:decoration-2"
						>
							{post.author.name}
						</Link>{' '}
						<time
							dateTime={formatISO9075(post.createdAt, { representation: 'date' })}
							className="text-gray-500"
						>
							{format(post.createdAt, 'LLL d, yyyy')}
						</time>
					</div>
					<h2 className="mt-2 text-2xl font-medium text-gray-900 group-first:text-4xl group-first:font-bold">
						<Link href={`/posts/${post.slug}`} className="link">
							{post.title}
						</Link>
					</h2>
					<p className="mt-4 text-gray-500">{post.description}</p>
				</article>
			))}
		</div>
	);
}
