import type { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from './form';

export const metadata: Metadata = {
	title: 'Register',
	description: 'Create an account to get started.',
};

export default function RegisterPage() {
	return (
		<div>
			<RegisterForm />

			<p className="mt-10 text-center text-sm text-gray-500">
				Already have an account?{' '}
				<Link
					href="/login"
					className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
				>
					Sign in instead
				</Link>
			</p>
		</div>
	);
}
