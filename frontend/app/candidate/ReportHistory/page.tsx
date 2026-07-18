"use client"
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FolderArchive,
  Clock,
  FileText,
  Layers,
  Target,
  Trophy,
  Briefcase,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Download,
  Star,
  Rocket,
  TrendingUp,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens — exact brand hexes, kept outside Tailwind's default palette
// ---------------------------------------------------------------------------
const NAVY = "#050816";
const BORDER = "#233A73";
const MUTED = "#98A4C8";
const BLUE = "#3B82F6";
const PURPLE = "#A855F7";
const GREEN = "#34D399";
const ORANGE = "#FBBF24";
const RED = "#F87171";

type Verdict = "Good Fit" | "Moderate Fit" | "Needs Improvement" | "Excellent Fit";

const verdictColor: Record<Verdict, string> = {
  "Good Fit": GREEN,
  "Moderate Fit": ORANGE,
  "Needs Improvement": RED,
  "Excellent Fit": PURPLE,
};

type Submission = {
  role: string;
  date: string;
  score: number;
  verdict: Verdict;
  summary: string;
};

const submissions: Submission[] = [
  {
    role: "AI Engineer",
    date: "18 Jun 2024",
    score: 88,
    verdict: "Excellent Fit",
    summary: "Strong applied ML fundamentals. Deepen distributed systems knowledge next.",
  },
  {
    role: "Frontend Developer",
    date: "12 May 2024",
    score: 82,
    verdict: "Good Fit",
    summary: "Excellent frontend fundamentals. Improve system design to increase your score.",
  },
  {
    role: "Backend Developer",
    date: "28 Apr 2024",
    score: 75,
    verdict: "Moderate Fit",
    summary: "Solid API design. Testing coverage and documentation need more depth.",
  },
  {
    role: "Software Engineer",
    date: "15 Apr 2024",
    score: 68,
    verdict: "Needs Improvement",
    summary: "Good problem-solving foundation. Architecture and scalability need work.",
  },
];

const chartScores = [68, 72, 75, 82, 88];

const achievements = [
  { icon: "🏆", label: "First Submission" },
  { icon: "⭐", label: "First Good Fit" },
  { icon: "🚀", label: "Improved by 20 Points" },
  { icon: "💼", label: "Applied for 5 Roles" },
  { icon: "📈", label: "Consistent Growth" },
];

