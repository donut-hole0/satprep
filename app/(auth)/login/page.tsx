import { AuthForm } from "@/components/auth/AuthForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { confirm?: string };
}) {
  return (
    <>
      {searchParams.confirm && (
        <p className="mb-4 rounded bg-accent-blue/10 px-3 py-2 text-center text-[13px] text-accent-blue-light">
          Check your email to confirm your account, then log in.
        </p>
      )}
      <AuthForm mode="login" />
    </>
  );
}
