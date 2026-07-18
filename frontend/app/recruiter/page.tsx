"use client"
import React, { useMemo, useState } from "react";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Plus, Download, Users, MapPin, ShieldCheck, AlertCircle } from "lucide-react";

type Verdict = "Shortlist" | "Strong Fit" | "Potential Fit" | "Needs Review";

interface Candidate {
  id: string;
  name: string;
  role: string;
  avatar: string;
  fitScore: number;
  verdict: Verdict;
  experienceYears: number;
  submittedOn: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Rohit Sharma",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/64?img=12",
    fitScore: 92,
    verdict: "Shortlist",
    experienceYears: 2.4,
    submittedOn: "12 May 2024",
  },
  {
    id: "c2",
    name: "Aditi Verma",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/64?img=32",
    fitScore: 85,
    verdict: "Strong Fit",
    experienceYears: 1.8,
    submittedOn: "11 May 2024",
  },
  {
    id: "c3",
    name: "Sahil Khan",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/64?img=14",
    fitScore: 78,
    verdict: "Potential Fit",
    experienceYears: 1.2,
    submittedOn: "10 May 2024",
  },
  {
    id: "c4",
    name: "Neha Iyer",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/64?img=47",
    fitScore: 64,
    verdict: "Needs Review",
    experienceYears: 0.8,
    submittedOn: "09 May 2024",
  },
  {
    id: "c5",
    name: "Arjun Patel",
    role: "Frontend Developer",
    avatar: "https://i.pravatar.cc/64?img=51",
    fitScore: 58,
    verdict: "Needs Review",
    experienceYears: 0.6,
    submittedOn: "09 May 2024",
  },
];

const VERDICT_STYLES: Record<Verdict, string> = {
  Shortlist: "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "Strong Fit": "text-sky-400 border-sky-400/30 bg-sky-400/10",
  "Potential Fit": "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "Needs Review": "text-rose-400 border-rose-400/30 bg-rose-400/10",
};

function scoreColor(score: number): string {
  if (score >= 85) return "#34d399"; // emerald
  if (score >= 70) return "#38bdf8"; // sky
  if (score >= 60) return "#fbbf24"; // amber
  return "#fb7185"; // rose
}

