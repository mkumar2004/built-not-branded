"use client"
import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  AlertTriangle,
  Compass,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens (kept here since Tailwind's default palette can't express
// exact brand hexes like #050816 without a build step / JIT config)
// ---------------------------------------------------------------------------
const NAVY = "#050816";
const MUTED = "#9CA8C6";
const BLUE = "#3B82F6";
const PURPLE = "#A855F7";
const GREEN = "#34D399";
const ORANGE = "#FB923C";

type Strength = { name: string; note: string; score: number };
type Gap = { name: string; note: string; score: number };

const strengths: Strength[] = [
  { name: "Problem Solving", note: "Strong grasp of DSA and problem-solving approach.", score: 90 },
  { name: "Technical Skills", note: "Good command over the technologies you use.", score: 85 },
  { name: "Project Impact", note: "Projects show ownership and real-world impact.", score: 80 },
  { name: "Communication", note: "Clear documentation and presentation of ideas.", score: 78 },
];

const gaps: Gap[] = [
  { name: "System Design", note: "Needs more depth in scalable system design.", score: 45 },
  { name: "Testing", note: "Add more test coverage to your projects.", score: 50 },
  { name: "Documentation", note: "Could use more detailed technical write-ups.", score: 55 },
  { name: "Architecture", note: "Practice structuring larger codebases.", score: 48 },
];

const roadmap = [
  "Learn system design basics",
  "Build a scalable backend project",
  "Practice HLD/LLD interviews",
  "Read architecture case studies",
];

const SCORE = 82;
const CIRCUMFERENCE = 2 * Math.PI * 54;

export default function FitReport() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Trigger the score count-up + border reveal shortly after first paint.
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(t);
  }, []);

  // Trigger progress bars once the skills section scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dashOffset = mounted
    ? CIRCUMFERENCE - (SCORE / 100) * CIRCUMFERENCE
    : CIRCUMFERENCE;

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden px-4 py-10 sm:px-8 sm:py-16 lg:px-16"
      style={{ backgroundColor: NAVY }}
    >
      {/* ---------------------------------------------------------------- */}
      {/* Ambient background: glows, grid texture, floating particles      */}
      {/* ---------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${BLUE}33, transparent 70%)` }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${PURPLE}2e, transparent 70%)` }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
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
        {/* tiny stars */}
        {[...Array(24)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 37) % 100}%`,
              left: `${(i * 53) % 100}%`,
              opacity: 0.15 + ((i * 7) % 30) / 100,
              animationDuration: `${3 + (i % 4)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* -------------------------------------------------------------- */}
        {/* HEADER                                                        */}
        {/* -------------------------------------------------------------- */}
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span style={{ color: BLUE }}>03</span>
              <span style={{ color: MUTED }}>Fit Report</span>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Here&apos;s your honest
              <br />
              fit report.
            </h1>
            <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: MUTED }}>
              Your work has been analyzed using real project evidence. This
              report explains your strengths, gaps, and next recommended step.
            </p>
          </div>

          {/* Circular score */}
          <div className="relative flex flex-col items-center">
            <div
              className="absolute inset-0 rounded-full blur-2xl"
              style={{ background: `radial-gradient(circle, ${BLUE}44, ${PURPLE}22, transparent 70%)` }}
            />
            <svg width="160" height="160" viewBox="0 0 120 120" className="relative -rotate-90">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={BLUE} />
                  <stop offset="100%" stopColor={PURPLE} />
                </linearGradient>
              </defs>
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-white">{SCORE}</span>
              <span className="text-xs" style={{ color: MUTED }}>
                /100
              </span>
            </div>
            <div
              className="mt-4 flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{
                borderColor: "rgba(52,211,153,0.3)",
                backgroundColor: "rgba(52,211,153,0.08)",
                color: GREEN,
                boxShadow: `0 0 20px ${GREEN}22`,
              }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              Good Fit
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* QUICK SUMMARY                                                 */}
        {/* -------------------------------------------------------------- */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <SummaryCard
            icon={<ArrowUp className="h-4 w-4" />}
            iconColor={GREEN}
            label="Strengths"
            value="4"
          />
          <SummaryCard
            icon={<AlertTriangle className="h-4 w-4" />}
            iconColor={ORANGE}
            label="Skill Gaps"
            value="2"
          />
          <SummaryCard
            icon={<Compass className="h-4 w-4" />}
            iconColor={PURPLE}
            label="Recommended Role"
            value="Backend Scaling"
          />
          <SummaryCard
            icon={<CheckCircle2 className="h-4 w-4" />}
            iconColor={BLUE}
            label="Verdict"
            value="Good Fit"
          />
        </div>

        {/* -------------------------------------------------------------- */}
        {/* STRENGTHS / GAPS                                              */}
        {/* -------------------------------------------------------------- */}
        <div ref={sectionRef} className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Your Strengths</h2>
            <div className="mt-6 space-y-6">
              {strengths.map((s) => (
                <SkillRow key={s.name} {...s} color={GREEN} visible={visible} />
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white">Areas to Improve</h2>
            <div className="mt-6 space-y-6">
              {gaps.map((g) => (
                <SkillRow key={g.name} {...g} color={ORANGE} visible={visible} />
              ))}
            </div>
          </GlassCard>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* NEXT STEP                                                     */}
        {/* -------------------------------------------------------------- */}
        <GlassCard className="mt-6 overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-lg font-semibold text-white">Your Next Career Step</h2>
              <p className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
                Strengthen System Design Foundations
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTED }}>
                Based on your submitted work, this is the single improvement
                that will increase your fit score the most.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {roadmap.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/90">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      style={{ color: GREEN }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Illustration: floating staircase + glowing star */}
            <div className="relative mx-auto flex h-52 w-52 items-end justify-center">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{ background: `radial-gradient(circle, ${PURPLE}33, transparent 70%)` }}
              />
              <Sparkles
                className="absolute right-6 top-2 h-6 w-6 animate-pulse"
                style={{ color: GREEN }}
              />
              <div className="relative flex items-end gap-2">
                {[28, 44, 60, 76, 92].map((h, i) => (
                  <div
                    key={i}
                    className="w-8 rounded-t-md animate-[float_3s_ease-in-out_infinite]"
                    style={{
                      height: `${h}px`,
                      animationDelay: `${i * 0.15}s`,
                      background: `linear-gradient(to top, ${BLUE}, ${PURPLE})`,
                      boxShadow: `0 0 16px ${PURPLE}44`,
                    }}
                  />
                ))}
                <div
                  className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full"
                  style={{ background: `radial-gradient(circle, #FDE68A, transparent 70%)` }}
                >
                  <span className="text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* -------------------------------------------------------------- */}
        {/* TRUST CARD                                                    */}
        {/* -------------------------------------------------------------- */}
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
            <h3 className="text-base font-semibold text-white">Transparent Evaluation</h3>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTED }}>
              Marks are shown only as context. Your score is calculated from
              the quality of your projects, technical skills, problem-solving
              ability, and practical evidence — never from college marks or
              percentage.
            </p>
          </div>
        </GlassCard>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-3xl border backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        backgroundColor: "rgba(255,255,255,0.03)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {children}
    </div>
  );
}

function SummaryCard({
  icon,
  iconColor,
  label,
  value,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  value: string;
}) {
  return (
    <GlassCard className="p-5">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          backgroundColor: `${iconColor}1f`,
          color: iconColor,
          boxShadow: `0 0 16px ${iconColor}33`,
        }}
      >
        {icon}
      </div>
      <p className="mt-4 text-xs" style={{ color: MUTED }}>
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-white">{value}</p>
    </GlassCard>
  );
}

function SkillRow({
  name,
  note,
  score,
  color,
  visible,
}: {
  name: string;
  note: string;
  score: number;
  color: string;
  visible: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-white">{name}</span>
        <span className="text-sm font-semibold" style={{ color }}>
          {score}/100
        </span>
      </div>
      <p className="mt-1 text-xs" style={{ color: MUTED }}>
        {note}
      </p>
      <div
        className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-[1200ms] ease-out"
          style={{
            width: visible ? `${score}%` : "0%",
            background: `linear-gradient(to right, ${color}99, ${color})`,
            boxShadow: `0 0 8px ${color}55`,
          }}
        />
      </div>
    </div>
  );
}