export default function Errors({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <label className="label">
      <div className="label-text-alt text-red-500">
        {errors.map((error) => (
          <p key={error}>{error}</p>
        ))}
      </div>
    </label>
  );
}
