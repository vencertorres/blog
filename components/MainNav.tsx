import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';
import UserNav from './UserNav';

export default async function MainNav() {
	const user = await getCurrentUser();

	return (
		<nav className="border-b bg-white px-6">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<Link href="/">Blog.</Link>
				{user ? <UserNav user={user} /> : <Link href="/login">Log in</Link>}
			</div>
		</nav>
	);
}
