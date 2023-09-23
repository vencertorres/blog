export default function Button({
	type = 'button',
	className,
	disabled = false,
	children,
}: {
	type?: 'submit' | 'reset' | 'button';
	className?: string;
	disabled?: boolean;
	children: React.ReactNode;
}) {
	return (
		<button
			type={type}
			className={
				'inline-flex items-center justify-center rounded-md bg-sky-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:pointer-events-none disabled:opacity-50 ' +
				className
			}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
