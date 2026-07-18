"use client"
import React, { useState } from "react";
import {
  GraduationCap,
  ShieldCheck,
  CalendarDays,
  Building2,
  Percent,
  MapPin,
  Languages,
  BadgeCheck,
  Github,
  FolderGit2,
  Cpu,
  Brain,
  Code2,
  Layers,
  Target,
  ArrowRight,
  ChevronLeft,
  Info,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface BackgroundRow {
  icon: React.ReactNode;
  label: string;
  value: string;
  subValue?: string;
}

/* ------------------------------------------------------------------ */
/*  Static content                                                     */
/* ------------------------------------------------------------------ */

const backgroundRows: BackgroundRow[] = [
  {
    icon: <GraduationCap className="h-4 w-4" />,
    label: "Education",
    value: "B.Tech in Computer Science",
    subValue: "Lovely Professional University",
  },
  {
    icon: <CalendarDays className="h-4 w-4" />,
    label: "Graduation Year",
    value: "2023",
  },
  {
    icon: <Building2 className="h-4 w-4" />,
    label: "College Tier",
    value: "Tier 2",
  },
  {
    icon: <Percent className="h-4 w-4" />,
    label: "12th Percentage",
    value: "82%",
  },
  {
    icon: <MapPin className="h-4 w-4" />,
    label: "Current Location",
    value: "Bengaluru, India",
  },
  {
    icon: <Languages className="h-4 w-4" />,
    label: "Languages",
    value: "English, Hindi",
  },
  {
    icon: <BadgeCheck className="h-4 w-4" />,
    label: "Work Authorization",
    value: "Eligible to Work",
  },
];

const excludedFields = [
  "College tier",
  "Academic percentage",
  "University name",
  "Graduation year",
  "Educational background",
];

const contextItems = [
  "Education",
  "College",
  "Marks",
  "University",
  "Graduation Year",
];

const evidenceItems = [
  { label: "GitHub Projects", icon: <Github className="h-4 w-4" /> },
  { label: "Portfolio", icon: <FolderGit2 className="h-4 w-4" /> },
  { label: "Technical Skills", icon: <Cpu className="h-4 w-4" /> },
  { label: "Problem Solving", icon: <Brain className="h-4 w-4" /> },
  { label: "Code Quality", icon: <Code2 className="h-4 w-4" /> },
  { label: "Architecture", icon: <Layers className="h-4 w-4" /> },
  { label: "Project Impact", icon: <Target className="h-4 w-4" /> },
];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

const ContextBadge: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/20 bg-blue-400/10 px-2.5 py-1 text-[11px] font-medium text-[#98A4C8] transition-colors duration-300 hover:border-blue-400/40 hover:text-blue-200">
        <Info className="h-3 w-3" />
        Context Only
      </span>
      <div
        className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-[#0A1330]/95 p-3 text-[11px] leading-relaxed text-[#98A4C8] shadow-xl backdrop-blur-xl transition-all duration-300 ${
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
        }`}
      >
        This information is displayed for recruiter reference only and is
        excluded from AI scoring.
      </div>
    </div>
  );
};

const Divider: React.FC = () => (
  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
);

/* ------------------------------------------------------------------ */
/*  Illustration                                                       */
/* ------------------------------------------------------------------ */

const HeroIllustration: React.FC = () => (
  <div className="relative mx-auto flex h-[300px] w-[300px] items-center justify-center sm:h-[360px] sm:w-[360px]">
    {/* glow platform */}
    <div className="absolute bottom-4 h-40 w-40 rounded-full bg-blue-500/20 blur-2xl" />
    <div className="absolute bottom-6 h-56 w-56 rounded-full border border-blue-400/20 [transform:rotateX(70deg)]" />

    {/* floating particles */}
    <div className="absolute left-6 top-10 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-300/70" />
    <div className="absolute right-10 top-20 h-1 w-1 animate-pulse rounded-full bg-purple-300/70 [animation-delay:400ms]" />
    <div className="absolute bottom-16 right-4 h-1.5 w-1.5 animate-pulse rounded-full bg-blue-200/60 [animation-delay:800ms]" />

    {/* certificate card */}
    <div className="animate-[float_6s_ease-in-out_infinite] rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_0_60px_-15px_rgba(59,130,246,0.45)] backdrop-blur-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400/30 to-purple-400/30" />
        <ShieldCheck className="h-5 w-5 text-blue-300/80" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-32 rounded-full bg-white/20" />
        <div className="h-2 w-24 rounded-full bg-white/10" />
        <div className="h-2 w-28 rounded-full bg-white/10" />
      </div>
      <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4">
        <div className="h-2 w-2 rounded-full bg-blue-300/70" />
        <div className="h-2 w-16 rounded-full bg-white/10" />
      </div>
    </div>

    {/* graduation cap */}
    <div className="absolute -right-2 top-6 animate-[float_5s_ease-in-out_infinite] [animation-delay:600ms]">
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)] backdrop-blur-xl">
        <GraduationCap className="h-6 w-6 text-purple-300" />
      </div>
    </div>

    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `}</style>
  </div>
);

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

