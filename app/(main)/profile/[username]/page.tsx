import prisma from '@/lib/db';
import { format } from 'date-fns';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getUser(username: string) {
	return await prisma.user.findUnique({
		where: {
			username: username,
		},
		include: {
			posts: {
				where: {
					published: true,
				},
			},
		},
	});
}

export async function generateMetadata({ params }: { params: { username: string } }) {
	const user = await getUser(params.username);

	if (!user) {
		notFound();
	}

	return {
		title: `${user.name} (@${user.username})`,
	};
}

export default async function Profile({ params }: { params: { username: string } }) {
	const user = await getUser(params.username);

	if (!user) {
		notFound();
	}

	return (
		<div className="min-h-[calc(100vh-4rem)] bg-gray-50 px-6 py-12">
			<div className="mx-auto max-w-prose">
				<h1 className="text-4xl font-bold text-gray-900">{user.name}</h1>
				<p className="text-lg font-medium text-gray-500">@{user.username}</p>
				<p className="mt-2 text-sm text-gray-700">
					Joined {format(user.createdAt, 'LLL d, yyyy')}
				</p>
				<div className="mt-10 divide-y rounded border bg-white px-6 py-2">
					{user.posts.map((post) => (
						<article key={post.id} className="py-4">
							<h2 className="text-xl font-medium text-gray-900">
								<Link href={`/posts/${post.slug}`} className="link">
									{post.title}
								</Link>
							</h2>
							<p className="mt-2 text-sm text-gray-500">{post.description}</p>
						</article>
					))}
				</div>
			</div>
		</div>
	);
}
