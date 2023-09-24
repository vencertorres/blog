import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);
	return session?.user;
}
