
import { createClient } from "@supabase/supabase-js";
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
  console.warn("[supabase] Missing SUPABASE_URL or SUPABASE_SECRET_KEY in .env");
}

// Secret key = full server-side access, bypasses RLS.
// Safe here because this file only ever runs on the backend, never the browser.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

export default supabase;

