"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { login, signup, type AuthState } from "@/app/(auth)/actions";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-1 w-full rounded-cta py-2.5 text-[14px] font-semibold text-panel transition-[filter] duration-150 ease-standard hover:brightness-90 disabled:opacity-60"
      style={{ backgroundColor: "var(--brand)" }}
    >
      {pending ? "Please wait…" : label}
    </button>
  );
}

const field =
  "w-full rounded bg-panel px-3 py-2.5 text-[14px] text-ink-body placeholder:text-ink-muted outline-none ring-1 ring-line-subtle/60 focus:ring-2 focus:ring-accent-blue";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const action = mode === "login" ? login : signup;
  const [state, formAction] = useFormState<AuthState, FormData>(action, null);

  return (
    <div className="rounded-card border border-line-subtle/50 bg-canvas p-6">
      <h1 className="text-xl font-bold text-ink-primary">
        {mode === "login" ? "Welcome back" : "Create your account"}
      </h1>
      <p className="mb-5 mt-1 text-[13px] text-ink-muted">
        {mode === "login"
          ? "Log in to continue your prep."
          : "Start tracking your practice and scores."}
      </p>

      <form action={formAction} className="space-y-3">
        {mode === "signup" && (
          <input
            name="firstName"
            type="text"
            placeholder="First name"
            autoComplete="given-name"
            className={field}
          />
        )}
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          autoComplete="email"
          className={field}
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          className={field}
        />

        {state?.error && (
          <p className="rounded bg-accent-red/10 px-3 py-2 text-[13px] text-accent-red">
            {state.error}
          </p>
        )}

        <SubmitButton label={mode === "login" ? "Log in" : "Sign up"} />
      </form>

      <p className="mt-5 text-center text-[13px] text-ink-muted">
        {mode === "login" ? (
          <>
            New here?{" "}
            <Link href="/signup" className="text-accent-blue-light hover:underline">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-accent-blue-light hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
