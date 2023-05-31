"use client";

import Errors from "@/components/errors";
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
    <form action={action}>
      <Toaster />

      <div className="form-control mt-2">
        <label htmlFor="email" className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="input-bordered input w-full"
          disabled={loading}
        />
        <Errors errors={errors?.fieldErrors?.email} />
      </div>

      <div className="form-control mt-2">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="input-bordered input w-full"
          disabled={loading}
        />
        <Errors errors={errors?.fieldErrors?.password} />
      </div>

      <div className="mt-6 space-y-2">
        <button className="btn-block btn" disabled={loading}>
          Sign in
        </button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="link-hover link font-bold">
            Sign up
          </Link>{" "}
          for free.
        </p>
      </div>
    </form>
  );
}
