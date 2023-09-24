'use client';

import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

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

			<button
				onClick={handleClick}
				className="inline-flex w-32 items-center justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:pointer-events-none disabled:opacity-50 "
				disabled={isLoading}
			>
				{isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" aria-hidden="true" />}
				Create post
			</button>
		</>
	);
}
