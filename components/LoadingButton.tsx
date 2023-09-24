import { Loader2 } from 'lucide-react';
import Button, { ButtonProps } from './Button';

export function LoadingButton(props: ButtonProps) {
	const { children, disabled, ...rest } = props;
	return (
		<Button {...rest} disabled={disabled}>
			{disabled && <Loader2 className="mr-1 h-4 w-4 animate-spin" aria-hidden="true" />}
			{children}
		</Button>
	);
}
