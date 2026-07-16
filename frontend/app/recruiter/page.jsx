"use client";
import { useState, useEffect } from "react";
import { 
  BriefcaseBusiness, Search, Sparkles, Star, Trophy, 
  CheckCircle2, AlertCircle, ThumbsUp, Target, 
  ArrowUpRight, FolderGit2, Loader2, ArrowRight, UserCheck, RefreshCw
} from "lucide-react";

export default function RecruiterDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/report");
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      // Sort: Completed analyses first, then by fit_score descending, then by date descending
      const sorted = data.sort((a, b) => {
        const scoreA = a.analysis?.fit_score || 0;
        const scoreB = b.analysis?.fit_score || 0;
        if (scoreA !== scoreB) return scoreB - scoreA;
        return new Date(b.created_at) - new Date(a.created_at);
      });
      setReports(sorted);
      if (sorted.length > 0 && !selectedReport) {
        setSelectedReport(sorted[0]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const rolesList = ["All", "Frontend Developer", "AI/ML Engineer", "Full-Stack Developer", "Senior Developer"];

  const filteredReports = reports.filter(r => {
    const roleMatches = roleFilter === "All" || r.role === roleFilter || (r.analysis?.role === roleFilter);
    const searchLower = searchTerm.toLowerCase();
    const searchMatches = !searchTerm || 
      r.id.toLowerCase().includes(searchLower) ||
      (r.email && r.email.toLowerCase().includes(searchLower)) ||
      (r.role && r.role.toLowerCase().includes(searchLower));
    return roleMatches && searchMatches;
  });

  const S = {
    root: { background: "radial-gradient(ellipse at 50% 0%, #0c0a1f 0%, #05050e 100%)", height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', system-ui, sans-serif", color: "#e2e8f0", overflow: "hidden" },
    glow1: { position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,.12), transparent 70%)", top: "-10%", left: "10%", filter: "blur(60px)", pointerEvents: "none", zIndex: 1 },
    header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid rgba(255,255,255,.06)", zIndex: 2, background: "rgba(10,10,25,.4)", backdropFilter: "blur(12px)" },
    main: { flex: 1, display: "grid", gridTemplateColumns: "360px 1fr", minHeight: 0, zIndex: 2 },
    sidebar: { borderRight: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", minHeight: 0, background: "rgba(255,255,255,.01)" },
    searchWrap: { padding: "14px", display: "flex", flexDirection: "column", gap: 10, borderBottom: "1px solid rgba(255,255,255,.04)" },
    searchBar: { display: "flex", alignItems: "center", gap: 8, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", padding: "0 10px", color: "#64748b" },
    input: { flex: 1, border: "none", background: "transparent", outline: "none", color: "#e2e8f0", fontSize: "0.8rem" },
    list: { flex: 1, overflowY: "auto", padding: "10px" },
    card: (active) => ({ display: "flex", flexDirection: "column", gap: 8, padding: "14px", borderRadius: 12, border: active ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,.04)", background: active ? "rgba(124,58,237,.08)" : "rgba(255,255,255,.01)", cursor: "pointer", transition: "all .2s", marginBottom: 8 }),
    contentArea: { display: "flex", flexDirection: "column", minHeight: 0, padding: "20px" },
    badge: { display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 99, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.2)", color: "#c084fc", fontSize: "0.65rem", fontWeight: 700 },
  };

  return (
    <div style={S.root}>
      <div style={S.glow1} />
      
      {/* Header */}
      <header style={S.header}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <UserCheck size={24} style={{ color: "#a78bfa" }} />
          <div>
            <h1 style={{ fontSize: "1.1rem", fontWeight: 800, margin: 0 }}>SkillFit Recruiter Dashboard</h1>
            <p style={{ fontSize: "0.65rem", color: "#64748b", margin: 0 }}>Skills-Over-Marks Talent Evaluation Console</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={fetchReports} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)", color: "#94a3b8", fontSize: "0.75rem", borderRadius: 8, cursor: "pointer", transition: "all .2s" }}>
            <RefreshCw size={12} /> Refresh
          </button>
          <a href="/candidate" style={{ fontSize: "0.75rem", color: "#a78bfa", textDecoration: "none", fontWeight: 600 }}>Candidate Portal &rarr;</a>
        </div>
      </header>

      {/* Main Grid */}
      <main style={S.main}>
        
        {/* Left Sidebar: Candidate List */}
        <div style={S.sidebar}>
          <div style={S.searchWrap}>
            <div style={S.searchBar}>
              <Search size={14} />
              <input style={S.input} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search candidate ID or role..." />
            </div>
            {/* Filter tags */}
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4 }}>
              {rolesList.map(roleOpt => (
                <button key={roleOpt} onClick={() => setRoleFilter(roleOpt)} style={{ border: "none", background: roleFilter === roleOpt ? "rgba(124,58,237,.2)" : "rgba(255,255,255,.03)", color: roleFilter === roleOpt ? "#c084fc" : "#64748b", padding: "4px 8px", borderRadius: 6, fontSize: "0.65rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                  {roleOpt}
                </button>
              ))}
            </div>
          </div>

          <div style={S.list}>
            {loading ? (
              <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
                <Loader2 size={24} style={{ animation: "spin 1s linear infinite", color: "#7c3aed" }} />
              </div>
            ) : filteredReports.length === 0 ? (
              <div style={{ textAlign: "center", color: "#64748b", padding: "40px 10px", fontSize: "0.8rem" }}>
                No candidate reports match your filter criteria.
              </div>
            ) : (
              filteredReports.map(r => {
                const a = r.analysis || {};
                const hasScore = typeof a.fit_score === "number";
                return (
                  <div key={r.id} onClick={() => setSelectedReport(r)} style={S.card(selectedReport?.id === r.id)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: "#a78bfa" }}>
                        {r.id.split("-")[0]}
                      </span>
                      {hasScore ? (
                        <span style={{ fontSize: "0.8rem", fontWeight: 800, color: a.fit_score >= 80 ? "#10b981" : a.fit_score >= 60 ? "#f59e0b" : "#6366f1" }}>
                          {a.fit_score} Fit Score
                        </span>
                      ) : (
                        <span style={{ fontSize: "0.65rem", color: "#64748b" }}>Pending</span>
                      )}
                    </div>
                    
                    <h4 style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0, color: "#cbd5e1" }}>
                      {r.role}
                    </h4>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.7rem", color: "#64748b" }}>
                      <span>Exp: {r.experience_level}</span>
                      <span>{new Date(r.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Detail View */}
        <div style={S.contentArea}>
          {selectedReport ? (() => {
            const a = selectedReport.analysis || {};
            const isPending = !selectedReport.analysis;

            return (
              <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
                {/* Profile overview row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: 16, marginBottom: 16 }}>
                  <div>
                    <h2 style={{ fontSize: "1.3rem", fontWeight: 800, margin: 0, color: "#fff" }}>
                      Candidate ID: {selectedReport.id.split("-")[0]}
                    </h2>
                    <p style={{ fontSize: "0.75rem", color: "#94a3b8", margin: "4px 0 0 0" }}>
                      Targeting: <span style={{ color: "#a78bfa", fontWeight: 600 }}>{selectedReport.role}</span> | Experience Level: <span style={{ color: "#cbd5e1", fontWeight: 600 }}>{selectedReport.experience_level}</span>
                    </p>
                  </div>
                  {a.fit_score !== undefined && (
                    <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(124,58,237,.06)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 10, padding: "8px 16px" }}>
                      <span style={{ fontSize: "1.8rem", fontWeight: 900, color: "#c084fc" }}>{a.fit_score}</span>
                      <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.1em" }}>FIT SCORE</span>
                    </div>
                  )}
                </div>

                {isPending ? (
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "#64748b" }}>
                    <AlertCircle size={32} />
                    <p style={{ fontSize: "0.85rem" }}>This candidate profile upload is incomplete or analysis failed.</p>
                  </div>
                ) : (
                  <div style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingRight: 6 }}>
                    
                    {/* Left Column: AI Verdict & Project Quality */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      
                      {/* AI Verdict */}
                      {a.verdict && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(124,58,237,.15)", background: "rgba(124,58,237,.03)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#c4b5fd", margin: "0 0 6px 0" }}><Target size={14} /> AI Verdict</h3>
                          <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.verdict}</p>
                        </div>
                      )}

                      {/* Project Evaluation */}
                      {a.project_evaluation && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(16,185,129,.15)", background: "rgba(16,185,129,.03)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#34d399", margin: "0 0 6px 0" }}><FolderGit2 size={14} /> Project &amp; Code Quality Evaluation</h3>
                          <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.project_evaluation}</p>
                        </div>
                      )}

                      {/* Next Steps */}
                      {a.next_step && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(99,102,241,.15)", background: "rgba(99,102,241,.03)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#818cf8", margin: "0 0 6px 0" }}><ArrowUpRight size={14} /> Recommended Next Step</h3>
                          <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.next_step}</p>
                        </div>
                      )}
                    </div>

                    {/* Right Column: Strengths, Gaps & Interview Prep */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      
                      {/* Strengths */}
                      {a.strengths?.length > 0 && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(16,185,129,.1)", background: "rgba(16,185,129,.01)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#10b981", margin: "0 0 8px 0" }}><ThumbsUp size={14} /> Core Strengths</h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {a.strengths.map((s, i) => (
                              <div key={i} style={{ display: "flex", gap: 6, fontSize: ".75rem", color: "#a7f3d0" }}>
                                <CheckCircle2 size={13} style={{ flexShrink: 0, marginTop: 1, color: "#10b981" }} />
                                <span>{s}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Gaps */}
                      {a.gaps?.length > 0 && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(245,158,11,.1)", background: "rgba(245,158,11,.01)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#f59e0b", margin: "0 0 8px 0" }}><AlertCircle size={14} /> Areas to Improve</h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {a.gaps.map((g, i) => (
                              <div key={i} style={{ display: "flex", gap: 6, fontSize: ".75rem", color: "#fde68a" }}>
                                <AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1, color: "#f59e0b" }} />
                                <span>{g}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Interview Questions */}
                      {a.technical_questions?.length > 0 && (
                        <div style={{ borderRadius: 12, border: "1px solid rgba(251,191,36,.15)", background: "rgba(251,191,36,.02)", padding: 14 }}>
                          <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#fbbf24", margin: "0 0 8px 0" }}><Sparkles size={14} /> AI-Generated Interview Questions</h3>
                          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {a.technical_questions.map((q, i) => (
                              <div key={i} style={{ display: "flex", gap: 6, padding: "8px", background: "rgba(0,0,0,.15)", borderRadius: 8, fontSize: ".75rem", color: "#cbd5e1" }}>
                                <span style={{ fontWeight: 800, color: "#fbbf24" }}>Q{i+1}:</span>
                                <span>{q}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })() : (
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, color: "#64748b" }}>
              <UserCheck size={48} />
              <p style={{ fontSize: "0.9rem" }}>Select a candidate from the sidebar list to view their skill-first fit analysis.</p>
            </div>
          )}
        </div>

      </main>
      <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
