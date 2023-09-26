import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import slugify from '@sindresorhus/slugify';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';

const NewPost = z.object({
	title: z.string().trim().min(1, 'Required'),
});

export async function POST(request: NextRequest) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const data = await request.json();

		const validated = NewPost.parse(data);

		const post = await prisma.post.create({
			data: {
				slug: slugify(validated.title + ' ' + Date.now()),
				title: validated.title,
				author_id: user.id,
			},
		});

		return NextResponse.json({ slug: post.slug });
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json({ errors: error.format() }, { status: 400 });
		}

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
