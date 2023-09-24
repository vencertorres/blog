import { ChangeEvent } from 'react';

export default function TextArea({
	name,
	ariaLabel,
	placeholder,
	defaultValue,
	disabled = false,
	required = false,
	className,
}: {
	name: string;
	ariaLabel: string;
	placeholder?: string;
	defaultValue: string;
	disabled?: boolean;
	required?: boolean;
	className?: string;
}) {
	function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.style.height = '0';
		event.target.style.height = event.target.scrollHeight + 'px';
	}

	return (
		<textarea
			name={name}
			aria-label={ariaLabel}
			placeholder={placeholder}
			defaultValue={defaultValue}
			disabled={disabled}
			required={required}
			rows={1}
			onChange={handleChange}
			className={
				'block w-full resize-none overflow-hidden border-b-2 border-transparent py-2 focus:border-gray-300 focus:outline-none disabled:cursor-not-allowed ' +
				className
			}
		></textarea>
	);
}
