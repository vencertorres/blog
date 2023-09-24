'use client';

import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LoadingButton } from './LoadingButton';

export default function CreatePostButton() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function handleClick(event: MouseEvent<HTMLButtonElement>) {
		setIsLoading(true);

		const response = await fetch('/api/posts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: 'Untitled Post',
			}),
		});

		setIsLoading(false);

		if (!response.ok) {
			return toast.error('Post not created. Please try again');
		}

		const body = await response.json();

		router.push(`/editor/${body.slug}`);
	}

	return (
		<>
			<Toaster />

			<LoadingButton onClick={handleClick} className="w-32" disabled={isLoading}>
				Create post
			</LoadingButton>
		</>
	);
}
