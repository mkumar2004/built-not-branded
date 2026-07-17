"use client"
import React, { useEffect, useState } from "react";
import {
  Download,
  Github,
  FileText,
  ArrowUp,
  TriangleAlert,
  ArrowUpRight,
  CheckCircle2,
  Check,
  Star,
  ShieldCheck,
} from "lucide-react";

interface ScoreRow {
  label: string;
  score: number;
}

interface HighlightRow {
  text: string;
  ok: boolean;
}

const SCORE_BREAKDOWN: ScoreRow[] = [
  { label: "Technical Skills", score: 92 },
  { label: "Problem Solving", score: 88 },
  { label: "Project Impact", score: 90 },
  { label: "Communication", score: 78 },
  { label: "Learning Agility", score: 85 },
];

const KEY_HIGHLIGHTS: HighlightRow[] = [
  { text: "Strong in React, TypeScript and modern frontend tools", ok: true },
  { text: "Well-structured projects with clean code and best practices", ok: true },
  { text: "Good problem solving and algorithmic thinking", ok: true },
  { text: "Clear communication in documentation", ok: true },
  { text: "Can improve in system design fundamentals", ok: false },
];

function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);

  return value;
}

function FitScoreRing({ score }: { score: number }) {
  const animated = useCountUp(score);
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 104 104">
        <defs>
          <linearGradient id="fitScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
        </defs>
        <circle cx="52" cy="52" r={radius} stroke="#1c2b52" strokeWidth="7" fill="none" />
        <circle
          cx="52"
          cy="52"
          r={radius}
          stroke="url(#fitScoreGradient)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ filter: "drop-shadow(0 0 6px rgba(99,102,241,0.6))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold text-white">{animated}</span>
        <span className="text-xs text-[#98A4C8]">/100</span>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  icon: React.ReactNode;
  iconTone: "green" | "orange" | "purple" | "blue";
  label: string;
  value: React.ReactNode;
}

