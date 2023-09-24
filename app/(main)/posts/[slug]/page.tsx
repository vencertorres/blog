import prisma from '@/lib/db';
import Blocks from 'editorjs-blocks-react-renderer';
import { notFound } from 'next/navigation';

async function getPost(slug: string) {
	return await prisma.post.findUnique({
		where: {
			slug: slug,
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
		<main className="flex-1 bg-white">
			<article className="prose mx-auto px-6 py-12">
				<h1>{post.title}</h1>
				<p>{post.description}</p>
				{/* @ts-ignore */}
				{post.content && <Blocks data={post.content} />}
			</article>
		</main>
	);
}
