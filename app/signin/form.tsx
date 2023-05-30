"use client";

import TextInput from "@/components/textinput";
import { SignInSchema } from "@/lib/schemas";
import { SignInErrors } from "@/lib/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SignInErrors>();

  function action(formData: FormData) {
    const data = Object.fromEntries(formData.entries());

    const result = SignInSchema.safeParse(data);

    if (!result.success) {
      return setErrors(result.error.flatten());
    }
    setErrors({ formErrors: [], fieldErrors: {} });

    setLoading(true);

    toast.promise(
      signIn("credentials", {
        redirect: false,
        ...data,
      }).then((result) => {
        if (result?.error) {
          throw new Error(result?.error);
        }
      }),
      {
        loading: "Signing in",
        success: () => {
          router.refresh();
          router.push("/signin");
          return "Success. Redirecting...";
        },
        error: (error) => {
          setLoading(false);
          return error.message;
        },
      }
    );
  }

  return (
    <>
      <Toaster />

      <form action={action}>
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

        <div className="space-y-4">
          <button className="btn-primary btn-block btn mt-4" disabled={loading}>
            Sign in
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="link-hover link font-bold">
              Sign up
            </Link>{" "}
            for free.
          </p>
        </div>
      </form>
    </>
  );
}
