"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { completeCandidateProfile, type AuthSession } from "../../../lib/api/auth";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

function getAccessTokenFromUrl() {
  const queryToken = new URLSearchParams(window.location.search).get("access_token");
  const hashToken = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("access_token");
  return queryToken || hashToken;
}

export default function CandidateCallbackPage() {
  const [error, setError] = useState("");
  const { setSession } = useAuth();
  const router = useRouter();

  useEffect(() => {
    async function completeLogin() {
      const accessToken = getAccessTokenFromUrl();
      if (!accessToken) {
        setError("Your login link is missing an access token. Please request a new link.");
        return;
      }
      try {
        const response = await completeCandidateProfile(accessToken);
        setSession({ access_token: accessToken } as AuthSession, response.profile ?? null, "candidate");
        router.replace("/candidate");
      } catch (requestError) {
        setError(requestError instanceof Error ? requestError.message : "We could not complete your sign in.");
      }
    }
    void completeLogin();
  }, [router, setSession]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
        {error ? <><h1 className="text-xl font-bold text-slate-900">Sign in could not be completed</h1><p className="mt-3 text-slate-600">{error}</p><Link className="mt-6 inline-block font-semibold text-indigo-600 hover:text-indigo-700" href="/login">Back to login</Link></> : <><LoaderCircle className="mx-auto h-8 w-8 animate-spin text-indigo-600" /><h1 className="mt-4 text-xl font-bold text-slate-900">Signing you in...</h1><p className="mt-2 text-slate-500">We’re securely setting up your candidate profile.</p></>}
      </section>
    </main>
  );
}
