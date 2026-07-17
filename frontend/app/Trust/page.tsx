"use client"
import React, { useState } from "react";
import {
  Code2,
  Puzzle,
  FolderKanban,
  MessageSquare,
  TrendingUp,
  ArrowRight,
  ShoppingCart,
  BarChart3,
  Globe,
} from "lucide-react";

interface ProjectEvidence {
  id: string;
  name: string;
  icon: React.ReactNode;
  iconTone: string;
  stack: string;
}

interface Category {
  id: string;
  name: string;
  score: number;
  icon: React.ReactNode;
  description: string;
  projects: ProjectEvidence[];
  resumeExcerpts: string[];
}

const CATEGORIES: Category[] = [
  {
    id: "technical",
    name: "Technical Skills",
    score: 92,
    icon: <Code2 className="h-4.5 w-4.5" />,
    description: "Strong command over core frontend and related technologies.",
    projects: [
      {
        id: "p1",
        name: "E-commerce Web App",
        icon: <ShoppingCart className="h-5 w-5" />,
        iconTone: "text-emerald-400 bg-emerald-400/10",
        stack: "React, TypeScript, Redux, Tailwind CSS",
      },
      {
        id: "p2",
        name: "Dashboard Analytics",
        icon: <BarChart3 className="h-5 w-5" />,
        iconTone: "text-violet-400 bg-violet-400/10",
        stack: "React, Recharts, Zustand, API integration",
      },
      {
        id: "p3",
        name: "Portfolio Website",
        icon: <Globe className="h-5 w-5" />,
        iconTone: "text-amber-400 bg-amber-400/10",
        stack: "Next.js, Tailwind CSS, Framer Motion",
      },
    ],
    resumeExcerpts: [
      "React",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Redux",
      "Git",
    ],
  },
  {
    id: "problem",
    name: "Problem Solving",
    score: 88,
    icon: <Puzzle className="h-4.5 w-4.5" />,
    description: "Consistently breaks down complex problems into clean, testable solutions.",
    projects: [
      {
        id: "p1",
        name: "E-commerce Web App",
        icon: <ShoppingCart className="h-5 w-5" />,
        iconTone: "text-emerald-400 bg-emerald-400/10",
        stack: "Cart logic, checkout edge cases, discount engine",
      },
      {
        id: "p2",
        name: "Dashboard Analytics",
        icon: <BarChart3 className="h-5 w-5" />,
        iconTone: "text-violet-400 bg-violet-400/10",
        stack: "Data aggregation, chart performance tuning",
      },
    ],
    resumeExcerpts: ["Algorithms", "Data Structures", "Debugging", "System Thinking"],
  },
  {
    id: "project",
    name: "Project Impact",
    score: 90,
    icon: <FolderKanban className="h-4.5 w-4.5" />,
    description: "Ships production-ready features with clear, measurable outcomes.",
    projects: [
      {
        id: "p1",
        name: "E-commerce Web App",
        icon: <ShoppingCart className="h-5 w-5" />,
        iconTone: "text-emerald-400 bg-emerald-400/10",
        stack: "Live in production, 4.8k monthly users",
      },
      {
        id: "p3",
        name: "Portfolio Website",
        icon: <Globe className="h-5 w-5" />,
        iconTone: "text-amber-400 bg-amber-400/10",
        stack: "Deployed on Vercel, SEO optimized",
      },
    ],
    resumeExcerpts: ["Ownership", "Deployment", "CI/CD", "Vercel"],
  },
  {
    id: "communication",
    name: "Communication",
    score: 78,
    icon: <MessageSquare className="h-4.5 w-4.5" />,
    description: "Clear documentation and commit messages; PR descriptions could be more detailed.",
    projects: [
      {
        id: "p2",
        name: "Dashboard Analytics",
        icon: <BarChart3 className="h-5 w-5" />,
        iconTone: "text-violet-400 bg-violet-400/10",
        stack: "Well-documented README, setup guide",
      },
    ],
    resumeExcerpts: ["Documentation", "Technical Writing", "Code Reviews"],
  },
  {
    id: "learning",
    name: "Learning Agility",
    score: 85,
    icon: <TrendingUp className="h-4.5 w-4.5" />,
    description: "Rapidly adopted new tools across recent projects, from Redux to Zustand.",
    projects: [
      {
        id: "p3",
        name: "Portfolio Website",
        icon: <Globe className="h-5 w-5" />,
        iconTone: "text-amber-400 bg-amber-400/10",
        stack: "Adopted Framer Motion within one sprint",
      },
    ],
    resumeExcerpts: ["Self-taught", "New Frameworks", "Continuous Learning"],
  },
];

