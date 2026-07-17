"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { KeyRound, Send, CheckCircle2 } from "lucide-react";
import AuthCard from "../../auth/components/AuthCard";
import ErrorText from "../../auth/components/ErrorText";
import FormButton from "../../auth/components/FormButton";
import FormInput from "../../auth/components/FormInput";
import { forgotPassword, verifyResetOtp } from "../../lib/api/auth";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState<"email" | "otp" | "done">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await forgotPassword(email);
      setStep("otp");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to send a reset code.");
    } finally {
      setLoading(false);
    }
  }

  async function submitOtp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");
    setLoading(true);
    try {
      await verifyResetOtp(email, otp, password);
      setStep("done");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to reset your password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Forgot password" subtitle="We'll email you a 6-digit code.">
      {step === "email" ? (
        <form onSubmit={submitEmail} className="space-y-5">
          <FormInput label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
          {error ? <ErrorText>{error}</ErrorText> : null}
          <FormButton loading={loading}><Send className="h-4 w-4" /> Send Reset Code</FormButton>
          <p className="text-center text-sm text-slate-500">Remembered it? <Link className="font-semibold text-indigo-600 hover:text-indigo-700" href="/login">Log in</Link></p>
        </form>
      ) : null}

      {step === "otp" ? (
        <form onSubmit={submitOtp} className="space-y-5">
          <p className="text-sm text-slate-500">Enter the 6-digit code sent to <span className="font-semibold text-slate-700">{email}</span>, then choose a new password.</p>
          <FormInput label="Reset code" type="text" inputMode="numeric" maxLength={6} value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="123456" required />
          <FormInput label="New password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a new password" required />
          <FormInput label="Confirm new password" type="password" autoComplete="new-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your new password" required />
          {error ? <ErrorText>{error}</ErrorText> : null}
          <FormButton loading={loading}><KeyRound className="h-4 w-4" /> Update Password</FormButton>
          <p className="text-center text-sm text-slate-500">Didn't get a code? <button type="button" onClick={() => setStep("email")} className="font-semibold text-indigo-600 hover:text-indigo-700">Try again</button></p>
        </form>
      ) : null}

      {step === "done" ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
          <CheckCircle2 className="mb-3 h-6 w-6" />
          <p className="font-semibold">Password updated</p>
          <p className="mt-1 text-sm text-emerald-700">You can now log in with your new password.</p>
          <Link className="mt-4 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700" href="/login">Back to login</Link>
        </div>
      ) : null}
    </AuthCard>
  );
}