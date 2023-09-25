import CreatePostButton from '@/components/CreatePostButton';
import DeletePostModal from '@/components/DeletePostModal';
import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Dashboard',
};

export default async function Dashboard() {
	const user = await getCurrentUser();

	const posts = await prisma.post.findMany({
		where: {
			authorId: user?.id,
		},
	});

	return (
		<div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
			<div className="flex items-center justify-between">
				<div>
					<h1 className="text-xl font-medium text-gray-900">Posts</h1>
					<p className="text-sm text-gray-700">Manage your posts</p>
				</div>
				<CreatePostButton />
			</div>
			<div className="mt-10 overflow-x-auto rounded-md border bg-white px-4 py-2">
				{!!posts.length ? (
					<table className="w-full">
						<thead>
							<tr className="border-b">
								<th className="h-12 px-4 text-left align-middle text-sm font-medium text-gray-500">
									Title
								</th>
								<th className="h-12 px-4 text-left align-middle text-sm font-medium text-gray-500">
									Created at
								</th>
								<th className="h-12 px-4 text-left align-middle text-sm font-medium text-gray-500">
									Status
								</th>
								<th></th>
								<th></th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{posts.map((post) => (
								<tr key={post.slug}>
									<td className="p-4 align-middle text-sm text-gray-700">
										<Link
											href={`/posts/${post.slug}`}
											className="mr-auto hover:underline"
										>
											{post.title}
										</Link>
									</td>
									<td className="p-4 align-middle text-sm text-gray-700">
										{format(post.createdAt, 'LLL d, yyyy')}
									</td>
									<td className="p-4 align-middle text-sm text-gray-700">
										{post.published ? 'Published' : 'Unpublished'}
									</td>
									<td className="p-4">
										<Link
											href={`/editor/${post.slug}`}
											className="text-sm text-sky-500 hover:underline"
										>
											Edit
										</Link>
									</td>
									<td className="p-4">
										<DeletePostModal slug={post.slug} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div className="text-center text-sm text-gray-700">
						You don&apos;t have any posts yet. Start creating one.
					</div>
				)}
			</div>
		</div>
	);
}
