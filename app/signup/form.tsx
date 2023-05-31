"use client";

import Errors from "@/components/errors";
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
  const [show, setShow] = useState(false);
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
    <form action={action} className="space-y-2">
      <Toaster />

      <div className="form-control">
        <label htmlFor="name" className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="input-bordered input w-full"
          disabled={loading}
        />
        <Errors errors={errors?.fieldErrors?.name} />
      </div>

      <div className="form-control">
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

      <div className="form-control">
        <label htmlFor="password" className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="input-group">
          <input
            type={show ? "text" : "password"}
            name="password"
            id="password"
            className="input-bordered input w-full"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="swap btn-square btn"
          >
            {show ? "Hide" : "Show"}
          </button>
        </div>
        <label className="label">
          <span className="label-text-alt">
            Must be at least 8 characters long
          </span>
        </label>
      </div>

      <button className="btn-block btn" disabled={loading}>
        Sign in
      </button>
    </form>
  );
}
