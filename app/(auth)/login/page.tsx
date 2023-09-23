import type { Metadata } from 'next';
import Link from 'next/link';
import LoginForm from './form';

export const metadata: Metadata = {
	title: 'Login',
	description: 'Login to your account.',
};

export default function LoginPage() {
	return (
		<div>
			<LoginForm />

			<p className="mt-10 text-center text-sm text-gray-500">
				Don&apos;t have an account?{' '}
				<Link
					href="/register"
					className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
				>
					Sign up instead
				</Link>
			</p>
		</div>
	);
}
