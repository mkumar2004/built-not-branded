"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Sparkles,
  BarChart3,
  Rocket,
  UploadCloud,
  Target,
  Gauge,
  TrendingUp,
  TrendingDown,
  ScrollText,
  Compass,
  BookOpen,
  History,
  Clock3,
  ShieldCheck,
  EyeOff,
  Lock,
  XCircle,
  Users,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

/**
 * SkillFit — Candidate Journey landing page
 * -------------------------------------------------
 * Single-file React + TypeScript + Tailwind component.
 * No external animation library required — all motion is
 * done with CSS keyframes (injected once via <style>) plus
 * a tiny IntersectionObserver hook for scroll reveals.
 *
 * Requires: tailwindcss, lucide-react
 *   npm i lucide-react
 */

/* ------------------------------------------------------------------ */
/*  Scroll-reveal hook                                                */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

/* ------------------------------------------------------------------ */
/*  Static data                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    id: "01",
    icon: UploadCloud,
    title: "Submission Form",
    description:
      "Upload the evidence that actually shows how you work — code, resume, and the role you're aiming for.",
    items: ["Upload Resume", "GitHub Repository", "Target Role", "Experience Level"],
    accent: "blue",
    journeyLabel: "Submission",
  },
  {
    id: "02",
    icon: Gauge,
    title: "Fit Report",
    description:
      "A transparent breakdown of where you stand — no hidden cutoffs, no black-box scoring.",
    items: ["Fit Score", "Strengths", "Weaknesses", "Transparent Verdict"],
    accent: "cyan",
    journeyLabel: "AI Analysis",
  },
  {
    id: "03",
    icon: Compass,
    title: "Growth Path",
    description:
      "A roadmap built from your own submission, pointing at the very next skill worth learning.",
    items: ["Personalized Roadmap", "Recommended Next Step", "Learning Suggestions"],
    accent: "purple",
    journeyLabel: "Report",
  },
  {
    id: "04",
    icon: History,
    title: "Report History",
    description:
      "Every submission, every role, kept in one timeline so your progress speaks for itself.",
    items: ["Previous Submissions", "Role History", "Timeline"],
    accent: "orange",
    journeyLabel: "Growth",
  },
  {
    id: "05",
    icon: ScrollText,
    title: "How This Works",
    description:
      "Marks are shown for context only. They're never the reason a candidate gets turned away.",
    items: ["Marks Shown as Context", "Never Used to Reject", "Evidence-First Hiring"],
    accent: "gold",
    journeyLabel: "History",
  },
] as const;

type Accent = (typeof STEPS)[number]["accent"];

const ACCENTS: Record<
  Accent,
  { text: string; ring: string; glow: string; grad: string; chip: string }
> = {
  blue: {
    text: "text-blue-300",
    ring: "ring-blue-400/30",
    glow: "from-blue-500/30 via-blue-500/5 to-transparent",
    grad: "from-blue-400 to-blue-600",
    chip: "bg-blue-500/10 text-blue-200 border-blue-400/20",
  },
  cyan: {
    text: "text-cyan-300",
    ring: "ring-cyan-400/30",
    glow: "from-cyan-500/30 via-cyan-500/5 to-transparent",
    grad: "from-cyan-400 to-cyan-600",
    chip: "bg-cyan-500/10 text-cyan-200 border-cyan-400/20",
  },
  purple: {
    text: "text-purple-300",
    ring: "ring-purple-400/30",
    glow: "from-purple-500/30 via-purple-500/5 to-transparent",
    grad: "from-purple-400 to-purple-600",
    chip: "bg-purple-500/10 text-purple-200 border-purple-400/20",
  },
  orange: {
    text: "text-orange-300",
    ring: "ring-orange-400/30",
    glow: "from-orange-500/30 via-orange-500/5 to-transparent",
    grad: "from-orange-400 to-orange-600",
    chip: "bg-orange-500/10 text-orange-200 border-orange-400/20",
  },
  gold: {
    text: "text-amber-300",
    ring: "ring-amber-400/30",
    glow: "from-amber-500/30 via-amber-500/5 to-transparent",
    grad: "from-amber-300 to-amber-500",
    chip: "bg-amber-500/10 text-amber-200 border-amber-400/20",
  },
};

const TRUST_BADGES = [
  {
    icon: ShieldCheck,
    title: "Evidence Based",
    description: "Verdicts come from real work, not a resume keyword scan.",
  },
  {
    icon: EyeOff,
    title: "Transparent AI",
    description: "Every score ships with the reasoning behind it.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your submissions are never sold or shared.",
  },
  {
    icon: XCircle,
    title: "Marks ≠ Rejection",
    description: "Academic marks are context — never a filter.",
  },
  {
    icon: Users,
    title: "Built for Candidates",
    description: "Designed around the person applying, not the ATS.",
  },
];

/* ------------------------------------------------------------------ */
/*  Background layer                                                  */
/* ------------------------------------------------------------------ */

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function BackgroundField() {
  // Random particle positions must NOT be computed during render (or via
  // useMemo on first render) because that runs during SSR too, and
  // Math.random() will produce different values on the server vs. the
  // client — causing a hydration mismatch. Instead we start with an empty
  // array (matches server output) and fill it in client-side after mount.
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.round(Math.random() * 1000) / 10,
        top: Math.round(Math.random() * 1000) / 10,
        size: Math.random() * 2 + 1,
        delay: Math.round(Math.random() * 8000) / 1000,
        duration: 10 + Math.random() * 14,
        opacity: Math.random() * 0.5 + 0.15,
      }))
    );
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#050816] will-change-transform"
      style={{
        // Forces the browser to promote this fixed layer onto its own
        // compositor layer (GPU), decoupled from document scroll. Without
        // this, large `filter: blur(...)` elements inside a `position:
        // fixed` ancestor get repainted on the CPU every scroll frame in
        // some browsers, which is what causes scroll jank.
        transform: "translate3d(0,0,0)",
        contain: "paint",
      }}
    >
      {/* grid texture */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(#233A73 1px, transparent 1px), linear-gradient(90deg, #233A73 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 90%)",
        }}
      />

      {/* radial glows — will-change promotes each to its own layer so the
          expensive blur is painted once and then just composited, instead
          of being recomputed on every scroll frame */}
      <div className="absolute -top-40 left-1/4 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-blue-600/25 blur-[120px] will-change-transform" />
      <div className="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-purple-600/20 blur-[120px] will-change-transform" />
      <div className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-blue-500/15 blur-[110px] will-change-transform" />

      {/* blur circles / glass reflections */}
      <div className="absolute top-1/2 left-10 h-40 w-40 rounded-full border border-white/5 bg-white/[0.02] blur-2xl" />
      <div className="absolute bottom-20 right-24 h-56 w-56 rounded-full border border-white/5 bg-white/[0.02] blur-2xl" />

      {/* stars / particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-blue-200 animate-[drift_ease-in-out_infinite] will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero illustration (right side)                                    */
/* ------------------------------------------------------------------ */

function HeroIllustration() {
  const orbitIcons = [
    { Icon: Github, angle: 0, radius: 150, size: 22 },
    { Icon: Sparkles, angle: 90, radius: 150, size: 22 },
    { Icon: BarChart3, angle: 180, radius: 150, size: 22 },
    { Icon: Rocket, angle: 270, radius: 150, size: 22 },
  ];

  return (
    <div className="relative mx-auto flex h-[420px] w-[420px] max-w-full items-center justify-center sm:h-[480px] sm:w-[480px]">
      {/* glowing rings — will-change-transform keeps these on their own
          compositor layer instead of triggering a repaint of everything
          underneath on every scroll frame */}
      <div className="absolute h-[420px] w-[420px] rounded-full border border-blue-400/20 animate-[spin_28s_linear_infinite] will-change-transform" />
      <div className="absolute h-[320px] w-[320px] rounded-full border border-purple-400/20 animate-[spin_20s_linear_infinite_reverse] will-change-transform" />
      <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-500/10 blur-3xl animate-[pulseGlow_5s_ease-in-out_infinite] will-change-transform" />

      {/* orbiting icons, counter-rotated so they stay upright */}
      {orbitIcons.map(({ Icon, angle, radius, size }, i) => (
        <div
          key={i}
          className="absolute h-full w-full animate-[spin_22s_linear_infinite] will-change-transform"
          style={{ animationDelay: `${i * -5.5}s` }}
        >
          <div
            className="absolute left-1/2 top-1/2 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#233A73] bg-white/[0.04] shadow-[0_0_24px_rgba(59,130,246,0.35)] backdrop-blur-xl animate-[spin_22s_linear_infinite_reverse]"
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
              marginLeft: -22,
              marginTop: -22,
            }}
          >
            <Icon size={size} className="text-blue-200" />
          </div>
        </div>
      ))}

      {/* floating holographic resume card */}
      <div className="relative z-10 animate-[float_6s_ease-in-out_infinite]">
        <div className="relative w-52 rounded-3xl border border-[#233A73] bg-white/[0.06] p-5 shadow-[0_0_60px_rgba(59,130,246,0.35)] backdrop-blur-2xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-purple-500/10" />
          <div className="relative flex flex-col gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-purple-500">
              <Sparkles size={16} className="text-white" />
            </div>
            <div className="space-y-1.5">
              <div className="h-2 w-3/4 rounded-full bg-white/25" />
              <div className="h-2 w-1/2 rounded-full bg-white/15" />
            </div>
            <div className="mt-1 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-5/6 rounded-full bg-white/10" />
              <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="mt-2 flex items-center justify-between rounded-xl border border-[#233A73] bg-black/20 px-3 py-2">
              <span className="text-[10px] uppercase tracking-wider text-[#9CA8C6]">
                Fit Score
              </span>
              <span className="text-sm font-semibold text-white">92</span>
            </div>
          </div>
          <div className="absolute -bottom-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#233A73] bg-blue-500/20 backdrop-blur-xl">
            <svg viewBox="0 0 24 24" className="h-4 w-4 text-blue-300" fill="none">
              <path
                d="M5 12.5 10 17 19 7"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        {/* landing glow / pedestal */}
        <div className="mx-auto mt-6 h-3 w-40 rounded-full bg-blue-500/40 blur-xl" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step card                                                         */
/* ------------------------------------------------------------------ */

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[number];
  index: number;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const a = ACCENTS[step.accent];
  const Icon = step.icon;
  const staggerY = index % 2 === 1 ? "md:translate-y-8" : "";

  return (
    <div
      ref={ref}
      className={`group relative ${staggerY} transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${step.id === "05" ? "md:col-span-2" : ""}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* gradient border glow on hover */}
      <div
        className={`absolute -inset-px rounded-[24px] bg-gradient-to-br ${a.grad} opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-40`}
      />

      <div
        className={`relative flex h-full flex-col gap-5 overflow-hidden rounded-[24px] border border-[#233A73] bg-white/[0.035] p-7 backdrop-blur-2xl transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-white/20 group-hover:shadow-[0_20px_60px_-15px_rgba(59,130,246,0.35)] sm:p-8`}
      >
        {/* colored accent glow */}
        <div
          className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${a.glow} blur-2xl transition-opacity duration-500 group-hover:opacity-80`}
        />

        <div className="relative flex items-start justify-between">
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-[#233A73] bg-gradient-to-br ${a.grad} shadow-[0_0_30px_rgba(59,130,246,0.35)]`}
          >
            <Icon size={26} className="text-white" strokeWidth={1.8} />
          </div>
          <span className="text-sm font-medium tracking-[0.2em] text-[#9CA8C6]">
            {step.id}
          </span>
        </div>

        <div className="relative space-y-2.5">
          <h3 className="text-2xl font-semibold text-white">{step.title}</h3>
          <p className="max-w-md text-[15px] leading-relaxed text-[#9CA8C6]">
            {step.description}
          </p>
        </div>

        <div className="relative flex flex-wrap gap-2 pt-1">
          {step.items.map((item) => (
            <span
              key={item}
              className={`rounded-full border px-3 py-1 text-xs font-medium ${a.chip}`}
            >
              {item}
            </span>
          ))}
        </div>

        <button
          className={`relative mt-auto flex w-fit items-center gap-1.5 pt-2 text-sm font-medium ${a.text} transition-transform duration-300 group-hover:gap-2.5`}
        >
          Learn more
          <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Connecting journey rail (desktop only)                            */
/* ------------------------------------------------------------------ */

function JourneyRail() {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 md:block">
      <div className="relative h-full w-px bg-gradient-to-b from-blue-500/0 via-[#233A73] to-blue-500/0">
        <div className="absolute inset-0 w-px animate-[flowDown_4s_linear_infinite] bg-gradient-to-b from-blue-400 via-purple-400 to-transparent opacity-70" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Trust badge                                                       */
/* ------------------------------------------------------------------ */

function TrustBadge({
  icon: Icon,
  title,
  description,
}: (typeof TRUST_BADGES)[number]) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-transparent p-5 text-left transition-colors duration-300 hover:border-[#233A73] hover:bg-white/[0.03] sm:items-center sm:text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#233A73] bg-gradient-to-br from-blue-500/20 to-purple-500/20">
        <Icon size={20} className="text-blue-300" strokeWidth={1.8} />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="text-xs leading-relaxed text-[#9CA8C6]">{description}</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function SkillFitLanding() {
  const journey = useReveal<HTMLDivElement>();
  const trust = useReveal<HTMLDivElement>();

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white">
      <BackgroundField />

      {/* keyframes injected once */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes drift {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-24px) translateX(8px); }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.06); }
        }
        @keyframes flowDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.001ms !important;
          }
        }
      `}</style>

      {/* ---------------------------------------------------------- */}
      {/*  HERO                                                       */}
      {/* ---------------------------------------------------------- */}
      <section className="relative mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 px-6 pb-28 pt-24 md:flex-row md:gap-10 md:pt-32 lg:px-10">
        {/* LEFT 60% */}
        <div className="w-full md:w-[58%]">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#233A73] bg-white/[0.04] px-4 py-1.5 text-xs font-medium tracking-wide text-[#9CA8C6] backdrop-blur-xl">
            <span className="text-blue-300">01</span>
            <span className="h-1 w-1 rounded-full bg-[#233A73]" />
            Candidate Journey
          </div>

          <h1 className="text-[40px] font-bold leading-[1.08] tracking-tight sm:text-[52px] lg:text-[64px]">
            Prove what I can{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              actually do
            </span>
            , without my marks getting in the way.
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-[#9CA8C6] sm:text-[18px]">
            We evaluate real work instead of resumes. Upload your projects,
            receive transparent AI feedback, and discover your next career
            step.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.45)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(99,102,241,0.65)]">
              <span className="relative z-10">Start Your Journey</span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
              <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <button className="text-[15px] font-medium text-[#9CA8C6] underline-offset-4 transition-colors duration-300 hover:text-white hover:underline">
              See Sample Report
            </button>
          </div>
        </div>

        {/* RIGHT 40% */}
        <div className="w-full md:w-[42%]">
          <HeroIllustration />
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  SECTION TITLE                                              */}
      {/* ---------------------------------------------------------- */}
      <section
        ref={journey.ref}
        className={`mx-auto max-w-3xl px-6 pb-16 text-center transition-all duration-700 ${
          journey.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <h2 className="text-3xl font-bold sm:text-4xl">Your Journey</h2>
        <p className="mt-4 text-base leading-relaxed text-[#9CA8C6] sm:text-lg">
          Everything happens through evidence, not percentage cutoffs.
        </p>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  STEP CARDS + CONNECTING RAIL                               */}
      {/* ---------------------------------------------------------- */}
      <section className="relative mx-auto max-w-6xl px-6 pb-10 lg:px-10">
        <JourneyRail />
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {STEPS.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------- */}
      {/*  BOTTOM TRUST SECTION                                       */}
      {/* ---------------------------------------------------------- */}
      <section
        ref={trust.ref}
        className={`mx-auto max-w-6xl px-6 py-28 transition-all duration-700 lg:px-10 ${
          trust.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative overflow-hidden rounded-[24px] border border-[#233A73] bg-white/[0.03] p-8 backdrop-blur-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-purple-500/20 blur-[100px]" />

          <div className="relative mb-10 text-center">
            <h3 className="text-2xl font-semibold sm:text-3xl">
              Why candidates trust SkillFit
            </h3>
          </div>

          <div className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {TRUST_BADGES.map((badge) => (
              <TrustBadge key={badge.title} {...badge} />
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto max-w-6xl px-6 pb-16 text-center text-xs text-[#9CA8C6] lg:px-10">
        © {new Date().getFullYear()} SkillFit. Evidence-first hiring.
      </footer>
    </div>
  );
}