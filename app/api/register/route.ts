import prisma from '@/lib/db';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { hash } from 'bcrypt';
import { NextResponse, type NextRequest } from 'next/server';
import { ZodError, z } from 'zod';

const schema = z.object({
	name: z.string().trim().min(1, 'Required'),
	username: z.string().trim().min(1, 'Required'),
	password: z.string().trim().min(8, 'Required'),
});

export type FieldErrors = z.inferFormattedError<typeof schema>;

export async function POST(request: NextRequest) {
	try {
		const data = await request.json();

		const validated = schema.parse(data);

		await prisma.user.create({
			data: {
				name: validated.name,
				username: validated.username,
				password: await hash(validated.password, 10),
			},
		});

		return NextResponse.json(null, { status: 201 });
	} catch (error) {
		if (error instanceof ZodError) {
			return NextResponse.json({ errors: error.format() }, { status: 400 });
		}

		if (error instanceof PrismaClientKnownRequestError) {
			return NextResponse.json(
				{ errors: { username: { _errors: ['Username already taken'] } } },
				{ status: 400 },
			);
		}

		return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
	}
}
