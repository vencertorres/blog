import MainNav from '@/components/MainNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col">
			<MainNav />
			<main className="flex flex-1 flex-col px-6 py-12">{children}</main>
		</div>
	);
}