function FitScoreRing({ score }: { score: number }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreColor(score);

  return (
    <div className="relative h-12 w-12 shrink-0">
      <svg className="h-12 w-12 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r={radius} stroke="#1c2b52" strokeWidth="4" fill="none" />
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <span
        className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}

interface SummaryCardProps {
  label: string;
  value: string;
  meta: string;
  metaTone: "blue" | "green" | "purple" | "orange";
  icon: React.ReactNode;
}

function SummaryCard({ label, value, meta, metaTone, icon }: SummaryCardProps) {
  const iconWrap: Record<SummaryCardProps["metaTone"], string> = {
    blue: "bg-blue-500/15 text-blue-400",
    green: "bg-emerald-500/15 text-emerald-400",
    purple: "bg-violet-500/15 text-violet-400",
    orange: "bg-orange-500/15 text-orange-400",
  };
  const metaText: Record<SummaryCardProps["metaTone"], string> = {
    blue: "text-blue-400",
    green: "text-emerald-400",
    purple: "text-violet-400",
    orange: "text-orange-400",
  };

  return (
    <div className="rounded-3xl border border-[#233A73]/60 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B5BDB]/50 hover:shadow-[0_0_30px_-10px_rgba(59,91,219,0.5)]">
      <div className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl ${iconWrap[metaTone]}`}>
        {icon}
      </div>
      <p className="text-sm text-[#98A4C8]">{label}</p>
      <p className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className={`mt-1 text-xs font-medium ${metaText[metaTone]}`}>{meta}</p>
    </div>
  );
}

export default function AllCandidateReports() {
  const [query, setQuery] = useState("");
  const [sortDesc, setSortDesc] = useState(true);
  const pageSize = 5;
  const totalResults = 642;
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalResults / pageSize);

  const filtered = useMemo(() => {
    const list = CANDIDATES.filter((c) =>
      `${c.name} ${c.role}`.toLowerCase().includes(query.toLowerCase())
    );
    return [...list].sort((a, b) => (sortDesc ? b.fitScore - a.fitScore : a.fitScore - b.fitScore));
  }, [query, sortDesc]);

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

      <div className="relative mx-auto max-w-6xl">
        {/* header */}
        <div className="mb-8 flex items-center gap-2 text-sm text-[#98A4C8]">
          <span className="font-semibold text-white">01</span>
          <span className="text-[#3B5BDB]">/</span>
          <span>Dashboard / Reports List</span>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-[42px]">All Candidate Reports</h1>
          <p className="mt-2 text-[#98A4C8]">A fast, evidence-based fit signal.</p>
        </div>

        {/* summary cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Total Reports"
            value="642"
            meta="+18 this week"
            metaTone="blue"
            icon={<Users className="h-4.5 w-4.5" />}
          />
          <SummaryCard
            label="Strong Fits"
            value="152"
            meta="23.7%"
            metaTone="green"
            icon={<MapPin className="h-4.5 w-4.5" />}
          />
          <SummaryCard
            label="Shortlist"
            value="89"
            meta="13.9%"
            metaTone="purple"
            icon={<ShieldCheck className="h-4.5 w-4.5" />}
          />
          <SummaryCard
            label="Needs Review"
            value="401"
            meta="62.4%"
            metaTone="orange"
            icon={<AlertCircle className="h-4.5 w-4.5" />}
          />
        </div>

        {/* search + actions */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="group relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#98A4C8] transition-colors group-focus-within:text-blue-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, role, skills..."
              className="w-full rounded-2xl border border-[#233A73]/60 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-[#98A4C8] backdrop-blur-xl outline-none transition-all duration-300 focus:border-blue-500/60 focus:shadow-[0_0_0_4px_rgba(59,91,219,0.15)]"
            />
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-2xl border border-[#233A73]/60 bg-white/[0.03] px-5 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition-all duration-300 hover:border-[#3B5BDB]/50 hover:bg-white/[0.06]">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-3.5 text-sm font-medium text-white shadow-[0_0_24px_-6px_rgba(99,102,241,0.7)] transition-all duration-300 hover:shadow-[0_0_32px_-4px_rgba(99,102,241,0.9)]">
              <Plus className="h-4 w-4" />
              Add Filters
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-3xl border border-[#233A73]/60 bg-white/[0.02] backdrop-blur-xl">
          <div className="min-w-[820px] overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#233A73]/60 text-left text-[#98A4C8]">
                  <th className="px-6 py-4 font-medium">Candidate</th>
                  <th className="px-6 py-4 font-medium">Role Applied</th>
                  <th className="px-6 py-4 font-medium">
                    <button
                      onClick={() => setSortDesc((s) => !s)}
                      className="flex items-center gap-1.5 transition-colors hover:text-white"
                    >
                      Fit Score
                      <ArrowUpDown className="h-3.5 w-3.5" />
                    </button>
                  </th>
                  <th className="px-6 py-4 font-medium">Verdict</th>
                  <th className="px-6 py-4 font-medium">Experience</th>
                  <th className="px-6 py-4 font-medium">Submitted On</th>
                  <th className="px-6 py-4 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#233A73]/30 transition-colors duration-200 last:border-b-0 hover:bg-white/[0.03]"
                    style={{ animation: `fadeIn 400ms ease ${i * 60}ms both` }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-9 w-9 rounded-full border border-[#233A73]/60 object-cover"
                        />
                        <span className="font-medium text-white">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#98A4C8]">{c.role}</td>
                    <td className="px-6 py-4">
                      <FitScoreRing score={c.fitScore} />
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${VERDICT_STYLES[c.verdict]}`}
                      >
                        {c.verdict}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#98A4C8]">{c.experienceYears} yrs</td>
                    <td className="px-6 py-4 text-[#98A4C8]">{c.submittedOn}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="inline-flex items-center gap-1 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                        View Report
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-[#98A4C8]">
                      No candidates match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* pagination */}
          <div className="flex flex-col gap-3 border-t border-[#233A73]/60 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-[#98A4C8]">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, totalResults)} of {totalResults} results
            </p>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#233A73]/60 text-[#98A4C8] transition-colors hover:border-blue-500/50 hover:text-white disabled:opacity-40"
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {[1, 2, 3].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                    page === n
                      ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                      : "border border-[#233A73]/60 text-[#98A4C8] hover:border-blue-500/50 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="px-1 text-[#98A4C8]">...</span>
              <button
                onClick={() => setPage(totalPages)}
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium transition-colors ${
                  page === totalPages
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white"
                    : "border border-[#233A73]/60 text-[#98A4C8] hover:border-blue-500/50 hover:text-white"
                }`}
              >
                {totalPages}
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#233A73]/60 text-[#98A4C8] transition-colors hover:border-blue-500/50 hover:text-white disabled:opacity-40"
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
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