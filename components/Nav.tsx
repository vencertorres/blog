import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import UserNav from './UserNav';

export default async function Nav() {
	const user = await getCurrentUser();

	return (
		<nav className="fixed top-0 z-10 w-screen border-b bg-white px-6">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<Link href="/" className="text-xl font-bold text-gray-900">
					Blog.
				</Link>
				{user ? <UserNav user={user} /> : <Link href="/login">Log in</Link>}
			</div>
		</nav>
	);
}
