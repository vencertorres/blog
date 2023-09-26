import { Loader2 } from 'lucide-react';
import { ComponentPropsWithRef } from 'react';
import Button from './Button';

export default function LoadingButton(props: ComponentPropsWithRef<typeof Button>) {
	const { children, ...rest } = props;

	return (
		<Button {...rest}>
			{props.disabled && <Loader2 className="mr-1 h-4 w-4 animate-spin" aria-hidden="true" />}
			{children}
		</Button>
	);
}
