export default function Input({
	type,
	id,
	autoComplete = 'off',
	required = false,
	disabled = false,
}: {
	type: string;
	id: string;
	autoComplete?: string;
	required?: boolean;
	disabled?: boolean;
}) {
	return (
		<input
			type={type}
			name={id}
			id={id}
			autoComplete={autoComplete}
			required={required}
			disabled={disabled}
			className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none"
		/>
	);
}
