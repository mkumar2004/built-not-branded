'use client'
import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Hammer,
  GitBranch,
  FileText,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
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

type RoadmapItem = {
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
};

const roadmap: RoadmapItem[] = [
  {
    icon: <BookOpen className="h-4 w-4" />,
    title: "Learn System Design Basics",
    description:
      "Understand scalability, databases, load balancing, caching, and distributed systems.",
    duration: "2–3 Weeks",
    difficulty: "Beginner",
  },
  {
    icon: <Hammer className="h-4 w-4" />,
    title: "Build a Scalable Backend Project",
    description:
      "Create a production-ready backend using authentication, databases, and APIs.",
    duration: "3–4 Weeks",
    difficulty: "Intermediate",
  },
  {
    icon: <GitBranch className="h-4 w-4" />,
    title: "Practice HLD & LLD Problems",
    description: "Design real-world applications and explain architectural decisions.",
    duration: "2–3 Weeks",
    difficulty: "Intermediate",
  },
  {
    icon: <FileText className="h-4 w-4" />,
    title: "Read Engineering Case Studies",
    description:
      "Study how companies like Netflix, Uber, and Amazon solve scalability challenges.",
    duration: "Ongoing",
    difficulty: "Advanced",
  },
];

const outcomes = [
  "Better technical interviews",
  "Higher Fit Score",
  "Stronger portfolio",
  "Ready for Backend & Full Stack roles",
  "More recruiter visibility",
];

const difficultyColor: Record<RoadmapItem["difficulty"], string> = {
  Beginner: GREEN,
  Intermediate: BLUE,
  Advanced: PURPLE,
};