export default function ReportHistory() {
  const router = useRouter();
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden px-4 py-10 sm:px-8 sm:py-16 lg:px-16"
      style={{ backgroundColor: NAVY }}
    >
      <Background />

      <div className="relative mx-auto max-w-6xl">
        {/* Back nav */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/candidate")}
            style={{ color: MUTED, background: "none", border: "none", cursor: "pointer", padding: 0, fontSize: 13, fontWeight: 500 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "white")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = MUTED)}
          >
            ← Back to Home
          </button>
        </div>
        {/* ---------------------------------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[3fr_2fr]">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <span style={{ color: BLUE }}>05</span>
              <span style={{ color: MUTED }}>Report History</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Your journey,
              <br />
              saved forever.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed sm:text-base" style={{ color: MUTED }}>
              Track every submission you&apos;ve made, compare your progress
              across different roles, and see how your skills have evolved
              over time.
            </p>
          </div>

          <ArchiveIllustration />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SUMMARY STATS */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={<Layers className="h-4 w-4" />}
            color={BLUE}
            label="Total Submissions"
            value={8}
          />
          <StatCard
            icon={<Target className="h-4 w-4" />}
            color={PURPLE}
            label="Average Fit Score"
            value={79}
            suffix="/100"
          />
          <StatCard
            icon={<Trophy className="h-4 w-4" />}
            color={GREEN}
            label="Highest Score"
            value={92}
            suffix="/100"
          />
          <StatCard
            icon={<Briefcase className="h-4 w-4" />}
            color={ORANGE}
            label="Roles Applied"
            value={5}
          />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* CAREER TIMELINE */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-white">Career Timeline</h2>

          <div className="relative mt-8">
            <div
              className="absolute left-5 top-2 bottom-2 w-px sm:left-6"
              style={{ background: `linear-gradient(to bottom, ${BLUE}, ${PURPLE}, transparent)` }}
            />
            <div className="space-y-5">
              {submissions.map((s, i) => (
                <RevealOnScroll key={s.role + s.date} delay={i * 90}>
                  <div className="relative flex gap-4 sm:gap-6">
                    <div
                      className="relative z-10 mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
                      style={{
                        backgroundColor: "rgba(59,130,246,0.12)",
                        border: `1px solid ${BORDER}`,
                        color: verdictColor[s.verdict],
                        boxShadow: `0 0 18px ${verdictColor[s.verdict]}40`,
                      }}
                    >
                      <FileText className="h-4 w-4" />
                    </div>

                    <GlassCard className="flex-1 p-5 sm:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3">
                            <h3 className="text-base font-semibold text-white sm:text-lg">
                              {s.role}
                            </h3>
                            <span
                              className="rounded-full border px-2.5 py-0.5 text-xs font-medium"
                              style={{
                                borderColor: `${verdictColor[s.verdict]}55`,
                                color: verdictColor[s.verdict],
                                backgroundColor: `${verdictColor[s.verdict]}14`,
                              }}
                            >
                              {s.verdict}
                            </span>
                          </div>
                          <p className="mt-1 text-xs" style={{ color: MUTED }}>
                            Submitted {s.date}
                          </p>
                          <p className="mt-3 max-w-xl text-sm leading-relaxed" style={{ color: MUTED }}>
                            {s.summary}
                          </p>
                        </div>

                        <div className="flex flex-shrink-0 flex-col items-start gap-3 sm:items-end">
                          <div className="text-right">
                            <span className="text-2xl font-bold text-white">{s.score}</span>
                            <span className="text-sm" style={{ color: MUTED }}>
                              /100
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-white"
                              style={{ color: BLUE, background: "none", border: "none", cursor: "pointer" }}
                              onClick={() => router.push("/candidate/FitReport")}
                            >
                              View Report
                              <ArrowRight className="h-3.5 w-3.5" />
                            </button>
                            <button
                              className="text-sm font-medium transition-colors hover:text-white"
                              style={{ color: MUTED, background: "none", border: "none", cursor: "pointer" }}
                            >
                              Compare
                            </button>
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* PROGRESS VISUALIZATION */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-10 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-white">Your Growth Over Time</h3>
            <ProgressChart />
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl border p-4 text-sm leading-relaxed"
              style={{ borderColor: BORDER, backgroundColor: "rgba(59,130,246,0.06)", color: MUTED }}
            >
              <TrendingUp className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
              <span>
                You&apos;ve improved your overall fit score by{" "}
                <span className="font-semibold text-white">20 points</span> over
                the last four submissions.
              </span>
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* ACHIEVEMENTS */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-6 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-white">Career Milestones</h3>
            <div className="mt-5 flex flex-wrap gap-3">
              {achievements.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ borderColor: BORDER, backgroundColor: "rgba(255,255,255,0.03)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 22px ${BLUE}40`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <span className="text-base">{a.icon}</span>
                  {a.label}
                </div>
              ))}
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* AI OBSERVATIONS */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:p-8" glow>
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
                boxShadow: `0 0 24px ${BLUE}55`,
              }}
            >
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">AI Observations</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                Across your previous submissions, your coding skills have
                remained consistently strong. The largest improvement came
                from backend architecture and project quality. Focus next on
                distributed systems to reach senior-level fit.
              </p>
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* TRUST CARD */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-6 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:p-8">
            <div
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
              style={{
                backgroundColor: "rgba(59,130,246,0.12)",
                boxShadow: `0 0 20px ${BLUE}33`,
              }}
            >
              <ShieldCheck className="h-5 w-5" style={{ color: BLUE }} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">Transparent History</h3>
              <p className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTED }}>
                Every report remains available so you can measure real
                progress over time. Nothing is hidden or deleted. Marks are
                shown only as context and are never used as a rejection
                criterion.
              </p>
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* PRIMARY CTA */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <div className="mt-10 flex flex-col items-center gap-4 text-center">
            <button
              className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})` }}
              onClick={() => router.push("/candidate/SubmissionForm")}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${BLUE}66`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
              }}
            >
              Start New Submission
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-white"
              style={{ color: MUTED }}
            >
              <Download className="h-3.5 w-3.5" />
              Download All Reports
            </button>
          </div>
        </RevealOnScroll>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(6px, -10px); }
          100% { transform: translate(0, 0); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------
function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}33, transparent 70%)` }}
      />
      <div
        className="absolute top-1/4 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${PURPLE}2e, transparent 70%)` }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}22, transparent 70%)` }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {[...Array(28)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white"
          style={{
            top: `${(i * 41) % 100}%`,
            left: `${(i * 59) % 100}%`,
            opacity: 0.12 + ((i * 7) % 30) / 100,
            animation: `drift ${4 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${(i % 6) * 0.4}s`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header illustration: floating archive folder with reports + clock
// ---------------------------------------------------------------------------
function ArchiveIllustration() {
  return (
    <div className="relative mx-auto flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
      <div
        className="absolute h-56 w-56 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}33, transparent 70%)` }}
      />
      <div
        className="relative"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        {/* report cards fanned behind folder */}
        <div className="relative h-32 w-40">
          <div
            className="absolute -top-2 left-6 h-24 w-16 -rotate-6 rounded-lg border"
            style={{
              borderColor: `${BLUE}55`,
              background: `linear-gradient(160deg, ${PURPLE}55, ${BLUE}33)`,
              boxShadow: `0 8px 24px ${PURPLE}22`,
            }}
          >
            <div className="mt-3 space-y-1.5 px-2">
              <div className="h-1 w-8 rounded bg-white/40" />
              <div className="h-1 w-6 rounded bg-white/25" />
            </div>
          </div>
          <div
            className="absolute -top-4 left-14 h-24 w-16 rotate-3 rounded-lg border"
            style={{
              borderColor: `${BLUE}66`,
              background: `linear-gradient(160deg, ${BLUE}66, #14245e)`,
              boxShadow: `0 8px 24px ${BLUE}33`,
            }}
          >
            <div className="mt-3 space-y-1.5 px-2">
              <div className="h-1 w-9 rounded bg-white/50" />
              <div className="h-1 w-7 rounded bg-white/30" />
              <div className="h-1 w-8 rounded bg-white/30" />
            </div>
          </div>

          {/* folder */}
          <div
            className="absolute bottom-0 left-2 h-16 w-32 rounded-b-xl rounded-tr-xl border"
            style={{
              borderColor: BORDER,
              background: `linear-gradient(160deg, #1E3A8A99, #05081699)`,
              boxShadow: `0 12px 32px rgba(59,130,246,0.35)`,
            }}
          >
            <div
              className="absolute -top-3 left-0 h-4 w-14 rounded-t-lg"
              style={{ background: `linear-gradient(160deg, #1E3A8A99, #05081699)` }}
            />
          </div>
        </div>

        {/* clock icon */}
        <div
          className="absolute -bottom-3 -right-6 flex h-11 w-11 items-center justify-center rounded-full border"
          style={{
            borderColor: `${BLUE}66`,
            backgroundColor: "rgba(5,8,22,0.8)",
            boxShadow: `0 0 20px ${BLUE}55`,
          }}
        >
          <Clock className="h-5 w-5" style={{ color: BLUE }} />
        </div>

        {/* archive glyph accent */}
        <div
          className="absolute -top-6 -left-4 flex h-9 w-9 items-center justify-center rounded-xl border"
          style={{
            borderColor: `${PURPLE}55`,
            backgroundColor: "rgba(5,8,22,0.8)",
            boxShadow: `0 0 16px ${PURPLE}44`,
          }}
        >
          <FolderArchive className="h-4 w-4" style={{ color: PURPLE }} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animated line chart for score progression
