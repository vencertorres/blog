import prisma from '@/lib/db';
import { notFound } from 'next/navigation';
import Editor from './editor';

export default async function EditorPage({ params }: { params: { slug: string } }) {
	const post = await prisma.post.findUnique({
		where: {
			slug: params.slug,
		},
	});

	if (!post) {
		notFound();
	}

	return <Editor post={post} />;
}