function SummaryCard({ icon, iconTone, label, value }: SummaryCardProps) {
  const tone: Record<SummaryCardProps["iconTone"], string> = {
    green: "bg-emerald-500/15 text-emerald-400",
    orange: "bg-orange-500/15 text-orange-400",
    purple: "bg-violet-500/15 text-violet-400",
    blue: "bg-blue-500/15 text-blue-400",
  };

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] p-4 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B5BDB]/50 hover:shadow-[0_0_30px_-10px_rgba(59,91,219,0.5)]">
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${tone[iconTone]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-[#98A4C8]">{label}</p>
        <p className="text-sm font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function ScoreBar({ label, score }: ScoreRow) {
  const animated = useCountUp(score);
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-[#98A4C8]">{label}</span>
        <span className="font-medium text-white">{animated}/100</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#141d3d]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
          style={{ width: `${animated}%`, transition: "width 900ms ease" }}
        />
      </div>
    </div>
  );
}

function HighlightItem({ text, ok }: HighlightRow) {
  return (
    <div className="flex items-start gap-2.5 text-sm">
      {ok ? (
        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
      ) : (
        <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
      )}
      <span className={ok ? "text-[#c7cfe6]" : "text-[#c7cfe6]"}>{text}</span>
    </div>
  );
}

export default function FitCandidate() {
  return (
    <div className="min-h-screen w-full bg-[#050816] px-4 py-10 text-white sm:px-8">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -right-32 top-60 h-[380px] w-[380px] rounded-full bg-violet-600/15 blur-[130px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#98A4C8]">
            <span className="font-semibold text-white">02</span>
            <span className="text-[#3B5BDB]">/</span>
            <span>Fit Report (Recruiter View)</span>
          </div>
          <button className="flex items-center gap-2 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#3B5BDB]/50 hover:bg-white/[0.06]">
            <Download className="h-4 w-4" />
            Download Report
          </button>
        </div>

        {/* profile + score */}
        <div className="mb-6 flex flex-col justify-between gap-8 rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl sm:flex-row sm:items-center">
          <div className="flex items-start gap-4">
            <img
              src="https://i.pravatar.cc/96?img=12"
              alt="Rohit Sharma"
              className="h-16 w-16 shrink-0 rounded-full border border-[#233A73]/60 object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white">Rohit Sharma</h1>
              <p className="mt-0.5 text-[#98A4C8]">Frontend Developer</p>
              <p className="mt-1 text-sm text-[#98A4C8]">2.4 yrs experience &middot; Bengaluru, India</p>
              <div className="mt-3 flex items-center gap-4">
                <a href="#" className="flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300">
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a href="#" className="flex items-center gap-1.5 text-sm text-blue-400 transition-colors hover:text-blue-300">
                  <FileText className="h-4 w-4" />
                  Resume
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 sm:items-end">
            <FitScoreRing score={92} />
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-400 shadow-[0_0_16px_-4px_rgba(52,211,153,0.6)]">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Shortlist for Technical Round
            </span>
          </div>
        </div>

        {/* summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            icon={<ArrowUp className="h-4.5 w-4.5" />}
            iconTone="green"
            label="Strengths"
            value="5"
          />
          <SummaryCard
            icon={<TriangleAlert className="h-4.5 w-4.5" />}
            iconTone="orange"
            label="Gaps"
            value="2"
          />
          <SummaryCard
            icon={<ArrowUpRight className="h-4.5 w-4.5" />}
            iconTone="purple"
            label="Next Step"
            value="Technical Round"
          />
          <SummaryCard
            icon={<CheckCircle2 className="h-4.5 w-4.5" />}
            iconTone="blue"
            label="Verdict"
            value="Shortlist"
          />
        </div>

        {/* score breakdown + highlights */}
        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-base font-semibold text-white">Score Breakdown</h2>
            <div className="space-y-5">
              {SCORE_BREAKDOWN.map((row) => (
                <ScoreBar key={row.label} label={row.label} score={row.score} />
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl">
            <h2 className="mb-5 text-base font-semibold text-white">Key Highlights</h2>
            <div className="space-y-4">
              {KEY_HIGHLIGHTS.map((item) => (
                <HighlightItem key={item.text} text={item.text} ok={item.ok} />
              ))}
            </div>
          </div>
        </div>

        {/* recommendation */}
        <div className="mb-6 grid grid-cols-1 items-center gap-6 overflow-hidden rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl sm:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-3 text-base font-semibold text-white">Recommendation</h2>
            <p className="text-[15px] leading-relaxed text-[#c7cfe6]">
              Rohit shows strong technical fundamentals and practical experience. We recommend
              moving forward to the technical round.
            </p>
          </div>
          <div className="relative flex h-32 items-center justify-center">
            <div className="absolute h-24 w-24 rounded-full bg-violet-500/20 blur-2xl" />
            <svg viewBox="0 0 160 120" className="relative h-28 w-40">
              <g fill="#1e2f5c" stroke="#3B5BDB" strokeWidth="1">
                <rect x="10" y="90" width="34" height="20" rx="3" />
                <rect x="50" y="70" width="34" height="40" rx="3" />
                <rect x="90" y="50" width="34" height="60" rx="3" />
              </g>
              <g>
                <path
                  d="M107 30 l4 9 l9 1 l-7 6 l2 9 l-8 -5 l-8 5 l2 -9 l-7 -6 l9 -1 z"
                  fill="url(#starGradient)"
                  style={{ filter: "drop-shadow(0 0 10px rgba(168,85,247,0.9))" }}
                />
                <defs>
                  <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#c084fc" />
                  </linearGradient>
                </defs>
              </g>
              <circle cx="30" cy="40" r="1.5" fill="#60a5fa" />
              <circle cx="130" cy="70" r="1.5" fill="#60a5fa" />
              <circle cx="140" cy="30" r="1" fill="#93c5fd" />
              <circle cx="20" cy="70" r="1" fill="#93c5fd" />
            </svg>
          </div>
        </div>

        {/* hiring decision */}
        <div className="mb-6 rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl">
          <h2 className="mb-4 text-base font-semibold text-white">Hiring Decision</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(99,102,241,0.9)]">
              Shortlist Candidate
            </button>
            <button className="flex-1 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#3B5BDB]/50 hover:bg-white/[0.06]">
              Save for Later
            </button>
            <button className="flex-1 rounded-2xl border border-rose-500/30 bg-rose-500/5 px-5 py-3 text-sm font-medium text-rose-400 transition-all duration-300 hover:border-rose-500/60 hover:bg-rose-500/10">
              Reject
            </button>
          </div>
        </div>

        {/* transparency */}
        <div className="flex items-start gap-4 rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">Transparent Evaluation</h3>
            <p className="mt-1 text-sm leading-relaxed text-[#98A4C8]">
              Academic marks, college tier, and educational background are shown only as context.
              Hiring recommendations are generated entirely from technical evidence, project
              quality, coding ability, GitHub activity, and demonstrated skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}