function scoreColor(score: number): string {
  if (score >= 85) return "#34d399";
  if (score >= 70) return "#38bdf8";
  if (score >= 60) return "#fbbf24";
  return "#fb7185";
}

interface CategoryItemProps {
  category: Category;
  active: boolean;
  onSelect: () => void;
}

function CategoryItem({ category, active, onSelect }: CategoryItemProps) {
  return (
    <button
      onClick={onSelect}
      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-all duration-300 ${
        active
          ? "border-blue-500/50 bg-gradient-to-r from-blue-600/20 to-violet-600/20 shadow-[0_0_24px_-8px_rgba(99,102,241,0.6)]"
          : "border-[#233A73]/60 bg-white/[0.02] hover:border-[#3B5BDB]/50 hover:bg-white/[0.05]"
      }`}
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
          active ? "bg-blue-500/20 text-blue-300" : "bg-white/[0.05] text-[#98A4C8]"
        }`}
      >
        {category.icon}
      </span>
      <span className={`flex-1 text-sm font-medium ${active ? "text-white" : "text-[#c7cfe6]"}`}>
        {category.name}
      </span>
      <span
        className="text-sm font-semibold"
        style={{ color: active ? scoreColor(category.score) : "#98A4C8" }}
      >
        {category.score}
      </span>
    </button>
  );
}

function ProjectCard({ project }: { project: ProjectEvidence }) {
  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-[#233A73]/60 bg-white/[0.02] p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B5BDB]/60 hover:shadow-[0_0_24px_-10px_rgba(59,91,219,0.6)]">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${project.iconTone}`}>
        {project.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-white">{project.name}</p>
        <p className="mt-0.5 truncate text-xs text-[#98A4C8]">{project.stack}</p>
      </div>
      <button className="flex shrink-0 items-center gap-1 text-xs font-medium text-blue-400 transition-colors hover:text-blue-300">
        View Project
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export default function Trust() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? CATEGORIES[0];
  const color = scoreColor(active.score);

  return (
    <div className="min-h-screen w-full bg-[#050816] px-4 py-10 text-white sm:px-8">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute -right-32 top-40 h-[380px] w-[380px] rounded-full bg-violet-600/15 blur-[130px]" />
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
        <div className="mb-6 flex items-center gap-2 text-sm text-[#98A4C8]">
          <span className="font-semibold text-blue-400">04</span>
          <span className="text-[#3B5BDB]">/</span>
          <span>Evidence Drill-down</span>
        </div>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-[42px]">
          See the evidence.
          <br />
          Trust the fit.
        </h1>
        <p className="mt-3 max-w-sm text-[#98A4C8]">Click any section to see proof behind the score.</p>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-[300px_1fr]">
          {/* left panel */}
          <div className="space-y-2.5">
            {CATEGORIES.map((c) => (
              <CategoryItem key={c.id} category={c} active={c.id === activeId} onSelect={() => setActiveId(c.id)} />
            ))}
          </div>

          {/* right panel */}
          <div
            key={active.id}
            className="rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl"
            style={{ animation: "fadeIn 350ms ease both" }}
          >
            <h2 className="text-sm font-medium text-[#98A4C8]">{active.name}</h2>
            <div className="mt-1 flex items-baseline gap-1.5">
              <span className="text-5xl font-semibold tracking-tight" style={{ color }}>
                {active.score}
              </span>
              <span className="text-lg text-[#98A4C8]">/100</span>
            </div>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#c7cfe6]">{active.description}</p>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-white">Evidence from Projects</h3>
            <div className="space-y-3">
              {active.projects.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-white">Resume Excerpts</h3>
            <div className="flex flex-wrap gap-2">
              {active.resumeExcerpts.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-[#233A73]/60 bg-white/[0.04] px-3.5 py-1.5 text-xs font-medium text-[#c7cfe6] transition-all duration-300 hover:border-blue-500/50 hover:text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}