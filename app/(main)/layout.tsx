import Nav from '@/components/Nav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Nav />
			<main className="mt-16">{children}</main>
		</div>
	);
}
