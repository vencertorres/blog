import Errors from "./errors";

export default function TextInput({
  name,
  type,
  state,
  errors,
}: {
  name: string;
  type: "text" | "email" | "password";
  state: boolean;
  errors?: string[];
}) {
  return (
    <>
      <label htmlFor={name} className="label">
        <span className="label-text capitalize">{name}</span>
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="input-bordered input w-full"
        disabled={state}
      />
      <Errors errors={errors} />
    </>
  );
}
