"use client"
import React, { useState, useCallback, useMemo, useEffect } from "react";

/* ------------------------------------------------------------------------
   SkillFit — Submission Page
   A premium, evidence-first submission experience for an AI hiring
   platform. Built as a single self-contained component: layout via
   Tailwind's core utilities, all bespoke tokens (color / glow / motion)
   live in the scoped <style> block below since arbitrary-value Tailwind
   classes aren't available in this environment.
------------------------------------------------------------------------- */

interface FormState {
  fullName: string;
  email: string;
  targetRole: string;
  experience: string;
  repoLinks: string[];
}

type SubmitStatus = "idle" | "evaluating" | "done";

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "AI Engineer",
  "Full Stack Developer",
];

const EXPERIENCE_OPTIONS = ["Fresher", "0–1 Years", "1–3 Years", "3+ Years"];

interface Particle {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 4,
  }));
}

export default function SkillFitSubmission() {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    email: "",
    targetRole: "",
    experience: "",
    repoLinks: [""],
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string>("");
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [particles, setParticles] = useState<Particle[]>([]);

  // Generate particle positions only after mount. Doing this at module
  // scope or during the initial render would make the server-rendered
  // markup (one set of random values) diverge from the client's first
  // render (a different set), which React flags as a hydration mismatch.
  // Starting from an empty array keeps the SSR and first-client-render
  // markup identical; the particles then populate in a harmless
  // post-hydration update.
  useEffect(() => {
    setParticles(generateParticles(26));
  }, []);

  const updateField = useCallback(
    (key: keyof Omit<FormState, "repoLinks">) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((prev) => ({ ...prev, [key]: e.target.value }));
      },
    []
  );

  const updateRepoLink = (index: number, value: string) => {
    setForm((prev) => {
      const next = [...prev.repoLinks];
      next[index] = value;
      return { ...prev, repoLinks: next };
    });
  };

  const addRepoLink = () => {
    setForm((prev) => ({ ...prev, repoLinks: [...prev.repoLinks, ""] }));
  };

  const removeRepoLink = (index: number) => {
    setForm((prev) => ({
      ...prev,
      repoLinks: prev.repoLinks.filter((_, i) => i !== index),
    }));
  };

  const validateAndSetFile = (file: File | undefined) => {
    if (!file) return;
    if (file.type !== "application/pdf") {
      setFileError("Only PDF files are supported.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File exceeds the 5MB limit.");
      return;
    }
    setFileError("");
    setResumeFile(file);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateAndSetFile(e.target.files?.[0]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;
    setStatus("evaluating");
    window.setTimeout(() => setStatus("done"), 1600);
  };

  const buttonLabel = useMemo(() => {
    if (status === "evaluating") return "Sending to evaluation…";
    if (status === "done") return "Submitted for evaluation";
    return "Submit for AI Evaluation";
  }, [status]);

  return (
    <div className="sf-root">
      <style>{`
        .sf-root {
          --bg: #050816;
          --bg-elev: #070b1e;
          --border: #243c77;
          --border-soft: rgba(36, 60, 119, 0.55);
          --card: rgba(12, 18, 40, 0.55);
          --card-strong: rgba(14, 21, 46, 0.75);
          --input: rgba(6, 10, 24, 0.65);
          --text: #f5f7ff;
          --text-secondary: #98a4c8;
          --text-muted: #5f6b95;
          --blue: #4f7dff;
          --blue-strong: #2f5bff;
          --purple: #9b6bff;
          --glow: 0 0 0 1px var(--border-soft), 0 20px 60px -20px rgba(47, 91, 255, 0.25);

          position: relative;
          min-height: 100vh;
          width: 100%;
          background: var(--bg);
          color: var(--text);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          overflow-x: hidden;
          isolation: isolate;
        }
        .sf-root * { box-sizing: border-box; }

        .sf-display {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }

        /* ---------- background layers ---------- */
        .sf-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .sf-bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(to right, rgba(120, 140, 210, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(120, 140, 210, 0.05) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%);
        }
        .sf-bg-glow-a {
          position: absolute;
          top: -12%;
          left: 8%;
          width: 620px;
          height: 620px;
          background: radial-gradient(circle, rgba(79, 125, 255, 0.28) 0%, transparent 70%);
          filter: blur(10px);
        }
        .sf-bg-glow-b {
          position: absolute;
          top: 4%;
          right: -6%;
          width: 560px;
          height: 560px;
          background: radial-gradient(circle, rgba(155, 107, 255, 0.22) 0%, transparent 70%);
          filter: blur(10px);
        }
        .sf-bg-glow-c {
          position: absolute;
          bottom: -10%;
          left: 30%;
          width: 700px;
          height: 500px;
          background: radial-gradient(ellipse, rgba(47, 91, 255, 0.14) 0%, transparent 70%);
          filter: blur(20px);
        }
        .sf-particle {
          position: absolute;
          border-radius: 999px;
          background: #b9c6ff;
          opacity: 0.5;
          animation: sf-twinkle linear infinite;
        }
        @keyframes sf-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.75; transform: scale(1.5); }
        }

        /* ---------- shell ---------- */
        .sf-shell {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin: 0 auto;
          padding: 72px 24px 120px;
        }

        .sf-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-secondary);
          margin-bottom: 22px;
        }
        .sf-eyebrow-index {
          color: var(--blue);
          font-family: 'Space Grotesk', sans-serif;
        }
        .sf-eyebrow-dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: var(--text-muted);
        }

        .sf-hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
          margin-bottom: 64px;
        }
        .sf-heading {
          font-size: 48px;
          line-height: 1.08;
          font-weight: 600;
          margin: 0 0 20px;
          background: linear-gradient(180deg, #ffffff 30%, #b9c3e8 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .sf-desc {
          color: var(--text-secondary);
          font-size: 16px;
          line-height: 1.7;
          max-width: 460px;
          margin: 0;
        }
        .sf-desc strong { color: #c9d3f5; font-weight: 500; }

        /* ---------- illustration ---------- */
        .sf-illustration {
          position: relative;
          height: 340px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sf-ring {
          position: absolute;
          border-radius: 999px;
          border: 1px solid rgba(90, 120, 220, 0.25);
          animation: sf-pulse-ring 5s ease-in-out infinite;
        }
        .sf-ring-1 { width: 220px; height: 220px; }
        .sf-ring-2 { width: 300px; height: 300px; animation-delay: 0.6s; border-color: rgba(150, 110, 255, 0.18); }
        .sf-ring-3 { width: 380px; height: 380px; animation-delay: 1.2s; border-color: rgba(90, 120, 220, 0.12); }
        @keyframes sf-pulse-ring {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.04); }
        }
        .sf-platform {
          position: absolute;
          bottom: 18px;
          width: 220px;
          height: 40px;
          border-radius: 999px;
          background: radial-gradient(ellipse, rgba(79, 125, 255, 0.35) 0%, transparent 75%);
          filter: blur(2px);
        }
        .sf-folder {
          position: relative;
          z-index: 2;
          animation: sf-float 5s ease-in-out infinite;
          filter: drop-shadow(0 20px 40px rgba(47, 91, 255, 0.35));
        }
        @keyframes sf-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-14px); }
        }
        .sf-orbit-icon {
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--card-strong);
          border: 1px solid var(--border-soft);
          box-shadow: var(--glow);
          animation: sf-float 4.5s ease-in-out infinite;
          z-index: 3;
        }
        .sf-orbit-icon svg { width: 20px; height: 20px; }
        .sf-orbit-1 { top: 6%; left: 2%; animation-delay: 0.2s; }
        .sf-orbit-2 { top: 12%; right: 0%; animation-delay: 1.4s; }
        .sf-orbit-3 { bottom: 22%; right: -4%; animation-delay: 0.8s; }
        .sf-spark {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 999px;
          background: #cdd8ff;
          box-shadow: 0 0 10px 2px rgba(155, 180, 255, 0.9);
          animation: sf-twinkle 2.4s ease-in-out infinite;
        }

        /* ---------- glass cards ---------- */
        .sf-card {
          position: relative;
          background: var(--card);
          border: 1px solid var(--border-soft);
          border-radius: 24px;
          padding: 32px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: var(--glow);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          margin-bottom: 24px;
        }
        .sf-card:hover {
          transform: translateY(-3px);
          border-color: rgba(79, 125, 255, 0.55);
          box-shadow: 0 0 0 1px rgba(79, 125, 255, 0.35), 0 30px 70px -25px rgba(47, 91, 255, 0.4);
        }
        .sf-card-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0 0 24px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sf-card-title-bar {
          width: 3px;
          height: 16px;
          border-radius: 999px;
          background: linear-gradient(180deg, var(--blue), var(--purple));
        }

        .sf-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .sf-field { display: flex; flex-direction: column; gap: 8px; }
        .sf-label {
          font-size: 12.5px;
          font-weight: 500;
          color: var(--text-secondary);
        }

        .sf-input, .sf-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          background: var(--input);
          border: 1px solid rgba(90, 110, 180, 0.28);
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--text);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.4);
          transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
        }
        .sf-input::placeholder { color: var(--text-muted); }
        .sf-input:hover, .sf-select:hover { border-color: rgba(120, 145, 220, 0.45); }
        .sf-input:focus, .sf-select:focus, .sf-input:focus-visible, .sf-select:focus-visible {
          outline: none;
          border-color: var(--blue);
          box-shadow: inset 0 1px 3px rgba(0,0,0,0.4), 0 0 0 4px rgba(79, 125, 255, 0.18);
          background: rgba(9, 14, 32, 0.85);
        }
        .sf-select-wrap { position: relative; }
        .sf-select-wrap::after {
          content: "";
          position: absolute;
          right: 14px;
          top: 50%;
          width: 8px;
          height: 8px;
          border-right: 1.5px solid var(--text-secondary);
          border-bottom: 1.5px solid var(--text-secondary);
          transform: translateY(-65%) rotate(45deg);
          pointer-events: none;
        }
        .sf-select { padding-right: 36px; cursor: pointer; }
        .sf-select option { background: #0a0f24; color: var(--text); }

        /* ---------- repo links ---------- */
        .sf-repo-row {
          display: flex;
          gap: 10px;
          margin-bottom: 10px;
        }
        .sf-repo-row .sf-input { flex: 1; }
        .sf-repo-remove {
          width: 42px;
          flex-shrink: 0;
          background: var(--input);
          border: 1px solid rgba(90, 110, 180, 0.28);
          border-radius: 12px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sf-repo-remove:hover { color: #ff8b8b; border-color: rgba(255, 120, 120, 0.4); }

        .sf-add-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(79, 125, 255, 0.1);
          border: 1px solid rgba(79, 125, 255, 0.35);
          color: #a9c0ff;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 4px;
        }
        .sf-add-link:hover {
          background: rgba(79, 125, 255, 0.18);
          border-color: rgba(79, 125, 255, 0.6);
          transform: translateY(-1px);
        }

        /* ---------- upload zone ---------- */
        .sf-upload {
          position: relative;
          border: 1.5px dashed rgba(100, 130, 220, 0.4);
          border-radius: 18px;
          padding: 38px 20px;
          text-align: center;
          background: radial-gradient(ellipse at 50% 0%, rgba(79, 125, 255, 0.07), transparent 70%), var(--input);
          cursor: pointer;
          transition: border-color 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
          animation: sf-upload-pulse 4s ease-in-out infinite;
        }
        .sf-upload:hover { border-color: rgba(79, 125, 255, 0.7); }
        .sf-upload.sf-drag-active {
          border-color: var(--blue);
          background: rgba(79, 125, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(79, 125, 255, 0.15);
        }
        .sf-upload.sf-has-file {
          border-style: solid;
          border-color: rgba(84, 214, 150, 0.55);
          animation: none;
        }
        @keyframes sf-upload-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79, 125, 255, 0.12); }
          50% { box-shadow: 0 0 0 8px rgba(79, 125, 255, 0.03); }
        }
        .sf-upload-icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 14px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(79,125,255,0.25), rgba(155,107,255,0.2));
          border: 1px solid rgba(120, 145, 220, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .sf-upload-title { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 4px; }
        .sf-upload-sub { font-size: 12.5px; color: var(--text-muted); }
        .sf-upload-browse { color: #a9c0ff; text-decoration: underline; text-underline-offset: 2px; }
        .sf-upload-meta {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-top: 14px;
          font-size: 11.5px;
          color: var(--text-muted);
          letter-spacing: 0.04em;
        }
        .sf-upload-error { color: #ff9b9b; font-size: 12.5px; margin-top: 10px; }
        .sf-file-chip {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(84, 214, 150, 0.08);
          border: 1px solid rgba(84, 214, 150, 0.3);
          padding: 8px 14px;
          border-radius: 10px;
          font-size: 13px;
          color: #d3f5e4;
        }

        /* ---------- submit ---------- */
        .sf-submit {
          position: relative;
          width: 100%;
          border: none;
          border-radius: 14px;
          padding: 17px 24px;
          font-size: 15px;
          font-weight: 600;
          color: white;
          cursor: pointer;
          background: linear-gradient(100deg, var(--blue-strong), var(--purple), var(--blue-strong));
          background-size: 220% 100%;
          background-position: 0% 0%;
          box-shadow: 0 20px 45px -18px rgba(79, 125, 255, 0.55);
          transition: background-position 0.6s ease, transform 0.25s ease, box-shadow 0.25s ease, opacity 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }
        .sf-submit:hover:not(:disabled) {
          background-position: 100% 0%;
          transform: translateY(-2px);
          box-shadow: 0 26px 55px -16px rgba(79, 125, 255, 0.7);
        }
        .sf-submit:disabled { opacity: 0.85; cursor: default; }
        .sf-submit-arrow { transition: transform 0.3s ease; }
        .sf-submit:hover:not(:disabled) .sf-submit-arrow { transform: translateX(4px); }

        .sf-spinner {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          animation: sf-spin 0.8s linear infinite;
        }
        @keyframes sf-spin { to { transform: rotate(360deg); } }

        .sf-note {
          text-align: center;
          font-size: 12.5px;
          color: var(--text-muted);
          line-height: 1.7;
          margin-top: 20px;
          max-width: 480px;
          margin-left: auto;
          margin-right: auto;
        }

        /* ---------- responsive ---------- */
        @media (max-width: 900px) {
          .sf-hero { grid-template-columns: 1fr; gap: 28px; }
          .sf-illustration { order: 2; height: 260px; }
          .sf-heading { font-size: 34px; }
          .sf-grid-2 { grid-template-columns: 1fr; }
          .sf-shell { padding: 48px 18px 80px; }
          .sf-card { padding: 24px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .sf-root *, .sf-root *::before, .sf-root *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap"
      />

      {/* background */}
      <div className="sf-bg" aria-hidden="true">
        <div className="sf-bg-glow-a" />
        <div className="sf-bg-glow-b" />
        <div className="sf-bg-glow-c" />
        <div className="sf-bg-grid" />
        {particles.map((p) => (
          <span
            key={p.id}
            className="sf-particle"
            style={{
              top: `${p.top}%`,
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="sf-shell">
        {/* header */}
        <div className="sf-eyebrow">
          <span className="sf-eyebrow-index">02</span>
          <span className="sf-eyebrow-dot" />
          <span>Submission Form</span>
        </div>

        <div className="sf-hero">
          <div>
            <h1 className="sf-heading sf-display">
              Let&rsquo;s see what
              <br />
              you&rsquo;ve built.
            </h1>
            <p className="sf-desc">
              Submit your work and real evidence for the role you&rsquo;re
              targeting. <strong>This information is used to evaluate your
              skills</strong> — not your marks.
            </p>
          </div>

          <div className="sf-illustration" aria-hidden="true">
            <div className="sf-ring sf-ring-1" />
            <div className="sf-ring sf-ring-2" />
            <div className="sf-ring sf-ring-3" />
            <div className="sf-platform" />

            <div className="sf-folder">
              <svg width="130" height="110" viewBox="0 0 130 110" fill="none">
                <defs>
                  <linearGradient id="sfFolderBody" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#3a5bd9" />
                    <stop offset="100%" stopColor="#182b7a" />
                  </linearGradient>
                  <linearGradient id="sfFolderFront" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6f8dff" />
                    <stop offset="100%" stopColor="#3a5bd9" />
                  </linearGradient>
                </defs>
                <path d="M8 24C8 19.58 11.58 16 16 16H50L60 28H114C118.42 28 122 31.58 122 36V88C122 92.42 118.42 96 114 96H16C11.58 96 8 92.42 8 88V24Z" fill="url(#sfFolderBody)" opacity="0.55" />
                <path d="M14 40C14 35.58 17.58 32 22 32H108C112.42 32 116 35.58 116 40V88C116 92.42 112.42 96 108 96H22C17.58 96 14 92.42 14 88V40Z" fill="url(#sfFolderFront)" />
                <circle cx="65" cy="60" r="20" fill="#0d1740" opacity="0.4" />
                <path d="M65 70V50M65 50L57 58M65 50L73 58" stroke="#eaf0ff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <div className="sf-orbit-icon sf-orbit-1">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5 0-.24-.01-1.03-.01-1.87-2.78.62-3.37-1.22-3.37-1.22-.46-1.2-1.11-1.52-1.11-1.52-.9-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.12 2.91.86.09-.66.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .28.18.6.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" fill="#dfe6ff" />
              </svg>
            </div>
            <div className="sf-orbit-icon sf-orbit-2">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" stroke="#dfe6ff" strokeWidth="1.6" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="#dfe6ff" strokeWidth="1.6" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="sf-orbit-icon sf-orbit-3">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3l1.8 4.9L19 9.7l-4.9 1.8L12 16.4l-1.8-4.9L5 9.7l4.9-1.8L12 3Z" fill="#c9b9ff" />
              </svg>
            </div>

            <span className="sf-spark" style={{ top: "10%", left: "38%" }} />
            <span className="sf-spark" style={{ top: "70%", left: "20%", animationDelay: "0.8s" }} />
            <span className="sf-spark" style={{ top: "60%", left: "78%", animationDelay: "1.4s" }} />
          </div>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit}>
          <section className="sf-card">
            <h2 className="sf-card-title sf-display">
              <span className="sf-card-title-bar" />
              Tell us about yourself
            </h2>

            <div className="sf-grid-2" style={{ marginBottom: 20 }}>
              <div className="sf-field">
                <label className="sf-label" htmlFor="sf-name">Full name</label>
                <input
                  id="sf-name"
                  className="sf-input"
                  type="text"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={updateField("fullName")}
                  required
                />
              </div>
              <div className="sf-field">
                <label className="sf-label" htmlFor="sf-email">Email address</label>
                <input
                  id="sf-email"
                  className="sf-input"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={updateField("email")}
                  required
                />
              </div>
            </div>

            <div className="sf-grid-2">
              <div className="sf-field">
                <label className="sf-label" htmlFor="sf-role">Target role</label>
                <div className="sf-select-wrap">
                  <select
                    id="sf-role"
                    className="sf-select"
                    value={form.targetRole}
                    onChange={updateField("targetRole")}
                    required
                  >
                    <option value="" disabled>Select the role you&rsquo;re targeting</option>
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sf-field">
                <label className="sf-label" htmlFor="sf-exp">Experience level</label>
                <div className="sf-select-wrap">
                  <select
                    id="sf-exp"
                    className="sf-select"
                    value={form.experience}
                    onChange={updateField("experience")}
                    required
                  >
                    <option value="" disabled>Select your experience level</option>
                    {EXPERIENCE_OPTIONS.map((exp) => (
                      <option key={exp} value={exp}>{exp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="sf-card">
            <h2 className="sf-card-title sf-display">
              <span className="sf-card-title-bar" />
              Share your work
            </h2>

            <div style={{ marginBottom: 26 }}>
              <label className="sf-label" style={{ display: "block", marginBottom: 10 }}>
                GitHub repository link(s)
              </label>
              {form.repoLinks.map((link, i) => (
                <div className="sf-repo-row" key={i}>
                  <input
                    className="sf-input"
                    type="url"
                    placeholder="https://github.com/yourusername/your-repo"
                    value={link}
                    onChange={(e) => updateRepoLink(i, e.target.value)}
                  />
                  {form.repoLinks.length > 1 && (
                    <button
                      type="button"
                      className="sf-repo-remove"
                      onClick={() => removeRepoLink(i)}
                      aria-label="Remove repository link"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="sf-add-link" onClick={addRepoLink}>
                + Add another link
              </button>
            </div>

            <div>
              <label className="sf-label" style={{ display: "block", marginBottom: 10 }}>
                Resume (PDF)
              </label>
              <div
                className={
                  "sf-upload" +
                  (dragActive ? " sf-drag-active" : "") +
                  (resumeFile ? " sf-has-file" : "")
                }
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={() => document.getElementById("sf-resume-input")?.click()}
                role="button"
                tabIndex={0}
              >
                <input
                  id="sf-resume-input"
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileInput}
                  style={{ display: "none" }}
                />
                {resumeFile ? (
                  <>
                    <div className="sf-upload-icon">
                      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                        <path d="M20 6L9 17l-5-5" stroke="#7ee8b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="sf-file-chip">
                      📄 {resumeFile.name} · {formatSize(resumeFile.size)}
                    </span>
                    <div className="sf-upload-sub" style={{ marginTop: 10 }}>
                      Click to replace file
                    </div>
                  </>
                ) : (
                  <>
                    <div className="sf-upload-icon">
                      <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                        <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="#a9c0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" stroke="#a9c0ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="sf-upload-title">Drag &amp; drop your resume</div>
                    <div className="sf-upload-sub">
                      or <span className="sf-upload-browse">browse files</span>
                    </div>
                    <div className="sf-upload-meta">
                      <span>SUPPORTED: PDF</span>
                      <span>MAX SIZE: 5MB</span>
                    </div>
                  </>
                )}
              </div>
              {fileError && <div className="sf-upload-error">{fileError}</div>}
            </div>
          </section>

          <button type="submit" className="sf-submit" disabled={status !== "idle"}>
            {status === "evaluating" && <span className="sf-spinner" />}
            {status === "done" ? (
              <>
                Submitted for evaluation
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            ) : (
              <>
                {buttonLabel}
                {status === "idle" && (
                  <svg className="sf-submit-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </>
            )}
          </button>

          <p className="sf-note">
            This submission becomes your evidence. We evaluate what
            you&rsquo;ve built — not where you studied.
          </p>
        </form>
      </div>
    </div>
  );
}