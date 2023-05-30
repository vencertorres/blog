"use client";

import TextInput from "@/components/textinput";
import { SignUpSchema } from "@/lib/schemas";
import { SignUpErrors, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function Form({
  signUp,
}: {
  signUp: (credentials: User) => Promise<void>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignUpErrors>();

  function action(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const result = SignUpSchema.safeParse(data);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }
    setErrors({ formErrors: [], fieldErrors: {} });

    setLoading(true);

    toast.promise(signUp(result.data), {
      loading: "Signing up",
      success: () => {
        router.refresh();
        router.push("/signin");
        return "Success. Redirecting...";
      },
      error: (error) => {
        setLoading(false);
        return error.message;
      },
    });
  }

  return (
    <>
      <Toaster />

      <form action={action}>
        <TextInput
          name="name"
          type="text"
          state={loading}
          errors={errors?.fieldErrors?.name}
        />

        <TextInput
          name="email"
          type="email"
          state={loading}
          errors={errors?.fieldErrors?.email}
        />

        <TextInput
          name="password"
          type="password"
          state={loading}
          errors={errors?.fieldErrors?.password}
        />

        <TextInput
          name="confirm"
          type="password"
          state={loading}
          errors={errors?.fieldErrors?.confirm}
        />

        <button className="btn-primary btn-block btn mt-4" disabled={loading}>
          Sign in
        </button>
      </form>
    </>
  );
}
