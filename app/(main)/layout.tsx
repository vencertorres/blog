import MainNav from '@/components/MainNav';

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<MainNav />
			{children}
		</div>
	);
}
