import ReactTextareaAutosize from 'react-textarea-autosize';

export default function TextArea({
	name,
	placeholder,
	defaultValue,
	disabled = false,
	required = false,
	className,
}: {
	name: string;
	placeholder?: string;
	defaultValue: string;
	disabled?: boolean;
	required?: boolean;
	className?: string;
}) {
	return (
		<ReactTextareaAutosize
			id={name}
			name={name}
			placeholder={placeholder}
			defaultValue={defaultValue}
			disabled={disabled}
			required={required}
			rows={1}
			className={
				'block w-full resize-none overflow-hidden border-b-2 border-transparent py-2 focus:border-gray-300 focus:outline-none disabled:cursor-not-allowed ' +
				className
			}
		></ReactTextareaAutosize>
	);
}