const BackgroundInfo: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050816] px-6 py-16 text-white sm:px-10 lg:px-16">
      {/* ---------------------------------------------------------- */}
      {/* Ambient background                                         */}
      {/* ---------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:64px_64px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[480px] w-[480px] rounded-full bg-purple-600/20 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-5xl">
        {/* -------------------------------------------------------- */}
        {/* Header                                                    */}
        {/* -------------------------------------------------------- */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-6">
          <div>
            <div className="mb-6 flex items-center gap-3 text-xs font-medium tracking-wide text-[#98A4C8]">
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/80">
                05
              </span>
              <span>Background Information</span>
            </div>

            <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Context only,
              <br />
              <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                never a cutoff.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#98A4C8] sm:text-base">
              Background details are displayed for transparency and
              recruiter reference only. They do not influence AI evaluation,
              fit score, or hiring recommendations.
            </p>
          </div>

          <HeroIllustration />
        </div>

        {/* -------------------------------------------------------- */}
        {/* Candidate Background card                                 */}
        {/* -------------------------------------------------------- */}
        <div className="mt-16 rounded-[24px] border border-blue-400/10 bg-white/[0.03] p-6 shadow-[0_0_60px_-30px_rgba(59,130,246,0.5)] backdrop-blur-2xl transition-shadow duration-500 hover:shadow-[0_0_80px_-25px_rgba(59,130,246,0.55)] sm:p-8">
          <h2 className="mb-6 text-lg font-medium text-white">
            Candidate Background
          </h2>

          <div className="space-y-1">
            {backgroundRows.map((row, i) => (
              <React.Fragment key={row.label}>
                <div className="group flex flex-col gap-3 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-blue-400/[0.06] sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-300">
                      {row.icon}
                    </span>
                    <span className="text-sm text-[#98A4C8]">
                      {row.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pl-11 sm:pl-0">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">
                        {row.value}
                      </p>
                      {row.subValue && (
                        <p className="text-xs text-[#6B7796]">
                          {row.subValue}
                        </p>
                      )}
                    </div>
                    <ContextBadge />
                  </div>
                </div>
                {i < backgroundRows.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* AI Transparency panel                                     */}
        {/* -------------------------------------------------------- */}
        <div className="mt-8 rounded-[24px] border border-blue-400/20 bg-gradient-to-b from-blue-500/[0.07] to-transparent p-6 backdrop-blur-2xl sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <h2 className="text-lg font-medium text-white">
              Excluded from Evaluation
            </h2>
          </div>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {excludedFields.map((field) => (
              <li
                key={field}
                className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-[#98A4C8] transition-colors duration-300 hover:bg-white/[0.05]"
              >
                <span className="text-blue-300">✓</span>
                {field}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm leading-relaxed text-[#98A4C8]">
            These fields are never used when calculating{" "}
            <span className="text-white">Fit Score</span>,{" "}
            <span className="text-white">Technical Rating</span>,{" "}
            <span className="text-white">Recommendation</span>, or{" "}
            <span className="text-white">Shortlisting Decision</span>.
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/* What the AI actually uses                                 */}
        {/* -------------------------------------------------------- */}
        <div className="mt-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-2xl sm:p-8">
          <h2 className="mb-8 text-center text-lg font-medium text-white">
            What the AI Actually Uses
          </h2>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-6">
            {/* Left: background info */}
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6B7796]">
                Background Information
              </p>
              <div className="space-y-2">
                {contextItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 opacity-70"
                  >
                    <span className="text-sm text-[#98A4C8]">{item}</span>
                    <ContextBadge />
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="flex flex-row items-center justify-center gap-3 md:flex-col">
              <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent md:block" />
              <span className="whitespace-nowrap rounded-full border border-blue-400/20 bg-[#050816] px-3 py-1.5 text-[11px] font-medium text-blue-200 shadow-[0_0_20px_-5px_rgba(59,130,246,0.6)] md:rotate-90">
                Transparent &amp; Fair
              </span>
              <div className="hidden h-full w-px bg-gradient-to-b from-transparent via-blue-400/30 to-transparent md:block" />
            </div>

            {/* Right: evaluation evidence */}
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-wide text-[#6B7796]">
                Evaluation Evidence
              </p>
              <div className="space-y-2">
                {evidenceItems.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-blue-400/20 bg-blue-400/[0.06] px-4 py-3 transition-colors duration-300 hover:bg-blue-400/[0.1]"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-blue-300">{item.icon}</span>
                      <span className="text-sm text-white">
                        {item.label}
                      </span>
                    </div>
                    <span className="rounded-full border border-blue-400/30 bg-blue-400/10 px-2.5 py-1 text-[10px] font-medium text-blue-200">
                      Used for AI Evaluation
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------- */}
        {/* SkillFit Promise                                          */}
        {/* -------------------------------------------------------- */}
        <div className="mt-8 rounded-[24px] border border-purple-400/10 bg-gradient-to-br from-purple-500/[0.06] via-transparent to-blue-500/[0.06] p-8 text-center backdrop-blur-2xl sm:p-12">
          <p className="mx-auto max-w-2xl text-xl font-medium leading-snug text-white sm:text-2xl">
            &ldquo;We don&apos;t hide your background.
            <br />
            We simply refuse to let it define your potential.&rdquo;
          </p>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#98A4C8]">
            Recruiters can view educational information for context, but
            every AI recommendation is generated exclusively from
            demonstrated skills, real-world projects, GitHub activity, and
            technical evidence.
          </p>
        </div>

        {/* -------------------------------------------------------- */}
        {/* Bottom trust panel                                        */}
        {/* -------------------------------------------------------- */}
        <div className="mt-8 rounded-[24px] border border-blue-400/10 bg-white/[0.03] p-8 text-center backdrop-blur-2xl sm:p-10">
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-blue-300">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <h2 className="text-xl font-medium text-white sm:text-2xl">
            Evidence-First Hiring
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#98A4C8]">
            The AI completely ignores marks, university ranking, college
            tier, and educational background when producing recommendations.
            Every hiring decision is backed by technical evidence, not
            academic assumptions.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_-8px_rgba(99,102,241,0.7)] transition-transform duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_-6px_rgba(99,102,241,0.85)]">
              Learn How AI Scores Candidates
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-[#98A4C8] transition-colors duration-300 hover:border-white/20 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
              Back to Recruiter Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundInfo;