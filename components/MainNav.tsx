import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import UserNav from './UserNav';

export default async function MainNav() {
	const session = await getServerSession(authOptions);

	return (
		<nav className="border-b">
			<div className="container mx-auto flex h-16 items-center justify-between">
				<Link href="/">Blog.</Link>
				{session ? <UserNav user={session.user} /> : <Link href="/login">Log in</Link>}
			</div>
		</nav>
	);
}
