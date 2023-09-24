import MainNav from '@/components/MainNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex min-h-screen flex-col bg-gray-50">
			<MainNav />
			<div className="flex flex-1 flex-col">{children}</div>
		</div>
	);
}
