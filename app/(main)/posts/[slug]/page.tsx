import prisma from '@/lib/db';
import { format, formatISO9075 } from 'date-fns';
import Blocks from 'editorjs-blocks-react-renderer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
	return await prisma.post.findUnique({
		where: {
			slug: slug,
		},
		include: {
			author: true,
		},
	});
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug);

	if (!post) {
		notFound();
	}

	return {
		title: post.title,
	};
}

export default async function Post({ params }: { params: { slug: string } }) {
	const post = await getPost(params.slug);

	if (!post) {
		notFound();
	}

	return (
		<article className="prose mx-auto">
			<div className="not-prose mb-2 border-b-2 pb-4">
				<h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
				<p className="text-gray-500">{post.description}</p>
			</div>
			<div className="not-prose text-xs font-medium">
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
			{/* @ts-ignore */}
			{post.content && <Blocks data={post.content} />}
		</article>
	);
}
