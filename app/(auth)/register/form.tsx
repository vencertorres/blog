'use client';

import { FieldErrors } from '@/app/api/register/route';
import Errors from '@/components/Errors';
import Input from '@/components/Input';
import Label from '@/components/Label';
import LoadingButton from '@/components/LoadingButton';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function RegisterForm() {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState<FieldErrors | null>(null);
	const router = useRouter();

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		setErrors(null);

		const formData = new FormData(event.currentTarget);

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(Object.fromEntries(formData.entries())),
		});

		setIsLoading(false);

		if (response?.ok) {
			return router.push('/login');
		}

		const body = await response.json();

		if (response.status === 500) {
			return toast.error(body.error);
		}

		setErrors(body.errors);
	}

	return (
		<div>
			<Toaster />

			<form
				onSubmit={handleSubmit}
				className="space-y-6 rounded-md bg-white p-6 shadow sm:mx-auto sm:w-full sm:max-w-sm"
			>
				<div>
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						autoComplete="name"
						disabled={isLoading}
						required
					/>
					<Errors errors={errors?.name?._errors} />
				</div>
				<div>
					<Label htmlFor="username">Username</Label>
					<Input
						type="text"
						id="username"
						autoComplete="username"
						disabled={isLoading}
						required
					/>
					<Errors errors={errors?.username?._errors} />
				</div>
				<div>
					<Label htmlFor="password">Password</Label>
					<Input
						type="password"
						id="password"
						autoComplete="new-password"
						disabled={isLoading}
						required
					/>
					<Errors errors={errors?.password?._errors} />
				</div>
				<LoadingButton type="submit" className="w-full" disabled={isLoading}>
					Register
				</LoadingButton>
			</form>
		</div>
	);
}
