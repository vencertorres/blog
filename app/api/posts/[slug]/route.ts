import { getCurrentUser } from '@/lib/auth';
import prisma from '@/lib/db';
import slugify from '@sindresorhus/slugify';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';

const UpdatePostSchema = z.object({
	title: z.string().trim().min(1, 'Required'),
	description: z.string().trim().min(1, 'Required'),
	content: z.any(),
	published: z.boolean().optional(),
});

export type UpdatePost = z.infer<typeof UpdatePostSchema>;

export async function PATCH(request: NextRequest, { params }: { params: { slug: string } }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const data = await request.json();

		const validated = UpdatePostSchema.parse(data);

		const post = await prisma.post.update({
			where: {
				slug: params.slug,
			},
			data: {
				slug: slugify(validated.title + ' ' + Date.now()),
				title: validated.title,
				description: validated.description,
				content: validated.content,
				published: validated.published,
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

export async function DELETE(request: NextRequest, { params }: { params: { slug: string } }) {
	const user = await getCurrentUser();

	if (!user) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		await prisma.post.delete({
			where: {
				slug: params.slug,
			},
		});

		return NextResponse.json(null);
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