// ---------------------------------------------------------------------------
function ProgressChart() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const width = 600;
  const height = 160;
  const padding = 20;
  const min = Math.min(...chartScores) - 10;
  const max = Math.max(...chartScores) + 5;
  const stepX = (width - padding * 2) / (chartScores.length - 1);

  const points = chartScores.map((s, i) => {
    const x = padding + i * stepX;
    const y = height - padding - ((s - min) / (max - min)) * (height - padding * 2);
    return { x, y, s };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  return (
    <div ref={ref} className="mt-6 -mx-2 overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full min-w-[480px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={BLUE} />
            <stop offset="100%" stopColor={PURPLE} />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.28" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={areaPath} fill="url(#areaGrad)" opacity={visible ? 1 : 0} style={{ transition: "opacity 1s ease" }} />

        <path
          d={linePath}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={visible ? 0 : 1}
          style={{ transition: "stroke-dashoffset 1.6s ease-out" }}
        />

        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={visible ? 5 : 0}
              fill={NAVY}
              stroke={BLUE}
              strokeWidth="2.5"
              style={{ transition: `r 0.4s ease ${0.3 + i * 0.15}s` }}
            />
            <text
              x={p.x}
              y={p.y - 14}
              textAnchor="middle"
              fontSize="13"
              fill="white"
              opacity={visible ? 1 : 0}
              style={{ transition: `opacity 0.4s ease ${0.4 + i * 0.15}s`, fontWeight: 600 }}
            >
              {p.s}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared primitives
// ---------------------------------------------------------------------------
function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`rounded-3xl border backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        borderColor: BORDER,
        backgroundColor: "rgba(255,255,255,0.03)",
        boxShadow: glow
          ? `0 8px 32px rgba(0,0,0,0.35), 0 0 32px ${BLUE}1f`
          : "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
}

function StatCard({
  icon,
  color,
  label,
  value,
  suffix = "",
}: {
  icon: React.ReactNode;
  color: string;
  label: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          const duration = 1200;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="group rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1"
      style={{
        borderColor: BORDER,
        backgroundColor: "rgba(255,255,255,0.03)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.35), 0 0 28px ${color}33`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.35)";
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}1f`, color, boxShadow: `0 0 16px ${color}33` }}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-white">
        {display}
        {suffix}
      </p>
    </div>
  );
}

function RevealOnScroll({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}