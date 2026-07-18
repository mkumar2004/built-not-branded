import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.resolve(__dirname, "../../.env") });

let authClient = null;
let adminClient = null;

function getAuthConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    const error = new Error(
      "Supabase authentication is not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY."
    );
    error.statusCode = 503;
    throw error;
  }

  return { url, anonKey };
}

export function getSupabaseAuthClient() {
  if (!authClient) {
    const { url, anonKey } = getAuthConfig();
    authClient = createClient(url, anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return authClient;
}

export function getSupabaseAdminClient() {
  if (!adminClient) {
    const { url } = getAuthConfig();
    const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!secretKey) {
      const error = new Error(
        "Supabase admin authentication is not configured. Set SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY."
      );
      error.statusCode = 503;
      throw error;
    }

    adminClient = createClient(url, secretKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    });
  }

  return adminClient;
}

export function getSupabaseAuthConfig() {
  return getAuthConfig();
}

export function getBearerToken(authorization = "") {
  const [scheme, token] = authorization.trim().split(/\s+/, 2);
  return scheme?.toLowerCase() === "bearer" && token ? token : null;
}

export function toSafeUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.user_metadata?.role || "candidate",
    email_confirmed_at: user.email_confirmed_at || null,
    created_at: user.created_at,
  };
}

export async function getUserFromToken(token) {
  const client = getSupabaseAuthClient();
  const { data, error } = await client.auth.getUser(token);
  if (error) throw error;
  return data.user ? toSafeUser(data.user) : null;
}