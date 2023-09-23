export default function Label({
	htmlFor,
	children,
}: {
	htmlFor: string;
	children: React.ReactNode;
}) {
	return (
		<label htmlFor={htmlFor} className="block text-sm font-medium leading-6 text-gray-900">
			{children}
		</label>
	);
}
