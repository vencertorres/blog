'use client';

import { LoadingButton } from '@/components/LoadingButton';
import TextArea from '@/components/TextArea';
import { tools } from '@/lib/editorTools';
import EditorJS from '@editorjs/editorjs';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Editor({ post }: { post: Post }) {
	const [isLoading, setIsLoading] = useState(false);
	const editorCore = useRef<EditorJS>();
	const router = useRouter();

	useEffect(() => {
		if (!editorCore.current) {
			editorCore.current = new EditorJS({
				holder: 'editor',
				placeholder: 'Write something interesting.',
				// @ts-ignore
				data: post.content,
				tools,
			});
		}
	}, [post]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);
		const content = await editorCore.current?.save();

		const response = await fetch(`/api/posts/${post.slug}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: formData.get('title'),
				description: formData.get('description'),
				content,
			}),
		});

		setIsLoading(false);

		if (!response.ok) {
			return toast.error('Failed to save post. Please try again.');
		}

		const body = await response.json();

		router.push(`/posts/${body.slug}`);
	}

	return (
		<div>
			<Toaster />

			<form onSubmit={handleSubmit} className="mx-auto max-w-prose space-y-6">
				<TextArea
					name="title"
					ariaLabel="title"
					placeholder="Title"
					defaultValue={post.title}
					disabled={isLoading}
					required
					className="text-4xl font-bold"
				/>
				<TextArea
					name="description"
					ariaLabel="description"
					placeholder="Description"
					defaultValue={post.description ?? ''}
					disabled={isLoading}
					required
				/>
				<div id="editor" className="prose"></div>
				<LoadingButton type="submit" disabled={isLoading}>
					Publish
				</LoadingButton>
			</form>
		</div>
	);
}
