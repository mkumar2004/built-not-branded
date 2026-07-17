"use client"
import React, { useState } from "react";
import { ChevronDown, SlidersHorizontal, Search } from "lucide-react";

interface SelectFieldProps {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-[#98A4C8]">{label}</label>
      <div className="group relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-4 py-3.5 text-sm font-medium text-white outline-none backdrop-blur-xl transition-all duration-300 focus:border-blue-500/60 focus:shadow-[0_0_0_4px_rgba(59,91,219,0.15)]"
        >
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#0a0f24] text-white">
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A4C8] transition-colors group-focus-within:text-blue-400" />
      </div>
    </div>
  );
}

function FitScoreSlider({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm text-[#98A4C8]">Fit Score</label>
        <span className="text-sm font-semibold text-white">{value}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-8 shrink-0 text-xs text-[#98A4C8]">0</span>
        <div className="relative flex w-full items-center py-2">
          <div className="pointer-events-none absolute h-1.5 w-full rounded-full bg-[#141d3d]" />
          <div
            className="pointer-events-none absolute h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            style={{ width: `${value}%` }}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="fit-score-slider relative w-full appearance-none bg-transparent"
          />
        </div>
        <span className="w-10 shrink-0 rounded-lg border border-[#233A73]/60 bg-white/[0.03] px-2 py-1 text-center text-xs text-[#98A4C8]">
          100
        </span>
      </div>
    </div>
  );
}

function DiscoveryIllustration() {
  return (
    <div className="relative flex h-full min-h-[380px] w-full items-center justify-center overflow-hidden">
      <div className="absolute h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="absolute right-4 top-4 h-32 w-32 rounded-full bg-violet-600/20 blur-2xl" />

      {/* tiny stars */}
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-blue-300/70"
          style={{
            top: `${(i * 37) % 90}%`,
            left: `${(i * 53) % 90}%`,
            animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      <svg viewBox="0 0 400 400" className="relative h-full w-full max-w-md">
        <defs>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1d3a8f" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3b5bdb" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="funnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#1e2f5c" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* floating candidate cards */}
        <g style={{ animation: "float 5s ease-in-out infinite" }}>
          <rect x="150" y="40" width="80" height="110" rx="10" fill="url(#cardGrad)" stroke="#3B5BDB" strokeWidth="1" />
          <circle cx="190" cy="75" r="14" fill="#5b7cf0" fillOpacity="0.6" />
          <rect x="168" y="98" width="44" height="6" rx="3" fill="#5b7cf0" fillOpacity="0.5" />
          <rect x="168" y="110" width="30" height="5" rx="2.5" fill="#5b7cf0" fillOpacity="0.4" />
        </g>

        <g style={{ animation: "float 6s ease-in-out infinite", animationDelay: "0.6s" }}>
          <rect x="90" y="120" width="66" height="92" rx="9" fill="url(#cardGrad)" stroke="#3B5BDB" strokeWidth="1" />
          <circle cx="123" cy="150" r="11" fill="#5b7cf0" fillOpacity="0.5" />
          <rect x="105" y="168" width="36" height="5" rx="2.5" fill="#5b7cf0" fillOpacity="0.45" />
        </g>

        <g style={{ animation: "float 5.5s ease-in-out infinite", animationDelay: "1.1s" }}>
          <rect x="240" y="110" width="70" height="96" rx="9" fill="url(#cardGrad)" stroke="#3B5BDB" strokeWidth="1" />
          <circle cx="275" cy="140" r="12" fill="#5b7cf0" fillOpacity="0.55" />
          <rect x="257" y="160" width="38" height="5" rx="2.5" fill="#5b7cf0" fillOpacity="0.45" />
        </g>

        {/* holographic platform */}
        <ellipse cx="200" cy="330" rx="120" ry="14" fill="#3B5BDB" fillOpacity="0.15" />
        <ellipse cx="200" cy="330" rx="80" ry="9" fill="#3B5BDB" fillOpacity="0.25" />

        {/* funnel */}
        <path d="M150 250 L250 250 L215 300 L185 300 Z" fill="url(#funnelGrad)" stroke="#3B5BDB" strokeWidth="1.5" />
        <ellipse cx="200" cy="250" rx="50" ry="9" fill="#3B5BDB" fillOpacity="0.4" stroke="#5b7cf0" strokeWidth="1" />
        <rect x="192" y="300" width="16" height="24" rx="3" fill="#1e2f5c" stroke="#3B5BDB" strokeWidth="1" />

        {/* magnifying glass */}
        <g style={{ animation: "float 4.5s ease-in-out infinite", animationDelay: "0.3s" }}>
          <circle cx="290" cy="290" r="34" fill="#0a1230" fillOpacity="0.6" stroke="#5b7cf0" strokeWidth="3" />
          <line x1="313" y1="313" x2="336" y2="336" stroke="#5b7cf0" strokeWidth="6" strokeLinecap="round" />
        </g>

        {/* particles */}
        <circle cx="120" cy="70" r="2" fill="#60a5fa" />
        <circle cx="330" cy="90" r="1.5" fill="#93c5fd" />
        <circle cx="70" cy="230" r="1.5" fill="#60a5fa" />
        <circle cx="340" cy="220" r="2" fill="#a78bfa" />
      </svg>
    </div>
  );
}

export default function FilterRole() {
  const [role, setRole] = useState("Frontend Developer");
  const [experience, setExperience] = useState("Fresher (0 - 1 yr)");
  const [location, setLocation] = useState("All Locations");
  const [fitScore, setFitScore] = useState(50);
  const [sortBy, setSortBy] = useState("Fit Score (High to Low)");

  const roleOptions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI Engineer",
    "DevOps Engineer",
  ];
  const experienceOptions = [
    "Fresher (0 - 1 yr)",
    "1 - 3 Years",
    "3 - 5 Years",
    "5+ Years",
  ];
  const locationOptions = [
    "All Locations",
    "Remote",
    "Bangalore",
    "Chennai",
    "Hyderabad",
    "Mumbai",
    "Worldwide",
  ];
  const sortOptions = [
    "Fit Score (High to Low)",
    "Recently Submitted",
    "Most Experienced",
    "AI Recommended",
  ];

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
        <div className="mb-2 flex items-center gap-2 text-sm text-[#98A4C8]">
          <span className="font-semibold text-blue-400">03</span>
          <span className="text-[#3B5BDB]">/</span>
          <span>Filter by Role / Experience Level</span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-[42px]">
              Find the right fit, faster.
            </h1>
            <p className="mt-3 max-w-sm text-[#98A4C8]">
              Filter candidates based on role and experience level.
            </p>

            {/* filter panel */}
            <div className="mt-6 space-y-5 rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-6 backdrop-blur-xl">
              <SelectField label="Role" value={role} options={roleOptions} onChange={setRole} />
              <SelectField
                label="Experience Level"
                value={experience}
                options={experienceOptions}
                onChange={setExperience}
              />
              <FitScoreSlider value={fitScore} onChange={setFitScore} />
              <SelectField label="Location" value={location} options={locationOptions} onChange={setLocation} />

              <div className="flex gap-3 pt-2">
                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#3B5BDB]/50 hover:bg-white/[0.06]">
                  <SlidersHorizontal className="h-4 w-4" />
                  More Filters
                </button>
                <button className="flex-1 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(99,102,241,0.9)]">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* result summary bar */}
            <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#98A4C8]">
                <span className="font-semibold text-white">62</span> candidates found
              </p>
              <div className="flex items-center gap-2 text-sm text-[#98A4C8]">
                <span>Sorted by:</span>
                <div className="group relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none rounded-xl border border-[#233A73]/60 bg-white/[0.03] py-1.5 pl-3 pr-8 text-sm font-medium text-white outline-none transition-all duration-300 focus:border-blue-500/60"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0a0f24] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#98A4C8]" />
                </div>
              </div>
            </div>
          </div>

          {/* illustration */}
          <div className="hidden lg:block">
            <DiscoveryIllustration />
          </div>
          <div className="block lg:hidden">
            <DiscoveryIllustration />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .fit-score-slider {
          height: 20px;
        }
        .fit-score-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3B82F6, #A855F7);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.8);
          cursor: pointer;
          border: 2px solid #fff;
        }
        .fit-score-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 9999px;
          background: linear-gradient(135deg, #3B82F6, #A855F7);
          box-shadow: 0 0 12px rgba(139, 92, 246, 0.8);
          cursor: pointer;
          border: 2px solid #fff;
        }
        .fit-score-slider::-webkit-slider-runnable-track {
          background: transparent;
        }
        .fit-score-slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}