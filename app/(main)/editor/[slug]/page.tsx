import prisma from '@/lib/db';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const Editor = dynamic(() => import('./editor'), { ssr: false });

export default async function EditorPage({ params }: { params: { slug: string } }) {
	const post = await prisma.post.findUnique({
		where: {
			slug: params.slug,
		},
	});

	if (!post) {
		notFound();
	}

	return (
		<div className="flex-1 bg-white px-6 py-12">
			<Editor post={post} />
		</div>
	);
}
