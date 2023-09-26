import { ComponentPropsWithRef, forwardRef } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';

const TextArea = forwardRef<
	HTMLTextAreaElement,
	ComponentPropsWithRef<typeof ReactTextareaAutosize>
>(function TextArea(props, ref) {
	const { className, ...rest } = props;

	return (
		<ReactTextareaAutosize
			ref={ref}
			{...rest}
			className={`block w-full resize-none overflow-hidden border-b-2 border-transparent py-2 focus:border-gray-300 focus:outline-none disabled:cursor-not-allowed ${className}`}
		></ReactTextareaAutosize>
	);
});

export default TextArea;
