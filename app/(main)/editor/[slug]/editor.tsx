'use client';

import { UpdatePost } from '@/app/api/posts/[slug]/route';
import LoadingButton from '@/components/LoadingButton';
import TextArea from '@/components/TextArea';
import { tools } from '@/lib/editorTools';
import EditorJS from '@editorjs/editorjs';
import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Editor({ post }: { post: Post }) {
	const [fields, setFields] = useState<UpdatePost>({
		title: post.title,
		description: post.description ?? '',
	});
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

	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setFields({ ...fields, [event.target.name]: event.target.value });
	}

	async function handleSubmit(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		setIsLoading(true);

		const isPublish = event.currentTarget.name === 'publish';

		const response = await fetch(`/api/posts/${post.slug}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: fields.title,
				description: fields.description,
				content: await editorCore.current?.save(),
				published: isPublish,
			}),
		});

		setIsLoading(false);

		if (!response.ok) {
			return toast.error(
				`Failed to ${isPublish ? 'publish' : 'save'} post. Please try again.`,
			);
		}

		const body = await response.json();

		if (isPublish) {
			return router.push(`/posts/${body.slug}`);
		}

		return router.push(`/editor/${body.slug}`);
	}

	return (
		<div>
			<Toaster />

			<form className="mx-auto max-w-prose space-y-6">
				<label htmlFor="title" className="sr-only">
					Title
				</label>
				<TextArea
					id="title"
					name="title"
					placeholder="Title"
					value={fields.title}
					onChange={handleChange}
					disabled={isLoading}
					required
					className="text-4xl font-bold"
				/>
				<label htmlFor="description" className="sr-only">
					Description
				</label>
				<TextArea
					id="description"
					name="description"
					placeholder="Description"
					value={fields.description}
					onChange={handleChange}
					disabled={isLoading}
					required
				/>
				<div id="editor" className="prose"></div>
				<LoadingButton
					name="publish"
					className="mr-2"
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Publish
				</LoadingButton>
				<LoadingButton
					name="save"
					variant="secondary"
					onClick={handleSubmit}
					disabled={isLoading}
				>
					Save as draft
				</LoadingButton>
			</form>
		</div>
	);
}
