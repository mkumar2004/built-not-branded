export type AuthSession = { access_token: string; [key: string]: unknown };
export type AuthRole = "candidate" | "recruiter";

export type AuthResponse = {
  message?: string;
  user?: Record<string, unknown>;
  session?: AuthSession | null;
  role?: AuthRole | null;
};

function getApiUrl() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
  if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  return baseUrl;
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${getApiUrl()}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });
  const data = response.status === 204 ? {} : await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      (typeof data.message === "string" && data.message) ||
      (typeof data.error === "string" && data.error) ||
      "Something went wrong. Please try again.";
    throw new Error(message);
  }
  return data as T;
}

export function signUp(email: string, password: string, role: AuthRole) {
  return apiFetch<AuthResponse>("/api/auth/signup", { method: "POST", body: JSON.stringify({ email, password, role }) });
}

export function login(email: string, password: string) {
  return apiFetch<AuthResponse>("/api/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
}

export function forgotPassword(email: string) {
  return apiFetch<AuthResponse>("/api/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
}

export function verifyResetOtp(email: string, otp: string, password: string) {
  return apiFetch<AuthResponse>("/api/auth/verify-reset-otp", { method: "POST", body: JSON.stringify({ email, otp, password }) });
}