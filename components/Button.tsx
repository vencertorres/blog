import { MouseEvent } from 'react';

export interface ButtonProps {
	type?: 'submit' | 'reset' | 'button';
	variant?: 'normal' | 'light' | 'destructive';
	disabled?: boolean;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => any;
	className?: string;
	children: React.ReactNode;
}

const variants = {
	normal: 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white',
	light: 'bg-gray-200 hover:bg-gray-300 focus-visible:outline-gray-600 text-gray-900',
	destructive: 'bg-red-500 hover:bg-red-600 focus-visible:outline-red-600 text-white',
};

export default function Button({
	type = 'button',
	variant = 'normal',
	disabled = false,
	onClick,
	className,
	children,
}: ButtonProps) {
	return (
		<button
			type={type}
			disabled={disabled}
			onClick={onClick}
			className={`inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
}
