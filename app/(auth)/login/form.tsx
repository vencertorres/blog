'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);

		const formData = new FormData(event.currentTarget);

		const response = await signIn('credentials', {
			username: formData.get('username'),
			password: formData.get('password'),
			redirect: false,
		});

		setIsLoading(false);

		if (response?.ok) {
			return router.refresh();
		}

		toast.error(response?.error!);
	}

	return (
		<div>
			<Toaster />

			<form
				onSubmit={handleSubmit}
				className="space-y-6 rounded-md bg-white p-6 shadow sm:mx-auto sm:w-full sm:max-w-sm"
			>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						id="username"
						autoComplete="username"
						disabled={isLoading}
						required
					/>
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						autoComplete="current-password"
						disabled={isLoading}
						required
					/>
				</div>
				<Button type="submit" className="w-full" disabled={isLoading}>
					{isLoading && <Loader2 className="mr-1 h-4 w-4 animate-spin" />}
					Log in
				</Button>
			</form>
		</div>
	);
}
