import MainNav from '@/components/MainNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen bg-gray-50">
			<MainNav />
			{children}
		</div>
	);
}