export default function GrowthPath() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden px-4 py-10 sm:px-8 sm:py-16 lg:px-16"
      style={{ backgroundColor: NAVY }}
    >
      <Background />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------------------------------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------------------------------- */}
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span style={{ color: BLUE }}>04</span>
            <span style={{ color: MUTED }}>Growth Path</span>
          </div>
          <h1 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Your next step,
            <br />
            made clear.
          </h1>
          <p className="mt-4 text-sm leading-relaxed sm:text-base" style={{ color: MUTED }}>
            Based on your submitted work, our AI has identified the single
            most valuable improvement that will increase your technical fit
            and help you reach your target role faster.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* SPLIT: MOUNTAIN ILLUSTRATION + RECOMMENDATION CARD */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[2fr_3fr]">
          <MountainIllustration />

          <GlassCard className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-medium" style={{ color: MUTED }}>
                Recommended Next Step
              </span>
              <span
                className="flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium"
                style={{
                  borderColor: `${PURPLE}55`,
                  backgroundColor: `${PURPLE}14`,
                  color: "#D8B4FE",
                }}
              >
                <Sparkles className="h-3 w-3" />
                Recommended by AI
              </span>
            </div>

            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Strengthen System Design Foundations
            </h2>

            <p className="mt-4 text-sm leading-relaxed" style={{ color: MUTED }}>
              Based on your submitted projects, improving system design is
              the highest-impact change you can make to significantly
              improve your fit score and unlock more opportunities.
            </p>
          </GlassCard>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* LEARNING ROADMAP */}
        {/* ---------------------------------------------------------------- */}
        <div className="mt-16">
          <h2 className="text-lg font-semibold text-white">Learning Roadmap</h2>

          <div className="relative mt-8">
            <div
              className="absolute left-5 top-2 bottom-2 w-px sm:left-6"
              style={{ backgroundColor: BORDER }}
            />
            <div className="space-y-5">
              {roadmap.map((item, i) => (
                <RevealOnScroll key={item.title} delay={i * 100}>
                  <div className="relative flex gap-4 pl-0 sm:gap-6">
                    <div
                      className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12"
                      style={{
                        backgroundColor: "rgba(59,130,246,0.12)",
                        border: `1px solid ${BORDER}`,
                        color: BLUE,
                        boxShadow: `0 0 18px ${BLUE}33`,
                      }}
                    >
                      {item.icon}
                    </div>

                    <GlassCard className="flex-1 p-5 sm:p-6">
                      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-medium" style={{ color: MUTED }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-base font-semibold text-white sm:text-lg">
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="rounded-full border px-2.5 py-1 text-xs font-medium"
                            style={{
                              borderColor: `${difficultyColor[item.difficulty]}55`,
                              color: difficultyColor[item.difficulty],
                              backgroundColor: `${difficultyColor[item.difficulty]}14`,
                            }}
                          >
                            {item.difficulty}
                          </span>
                          <span
                            className="rounded-full px-2.5 py-1 text-xs font-medium"
                            style={{ backgroundColor: "rgba(255,255,255,0.06)", color: MUTED }}
                          >
                            {item.duration}
                          </span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                        {item.description}
                      </p>
                    </GlassCard>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* AI INSIGHT */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard
            className="mt-10 flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:p-8"
            glow
          >
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
              <h3 className="text-base font-semibold text-white">Why this recommendation?</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>
                Our AI found that your coding ability is already strong.
                Improving system design will have the biggest impact on your
                overall fit score because it complements your existing
                strengths and prepares you for larger engineering
                challenges.
              </p>
            </div>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* EXPECTED OUTCOME */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-6 p-6 sm:p-8">
            <h3 className="text-base font-semibold text-white">
              After completing this roadmap
            </h3>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-white/90">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: GREEN }} />
                  {o}
                </li>
              ))}
            </ul>
          </GlassCard>
        </RevealOnScroll>

        {/* ---------------------------------------------------------------- */}
        {/* BOTTOM CTA */}
        {/* ---------------------------------------------------------------- */}
        <RevealOnScroll>
          <GlassCard className="mt-6 flex flex-col items-start gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex items-start gap-4">
              <div
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "rgba(59,130,246,0.12)",
                  boxShadow: `0 0 20px ${BLUE}33`,
                }}
              >
                <ShieldCheck className="h-5 w-5" style={{ color: BLUE }} />
              </div>
              <p className="max-w-md text-sm leading-relaxed" style={{ color: MUTED }}>
                Complete these recommendations and submit your updated work
                to receive a refreshed AI Fit Report.
              </p>
            </div>

            <div className="flex flex-shrink-0 flex-col items-start gap-3 sm:items-end">
              <button
                className="group flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:brightness-110"
                style={{
                  background: `linear-gradient(135deg, ${BLUE}, ${PURPLE})`,
                  boxShadow: `0 0 0 rgba(59,130,246,0)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 28px ${BLUE}66`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 0 rgba(59,130,246,0)`;
                }}
              >
                Re-submit for Evaluation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                className="text-sm font-medium underline-offset-4 transition-colors hover:text-white hover:underline"
                style={{ color: MUTED }}
              >
                View Previous Report
              </button>
            </div>
          </GlassCard>
        </RevealOnScroll>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes drift {
          0% { transform: translate(0, 0); }
          50% { transform: translate(6px, -10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Background: glows, grid, stars, drifting particles
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
// Mountain illustration: winding glowing path, checkpoints, flag, fog
// ---------------------------------------------------------------------------
function MountainIllustration() {
  return (
    <div className="relative flex items-center justify-center">
      <div
        className="absolute h-72 w-72 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${BLUE}2e, transparent 70%)` }}
      />
      <svg
        viewBox="0 0 340 380"
        className="relative w-full max-w-sm"
        style={{ animation: "float 6s ease-in-out infinite" }}
      >
        <defs>
          <linearGradient id="mountainFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#14245E" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#050816" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="pathGlow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={BLUE} />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <radialGradient id="fog" cx="50%" cy="100%" r="60%">
            <stop offset="0%" stopColor={BLUE} stopOpacity="0.18" />
            <stop offset="100%" stopColor={BLUE} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* fog */}
        <ellipse cx="170" cy="340" rx="160" ry="50" fill="url(#fog)" />

        {/* back mountain */}
        <path
          d="M0 330 L90 160 L150 230 L220 110 L340 330 Z"
          fill="url(#mountainFill)"
          opacity="0.6"
        />
        {/* front mountain */}
        <path
          d="M20 340 L140 90 L200 190 L260 130 L330 340 Z"
          fill="url(#mountainFill)"
        />

        {/* winding glowing path */}
        <path
          d="M60 335 C 100 300, 70 270, 105 245 C 140 220, 100 200, 130 175 C 155 155, 125 140, 143 95"
          fill="none"
          stroke="url(#pathGlow)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path
          d="M60 335 C 100 300, 70 270, 105 245 C 140 220, 100 200, 130 175 C 155 155, 125 140, 143 95"
          fill="none"
          stroke={BLUE}
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.15"
        />

        {/* checkpoints */}
        {[
          { cx: 62, cy: 333 },
          { cx: 106, cy: 246 },
          { cx: 129, cy: 176 },
        ].map((p, i) => (
          <g key={i}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r="10"
              fill={BLUE}
              opacity="0.35"
              style={{
                transformOrigin: `${p.cx}px ${p.cy}px`,
                animation: `pulseGlow 2.4s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
            <circle cx={p.cx} cy={p.cy} r="5" fill="#DBEAFE" />
          </g>
        ))}

        {/* flag at summit */}
        <line x1="144" y1="95" x2="144" y2="60" stroke="#DBEAFE" strokeWidth="2.5" />
        <path d="M144 60 L172 70 L144 80 Z" fill={BLUE} />

        {/* stars */}
        {[
          [40, 60], [270, 40], [300, 100], [20, 130], [250, 200],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.6"
            fill="white"
            opacity="0.7"
            style={{
              animation: `pulseGlow ${3 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
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