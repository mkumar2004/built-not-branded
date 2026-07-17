"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { LogIn } from "lucide-react";
import AuthCard from "../../auth/components/AuthCard";
import ErrorText from "../../auth/components/ErrorText";
import FormButton from "../../auth/components/FormButton";
import FormInput from "../../auth/components/FormInput";
import { login } from "../../lib/api/auth";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setSession } = useAuth();
  const router = useRouter();

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await login(email, password);
      if (!response.session || !response.role) throw new Error("No session was returned. Please try again.");
      setSession(response.session, response.user ?? null, response.role);
      router.push(response.role === "candidate" ? "/candidate" : "/recruiter");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to log in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Login" subtitle="Enter your account details to continue.">
      <form onSubmit={submit} className="space-y-5">
        <FormInput label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
        <FormInput label="Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
        <div className="-mt-3 text-right">
          <Link className="text-sm font-semibold text-indigo-600 hover:text-indigo-700" href="/forgot-password">Forgot password?</Link>
        </div>
        {error ? <ErrorText>{error}</ErrorText> : null}
        <FormButton loading={loading}><LogIn className="h-4 w-4" /> Log In</FormButton>
        <p className="text-center text-sm text-slate-500">New here? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" href="/signup">Create an account</Link></p>
      </form>
    </AuthCard>
  );
}