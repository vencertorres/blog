'use client';

import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Button from './Button';
import LoadingButton from './LoadingButton';
import Modal from './Modal';

export default function DeletePostButton({ slug }: { slug: string }) {
	const [isLoading, setIsLoading] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();

	function closeModal() {
		if (isLoading) return;
		setIsOpen(false);
	}

	async function deletePost(event: MouseEvent<HTMLButtonElement>) {
		setIsLoading(true);

		const response = await fetch(`/api/posts/${slug}`, {
			method: 'DELETE',
		});

		setIsLoading(false);
		setIsOpen(false);

		if (!response.ok) {
			return toast.error('Failed to delete post.');
		}

		router.refresh();
	}

	return (
		<>
			<Toaster />

			<Modal isOpen={isOpen} closeModal={closeModal}>
				<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
					Delete post
				</Dialog.Title>
				<div className="mt-2">
					<p className="text-sm text-gray-500">Are you sure want to delete this post?</p>
				</div>

				<div className="mt-4 flex justify-end gap-4">
					<Button variant="secondary" onClick={closeModal} disabled={isLoading}>
						Cancel
					</Button>
					<LoadingButton variant="destructive" disabled={isLoading} onClick={deletePost}>
						{isLoading ? 'Deleting' : 'Yes'}
					</LoadingButton>
				</div>
			</Modal>

			<button
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center justify-center px-3 py-1.5 text-sm text-red-500 hover:underline"
			>
				Delete
			</button>
		</>
	);
}
