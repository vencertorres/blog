export default function Errors({ errors }: { errors: string[] | undefined }) {
	if (!errors?.length) return null;
	return (
		<div>
			{errors.map((error) => (
				<p key={error} className="mt-1 text-sm text-red-500">
					{error}
				</p>
			))}
		</div>
	);
}
