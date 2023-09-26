import { forwardRef } from 'react';

const variants = {
	primary: 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 text-white font-semibold',
	secondary:
		'bg-gray-200 hover:bg-gray-300 focus-visible:outline-gray-600 text-gray-900 font-semibold',
	destructive:
		'bg-red-500 hover:bg-red-600 focus-visible:outline-red-600 text-white font-semibold',
	link: 'hover:underline',
};

export type ButtonProps = JSX.IntrinsicElements['button'] & {
	variant?: 'primary' | 'secondary' | 'destructive' | 'link';
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props, ref) {
	const { className, children, variant = 'primary', ...rest } = props;

	const _className = `inline-flex items-center justify-center rounded-md px-3 py-1.5 text-sm leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`;

	return (
		<button ref={ref} className={_className} {...rest}>
			{children}
		</button>
	);
});

export default Button;
