import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions);

	if (session) redirect('/');
	return (
		<main className="flex min-h-screen flex-1 flex-col justify-center bg-gray-50">
			{children}
		</main>
	);
}
