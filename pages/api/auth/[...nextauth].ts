import prisma from '@/lib/db';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { z } from 'zod';

const schema = z.object({
	username: z.string().trim().min(1),
	password: z.string().trim().min(1),
});

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			credentials: {
				username: { label: 'Username', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const validated = schema.safeParse(credentials);

				if (!validated.success) {
					throw new Error('Missing username or password');
				}

				const user = await prisma.user.findUnique({
					where: {
						username: validated.data.username,
					},
				});

				if (!user || !(await compare(validated.data.password, user.password))) {
					throw new Error('Invalid username or password');
				}

				const { password, ...rest } = user;
				return rest;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
				token.username = user.username;
			}

			return token;
		},
		async session({ session, token }) {
			delete session.user.email;
			delete session.user.image;

			session.user.id = token.id;
			session.user.username = token.username;

			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

export default NextAuth(authOptions);
