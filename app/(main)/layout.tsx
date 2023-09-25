import Nav from '@/components/Nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen">
			<Nav />
			<main className="mt-16 flex flex-1 flex-col px-6 py-12">{children}</main>
		</div>
	);
}
