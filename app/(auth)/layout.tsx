export default async function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="flex min-h-screen flex-1 flex-col justify-center bg-gray-50">
			{children}
		</main>
	);
}
