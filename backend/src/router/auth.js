import express from "express";
import { getSupabaseAdminClient, getSupabaseAuthClient, toSafeUser } from "../lib/supabaseAuth.js";
import { sendAuthEmail } from "../lib/mailer.js";

const router = express.Router();
const VALID_ROLES = new Set(["candidate", "recruiter"]);

function validateSignup({ email, password, role }) {
  if (typeof email !== "string" || !email.trim()) return "email is required";
  if (typeof password !== "string" || password.length < 8) return "password must be at least 8 characters";
  if (!VALID_ROLES.has(role)) return "role must be either candidate or recruiter";
  return null;
}

function validateLogin({ email, password }) {
  if (typeof email !== "string" || !email.trim()) return "email is required";
  if (typeof password !== "string" || !password) return "password is required";
  return null;
}

function sendAuthError(res, error, fallbackStatus = 400) {
  const status = error.statusCode || error.status || fallbackStatus;
  res.status(status).json({ error: error.message || "Authentication request failed" });
}

async function upsertProfile({ id, email, role }) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin.from("profiles").upsert({ id, email, role }, { onConflict: "id" }).select().single();
  if (error) throw error;
  return data;
}

async function getProfile(id) {
  const admin = getSupabaseAdminClient();
  const { data, error } = await admin.from("profiles").select("*").eq("id", id).single();
  if (error) throw error;
  return data;
}

// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  const validationError = validateSignup(req.body || {});
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const { email, password, role } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    const { data: createData, error: createError } = await getSupabaseAdminClient().auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
    });
    if (createError) return sendAuthError(res, createError);

    const profile = await upsertProfile({ id: createData.user.id, email: normalizedEmail, role });

    const { data: signInData, error: signInError } = await getSupabaseAuthClient().auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });
    if (signInError) return sendAuthError(res, signInError, 500);

    res.status(201).json({ user: toSafeUser(signInData.user), session: signInData.session, role: profile.role });
  } catch (error) {
    sendAuthError(res, error, 500);
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const validationError = validateLogin(req.body || {});
  if (validationError) return res.status(400).json({ error: validationError });

  try {
    const { email, password } = req.body;
    const { data, error } = await getSupabaseAuthClient().auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error) return sendAuthError(res, error, 401);

    const profile = await getProfile(data.user.id);
    res.json({ user: toSafeUser(data.user), session: data.session, role: profile?.role ?? null });
  } catch (error) {
    sendAuthError(res, error, 500);
  }
});

// POST /api/auth/forgot-password — sends a 6-digit OTP, not a link
router.post("/forgot-password", async (req, res) => {
  const email = req.body?.email;
  if (typeof email !== "string" || !email.trim()) return res.status(400).json({ error: "email is required" });

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const { data, error } = await getSupabaseAdminClient().auth.admin.generateLink({
      type: "recovery",
      email: normalizedEmail,
    });

    if (!error && data?.properties?.email_otp) {
      await sendAuthEmail({
        to: normalizedEmail,
        subject: "Your SkillFit password reset code",
        heading: "Reset your password",
        message: `Use this code to reset your password: ${data.properties.email_otp}. It expires shortly. If you didn't request this, you can ignore this email.`,
      });
    }

    res.status(202).json({ message: "If an account exists, a reset code has been sent." });
  } catch (error) {
    sendAuthError(res, error, 500);
  }
});

// POST /api/auth/verify-reset-otp — verifies the code and sets the new password, all in one call
router.post("/verify-reset-otp", async (req, res) => {
  const { email, otp, password } = req.body || {};
  if (typeof email !== "string" || !email.trim()) return res.status(400).json({ error: "email is required" });
  if (typeof otp !== "string" || !otp.trim()) return res.status(400).json({ error: "otp is required" });
  if (typeof password !== "string" || password.length < 8) return res.status(400).json({ error: "password must be at least 8 characters" });

  const normalizedEmail = email.trim().toLowerCase();

  try {
    const { data, error } = await getSupabaseAuthClient().auth.verifyOtp({
      email: normalizedEmail,
      token: otp.trim(),
      type: "recovery",
    });
    if (error) return sendAuthError(res, error, 401);

    const { error: updateError } = await getSupabaseAdminClient().auth.admin.updateUserById(data.user.id, { password });
    if (updateError) return sendAuthError(res, updateError, 500);

    res.json({ message: "Password updated. You can now log in." });
  } catch (error) {
    sendAuthError(res, error, 500);
  }
});

export default router;