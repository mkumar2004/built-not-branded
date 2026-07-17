"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { BriefcaseBusiness, UserRound } from "lucide-react";
import AuthCard from "../../auth/components/AuthCard";
import ErrorText from "../../auth/components/ErrorText";
import FormButton from "../../auth/components/FormButton";
import FormInput from "../../auth/components/FormInput";
import { signUp, type AuthRole } from "../../lib/api/auth";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

type FieldErrors = { email?: string; password?: string; confirmPassword?: string };

export default function SignupPage() {
  const [role, setRole] = useState<AuthRole>("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [requestError, setRequestError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuth();
  const router = useRouter();

  function validate() {
    const nextErrors: FieldErrors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (password.length < 8) nextErrors.password = "Password must be at least 8 characters.";
    if (password !== confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestError("");
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await signUp(email, password, role);
      if (!response.session || !response.role) throw new Error("No session was returned. Please try again.");
      setSession(response.session, response.user ?? null, response.role);
      router.push(response.role === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard");
    } catch (requestError) {
      setRequestError(requestError instanceof Error ? requestError.message : "Unable to create your account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Sign up" subtitle="Create your account.">
      <div className="mb-6 grid grid-cols-2 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Account type">
        {(["candidate", "recruiter"] as AuthRole[]).map((tab) => {
          const active = role === tab;
          const Icon = tab === "candidate" ? UserRound : BriefcaseBusiness;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setRole(tab)}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${active ? (tab === "candidate" ? "bg-white text-indigo-700 shadow-sm" : "bg-white text-emerald-700 shadow-sm") : "text-slate-500"}`}
            >
              <Icon className="h-4 w-4" />
              {tab === "candidate" ? "Candidate" : "Recruiter"}
            </button>
          );
        })}
      </div>

      <form onSubmit={submit} className="space-y-5">
        <FormInput label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" error={errors.email} required />
        <FormInput label="Password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" error={errors.password} required />
        <FormInput label="Confirm password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" error={errors.confirmPassword} required />
        {requestError ? <ErrorText>{requestError}</ErrorText> : null}
        <FormButton loading={loading}><UserRound className="h-4 w-4" /> Create Account</FormButton>
        <p className="text-center text-sm text-slate-500">Already have an account? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" href="/login">Log in</Link></p>
      </form>
    </AuthCard>
  );
}