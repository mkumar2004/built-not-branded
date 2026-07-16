"use client";
import { useState, useRef } from "react";
import { ArrowRight, BriefcaseBusiness, ChevronDown, Code2, FolderGit2, Link2, Sparkles, Star, Trophy, Upload, FileText, Loader2, CheckCircle2, AlertCircle, ThumbsUp, Target, ArrowUpRight, X, Send, MessageSquare, Bot, User } from "lucide-react";

const roles = ["Frontend Developer", "AI/ML Engineer", "Full-Stack Developer"];
const experienceLevels = [{ label: "Fresher", icon: Trophy }, { label: "1–3 yrs", icon: BriefcaseBusiness }, { label: "Senior", icon: Star }];

export default function Getform() {
  const [repository, setRepository] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [experience, setExperience] = useState("Fresher");
  const [open, setOpen] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [consent, setConsent] = useState(false);
  const fileInputRef = useRef(null);

  // Chat/query state variables
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState(null);
  const [activeTab, setActiveTab] = useState("evaluation");

  const handleFileChange = (e) => { const f = e.target.files?.[0]; if (f) setResumeFile(f); };
  const handleDrop = (e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f && (f.type === "application/pdf" || f.name.endsWith(".txt"))) setResumeFile(f); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) { setError("Please upload your resume (PDF or TXT)."); return; }
    if (!consent) { setError("Please consent to the privacy agreement (DPDP Act)."); return; }
    setLoading(true); setError(null); setResult(null);
    try {
      const fd = new FormData();
      fd.append("resume", resumeFile);
      fd.append("role", role);
      fd.append("experience_level", experience);
      fd.append("github_urls", repository ? JSON.stringify([repository]) : JSON.stringify([]));
      const res = await fetch(`/api/resume/upload`, { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Server error ${res.status}`);
      setResult(json);
      // Initialize chat messages with welcome
      setChatMessages([
        {
          role: "assistant",
          content: `Hi there! I've completed my analysis of your fit for the **${json.report.analysis?.role || json.report.role || role}** position. Ask me anything about your strengths, skill gaps, or how you can improve your profile!`,
        },
      ]);
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const queryText = chatInput.trim();
    setChatInput("");
    setChatError(null);
    setChatMessages((prev) => [...prev, { role: "user", content: queryText }]);
    setChatLoading(true);

    try {
      const res = await fetch(`/api/report/${result.report.id}/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: queryText }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || `Server error ${res.status}`);
      setChatMessages((prev) => [...prev, { role: "assistant", content: json.answer }]);
    } catch (err) {
      setChatError(err.message);
    } finally {
      setChatLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setResumeFile(null);
    setRepository("");
    setChatMessages([]);
    setChatInput("");
    setChatError(null);
  };

  const S = {
    root: { background: "radial-gradient(ellipse at 50% 0%, #0c0a1f 0%, #05050e 100%)", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem", fontFamily: "'Inter', system-ui, sans-serif", color: "#e2e8f0", position: "relative", overflow: "hidden" },
    glow1: { position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,.18), transparent 70%)", top: "5%", left: "15%", filter: "blur(60px)", pointerEvents: "none" },
    glow2: { position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(79,70,229,.12), transparent 70%)", bottom: "5%", right: "10%", filter: "blur(70px)", pointerEvents: "none" },
    main: { position: "relative", width: "100%", maxWidth: 600, zIndex: 2 },
    badge: { display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 99, background: "rgba(124,58,237,.12)", border: "1px solid rgba(124,58,237,.25)", color: "#c084fc", fontSize: "0.7rem", fontWeight: 700, letterSpacing: ".08em", marginBottom: 10 },
    h1: { fontSize: "1.8rem", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1.1, marginBottom: 6, background: "linear-gradient(135deg,#e0e7ff 0%,#c4b5fd 50%,#a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
    sub: { color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.5, marginBottom: 14 },
    card: { background: "rgba(255,255,255,.03)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "20px", boxShadow: "0 20px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.06)" },
    label: { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", fontWeight: 700, color: "#cbd5e1", marginBottom: 6 },
    inputWrap: { display: "flex", alignItems: "center", gap: 12, height: 40, borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", padding: "0 12px", color: "#64748b", marginBottom: 12 },
    input: { flex: 1, border: "none", background: "transparent", outline: "none", color: "#e2e8f0", fontSize: "0.9rem", fontFamily: "inherit" },
    dropBtn: { display: "flex", alignItems: "center", gap: 12, width: "100%", height: 48, borderRadius: 12, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", padding: "0 14px", color: "#94a3b8", fontSize: "0.9rem", cursor: "pointer", textAlign: "left" },
    dropMenu: { position: "absolute", zIndex: 20, width: "100%", borderRadius: 12, border: "1px solid rgba(255,255,255,.1)", background: "rgba(15,15,30,.95)", backdropFilter: "blur(12px)", overflow: "hidden", marginTop: 4, boxShadow: "0 15px 40px rgba(0,0,0,.6)" },
    dropItem: (active) => ({ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 14px", border: "none", background: active ? "rgba(124,58,237,.15)" : "transparent", color: active ? "#c084fc" : "#cbd5e1", fontSize: "0.9rem", cursor: "pointer", textAlign: "left" }),
    expGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 14 },
    expBtn: (active) => ({ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, height: 38, borderRadius: 10, border: active ? "1px solid #7c3aed" : "1px solid rgba(255,255,255,.08)", background: active ? "linear-gradient(135deg,#7c3aed,#6366f1)" : "rgba(255,255,255,.03)", color: active ? "#fff" : "#94a3b8", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", boxShadow: active ? "0 4px 15px rgba(124,58,237,.4)" : "none", transition: "all .2s" }),
    submitBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: 10, width: "100%", height: 46, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#7c3aed 0%,#4f46e5 100%)", color: "#fff", fontSize: "0.9rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 0 25px rgba(124,58,237,.35)", transition: "all .2s" },
    uploadZone: (hasFile) => ({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, borderRadius: 12, border: hasFile ? "2px solid rgba(124,58,237,.4)" : "2px dashed rgba(255,255,255,.1)", background: hasFile ? "rgba(124,58,237,.08)" : "rgba(255,255,255,.02)", padding: "14px", cursor: "pointer", marginBottom: 12, transition: "all .2s" }),
    errBox: { display: "flex", alignItems: "center", gap: 10, borderRadius: 10, border: "1px solid rgba(239,68,68,.25)", background: "rgba(239,68,68,.08)", padding: "8px 12px", marginBottom: 10, color: "#fca5a5", fontSize: "0.8rem" },
    benefitGrid: { display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 28 },
    benefitCard: { display: "flex", gap: 12, padding: "0 16px", borderRight: "1px solid rgba(255,255,255,.06)" },
    benefitIcon: { width: 40, height: 40, borderRadius: "50%", background: "rgba(124,58,237,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", flexShrink: 0 },
    chatContainer: { marginTop: 24, borderTop: "1px solid rgba(255,255,255,.08)", paddingTop: 24, marginBottom: 20 },
    chatHeader: { display: "flex", alignItems: "center", gap: 8, fontSize: "0.95rem", fontWeight: 700, color: "#cbd5e1", marginBottom: 16 },
    chatArea: { display: "flex", flexDirection: "column", gap: 12, maxHeight: 300, overflowY: "auto", paddingRight: 8, marginBottom: 16 },
    msgBubble: (isUser) => ({
      display: "flex",
      flexDirection: "column",
      alignSelf: isUser ? "flex-end" : "flex-start",
      maxWidth: "85%",
      borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
      background: isUser ? "linear-gradient(135deg, #7c3aed, #4f46e5)" : "rgba(255,255,255,.05)",
      border: isUser ? "none" : "1px solid rgba(255,255,255,.08)",
      padding: "10px 14px",
      color: "#e2e8f0",
      fontSize: "0.85rem",
      lineHeight: 1.5,
      boxShadow: "0 4px 15px rgba(0,0,0,.15)"
    }),
    chatForm: { display: "flex", gap: 8 },
    chatInput: { flex: 1, height: 44, borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.03)", padding: "0 14px", color: "#e2e8f0", fontSize: "0.85rem", outline: "none" },
    chatSendBtn: { display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, border: "none", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", cursor: "pointer", transition: "all .2s" },
  };

  // ─── RESULT VIEW ─────────────────────────────────────────
  if (result) {
    const { report, ai_provider_used } = result;
    const a = report.analysis || {};

    const handleQuestionClick = (qText) => {
      setChatInput(`Regarding question: "${qText}"\n\nHere is my thoughts: `);
    };

    return (
      <div style={{ ...S.root, padding: "1.5rem" }}>
        <div style={S.glow1} /><div style={S.glow2} />
        
        <main style={{ position: "relative", width: "100%", maxWidth: "1200px", height: "90vh", display: "flex", flexDirection: "column", gap: 16, zIndex: 2 }}>
          {/* Top header bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,.06)", paddingBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ ...S.badge, margin: 0 }}><Sparkles size={11} /><span>AI ANALYSIS COMPLETE</span></div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>SkillFit Evaluation Report</h2>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
              Report ID: <span style={{ fontFamily: "monospace", color: "#a78bfa" }}>{report.id}</span>
            </div>
          </div>

          {/* Grid Layout */}
          <div style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, flex: 1, minHeight: 0 }}>
            
            {/* Left Column: Profile & Fit Score Card */}
            <div style={{ background: "rgba(255,255,255,.02)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "16px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
              
              {/* Score Display */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(124,58,237,.06)", border: "1px solid rgba(124,58,237,.2)", borderRadius: 12, padding: "12px" }}>
                <div style={{ position: "relative", width: 64, height: 64, borderRadius: "50%", background: `conic-gradient(#7c3aed 0% ${a.fit_score || 0}%, rgba(255,255,255,.05) ${a.fit_score || 0}% 100%)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 15px rgba(124,58,237,.2)" }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#090816", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 900, color: "#fff" }}>{a.fit_score ?? "—"}</span>
                    <span style={{ fontSize: "0.5rem", color: "#a78bfa", fontWeight: 700, marginTop: -2 }}>SCORE</span>
                  </div>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <p style={{ fontSize: ".65rem", color: "#64748b", textTransform: "uppercase", fontWeight: 800, letterSpacing: "0.05em", margin: 0 }}>Target Role</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 700, color: "#e2e8f0", margin: "2px 0 0 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.role || report.role}</p>
                  <p style={{ fontSize: ".7rem", color: "#94a3b8", margin: "2px 0 0 0" }}>Experience: {a.experience_level || report.experience_level}</p>
                </div>
              </div>

              {/* Strengths & Gaps lists */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {a.strengths?.length > 0 && (
                  <div>
                    <h4 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".8rem", fontWeight: 700, color: "#10b981", margin: "0 0 8px 0" }}>
                      <ThumbsUp size={13} /> Core Strengths
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {a.strengths.slice(0, 3).map((s, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, fontSize: ".75rem", color: "#a7f3d0", background: "rgba(16,185,129,.04)", border: "1px solid rgba(16,185,129,.1)", borderRadius: 8, padding: "8px" }}>
                          <CheckCircle2 size={13} style={{ flexShrink: 0, marginTop: 1, color: "#10b981" }} />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {a.gaps?.length > 0 && (
                  <div>
                    <h4 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".8rem", fontWeight: 700, color: "#f59e0b", margin: "0 0 8px 0" }}>
                      <AlertCircle size={13} /> Areas to Improve
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                      {a.gaps.slice(0, 3).map((g, i) => (
                        <div key={i} style={{ display: "flex", gap: 6, fontSize: ".75rem", color: "#fde68a", background: "rgba(245,158,11,.04)", border: "1px solid rgba(245,158,11,.1)", borderRadius: 8, padding: "8px" }}>
                          <AlertCircle size={13} style={{ flexShrink: 0, marginTop: 1, color: "#f59e0b" }} />
                          <span>{g}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reset Action */}
              <div style={{ paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <button onClick={handleReset} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, width: "100%", height: 36, borderRadius: 10, border: "1px solid rgba(255,255,255,.08)", background: "rgba(255,255,255,.02)", color: "#cbd5e1", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>
                  Upload Another Resume
                </button>
              </div>
            </div>

            {/* Right Column: Tabbed Deep-dive Info & AI Q&A Chat */}
            <div style={{ background: "rgba(255,255,255,.02)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "16px", display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
              
              {/* Tab Navigation */}
              <div style={{ display: "flex", gap: 6, borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 10 }}>
                <button onClick={() => setActiveTab("evaluation")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: activeTab === "evaluation" ? "rgba(124,58,237,.14)" : "transparent", color: activeTab === "evaluation" ? "#c084fc" : "#94a3b8", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all .2s" }}>
                  <FolderGit2 size={14} /> Technical Evaluation
                </button>
                <button onClick={() => setActiveTab("interview")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "none", background: activeTab === "interview" ? "rgba(124,58,237,.14)" : "transparent", color: activeTab === "interview" ? "#c084fc" : "#94a3b8", fontWeight: 600, fontSize: "0.8rem", cursor: "pointer", transition: "all .2s" }}>
                  <MessageSquare size={14} /> Live AI Interview Prep
                </button>
              </div>

              {/* Tab Panel Body */}
              <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
                
                {activeTab === "evaluation" ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto", height: "100%", paddingRight: 6 }}>
                    {/* Verdict */}
                    {a.verdict && (
                      <div style={{ borderRadius: 12, border: "1px solid rgba(124,58,237,.15)", background: "rgba(124,58,237,.03)", padding: 12 }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#c4b5fd", margin: "0 0 6px 0" }}><Target size={14} /> AI Verdict</h3>
                        <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.verdict}</p>
                      </div>
                    )}

                    {/* Project Quality */}
                    {a.project_evaluation && (
                      <div style={{ borderRadius: 12, border: "1px solid rgba(16,185,129,.15)", background: "rgba(16,185,129,.03)", padding: 12 }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#34d399", margin: "0 0 6px 0" }}><FolderGit2 size={14} /> Project &amp; Code Quality Evaluation</h3>
                        <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.project_evaluation}</p>
                      </div>
                    )}

                    {/* Next Steps */}
                    {a.next_step && (
                      <div style={{ borderRadius: 12, border: "1px solid rgba(99,102,241,.15)", background: "rgba(99,102,241,.03)", padding: 12 }}>
                        <h3 style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".85rem", fontWeight: 700, color: "#818cf8", margin: "0 0 6px 0" }}><ArrowUpRight size={14} /> Recommended Next Step</h3>
                        <p style={{ fontSize: ".8rem", color: "#cbd5e1", lineHeight: 1.5, margin: 0 }}>{a.next_step}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%", minHeight: 0 }}>
                    
                    {/* Horizontal Questions Header */}
                    {a.technical_questions?.length > 0 && (
                      <div style={{ borderBottom: "1px solid rgba(255,255,255,.04)", paddingBottom: 8 }}>
                        <p style={{ fontSize: ".7rem", color: "#fcd34d", margin: "0 0 6px 0", fontWeight: 600 }}>
                          Click a generated question to answer it or discuss with the SkillFit AI assistant:
                        </p>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                          {a.technical_questions.map((q, i) => (
                            <button key={i} onClick={() => handleQuestionClick(q)} style={{ display: "flex", flexDirection: "column", textAlign: "left", gap: 3, padding: "8px", background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 8, cursor: "pointer", transition: "all .2s" }} onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(251,191,36,.4)"} onMouseOut={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,.06)"}>
                              <span style={{ fontSize: "0.65rem", fontWeight: 800, color: "#fbbf24" }}>QUESTION {i+1}</span>
                              <span style={{ fontSize: "0.7rem", color: "#cbd5e1", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1.3 }}>{q}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Integrated Chat Box */}
                    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, background: "rgba(0,0,0,.15)", borderRadius: 10, padding: 10 }}>
                      <div style={{ ...S.chatArea, maxHeight: "none", flex: 1, overflowY: "auto", marginBottom: 10 }}>
                        {chatMessages.map((msg, i) => (
                          <div key={i} style={S.msgBubble(msg.role === "user")}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2, opacity: 0.8, fontSize: "0.6rem", fontWeight: 600 }}>
                              {msg.role === "user" ? <User size={10} /> : <Bot size={10} />}
                              <span>{msg.role === "user" ? "You" : "SkillFit AI"}</span>
                            </div>
                            <div style={{ fontSize: "0.8rem", whiteSpace: "pre-wrap" }}>{msg.content}</div>
                          </div>
                        ))}
                        {chatLoading && (
                          <div style={S.msgBubble(false)}>
                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 2, opacity: 0.8, fontSize: "0.6rem", fontWeight: 600 }}>
                              <Bot size={10} />
                              <span>SkillFit AI</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem" }}>
                              <Loader2 size={12} style={{ animation: "spin 1s linear infinite" }} />
                              <span>Evaluating response...</span>
                            </div>
                          </div>
                        )}
                        {chatError && (
                          <div style={{ color: "#fca5a5", fontSize: "0.75rem", padding: "6px 10px", background: "rgba(239,68,68,.08)", borderRadius: 6, border: "1px solid rgba(239,68,68,.2)" }}>
                            {chatError}
                          </div>
                        )}
                      </div>
                      
                      <form onSubmit={handleQuerySubmit} style={S.chatForm}>
                        <input
                          style={{ ...S.chatInput, height: 38 }}
                          value={chatInput}
                          onChange={(e) => setChatInput(e.target.value)}
                          placeholder="Type or click a question above to start mock interview..."
                          disabled={chatLoading}
                        />
                        <button type="submit" style={{ ...S.chatSendBtn, width: 38, height: 38, opacity: chatLoading ? 0.7 : 1 }} disabled={chatLoading}>
                          <Send size={14} />
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Footer Info */}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.05)", fontSize: ".7rem", color: "#64748b" }}>
                <span>Powered by {ai_provider_used}</span>
                <span>DPDP Act Compliant</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ─── FORM VIEW ───────────────────────────────────────────
  return (
    <div style={S.root}>
      <div style={S.glow1} /><div style={S.glow2} />
      <main style={S.main}>
        {/* Compact Header */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ ...S.badge, margin: "0 auto 10px" }}><Sparkles size={12} /><span>SKILL-FIRST EVALUATION</span></div>
          <h1 style={S.h1}>Show Us What You&apos;ve Built</h1>
          <p style={S.sub}>Upload your resume &amp; GitHub repo — AI judges your skills, not your marks.</p>
        </div>

        <form style={S.card} onSubmit={handleSubmit}>
          {/* Resume Upload — compact horizontal */}
          <div style={S.label}><span>Resume (PDF)</span><FileText size={14} /></div>
          <div style={S.uploadZone(!!resumeFile)} onClick={() => fileInputRef.current?.click()} onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
            <input ref={fileInputRef} type="file" accept=".pdf,.txt" style={{ display: "none" }} onChange={handleFileChange} />
            {resumeFile ? (
              <>
                <FileText size={18} style={{ color: "#a78bfa", flexShrink: 0 }} />
                <span style={{ fontSize: ".85rem", fontWeight: 600, color: "#c084fc", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resumeFile.name}</span>
                <button type="button" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }} style={{ background: "none", border: "none", color: "#64748b", cursor: "pointer", padding: 2, flexShrink: 0 }}><X size={14} /></button>
              </>
            ) : (
              <>
                <Upload size={18} style={{ color: "#64748b", flexShrink: 0 }} />
                <span style={{ fontSize: ".85rem", color: "#64748b" }}>Click or drag &amp; drop your resume</span>
                <span style={{ fontSize: ".7rem", color: "#475569", marginLeft: "auto" }}>PDF max 10MB</span>
              </>
            )}
          </div>

          {/* GitHub */}
          <div style={S.label}><span>GitHub Repository</span><span style={{ fontSize: ".7rem", fontWeight: 400, color: "#64748b" }}>(optional)</span></div>
          <div style={S.inputWrap}>
            <Link2 size={16} />
            <input style={S.input} value={repository} onChange={(e) => setRepository(e.target.value)} placeholder="https://github.com/username/project" type="url" />
          </div>

          {/* Role + Experience side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            <div>
              <div style={S.label}><span>Target Role</span></div>
              <div style={{ position: "relative" }}>
                <button type="button" style={{ ...S.dropBtn, height: 38, borderRadius: 10, fontSize: "0.82rem" }} onClick={() => setOpen(!open)}>
                  <BriefcaseBusiness size={15} />
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{role}</span>
                  <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
                </button>
                {open && <div style={S.dropMenu}>
                  {roles.map((item) => <button key={item} type="button" style={S.dropItem(item === role)} onClick={() => { setRole(item); setOpen(false); }}><Code2 size={14} />{item}</button>)}
                </div>}
              </div>
            </div>
            <div>
              <div style={S.label}><span>Experience Level</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5 }}>
                {experienceLevels.map(({ label, icon: Icon }) => (
                  <button key={label} type="button" style={{ ...S.expBtn(experience === label), height: 38, fontSize: "0.75rem" }} onClick={() => setExperience(label)}><Icon size={13} />{label}</button>
                ))}
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14, cursor: "pointer" }} onClick={() => setConsent(!consent)}>
            <input type="checkbox" checked={consent} onChange={() => {}} style={{ cursor: "pointer", accentColor: "#7c3aed", width: 14, height: 14 }} />
            <label style={{ fontSize: "0.75rem", color: "#64748b", lineHeight: 1.3, cursor: "pointer" }}>
              I consent to data analysis under India&apos;s <strong style={{ color: "#94a3b8" }}>DPDP Act</strong> for recruitment.
            </label>
          </div>

          {/* Error */}
          {error && <div style={S.errBox}><AlertCircle size={14} style={{ color: "#ef4444", flexShrink: 0 }} />{error}</div>}

          {/* Submit */}
          <button type="submit" disabled={loading} style={{ ...S.submitBtn, opacity: loading ? .7 : 1 }}>
            {loading ? <><Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} />Analyzing — ~15 seconds...</> : <>Analyze My Work <ArrowRight size={17} /></>}
          </button>

          {/* Benefits row inside card */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0, marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.06)" }}>
            {[{ icon: FolderGit2, t: "GitHub Analysis", d: "Code quality checked" },
              { icon: Sparkles, t: "AI Evaluation", d: "Skill-based, not marks" },
              { icon: Code2, t: "Instant Report", d: "Score + next steps" }
            ].map(({ icon: I, t, d }, idx) => (
              <div key={t} style={{ display: "flex", gap: 8, padding: "0 12px", borderRight: idx < 2 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(124,58,237,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#a78bfa", flexShrink: 0 }}><I size={14} /></div>
                <div><p style={{ fontSize: ".7rem", fontWeight: 700, marginBottom: 2 }}>{t}</p><p style={{ fontSize: ".62rem", color: "#64748b", lineHeight: 1.4 }}>{d}</p></div>
              </div>
            ))}
          </div>
          <style>{`@keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}`}</style>
        </form>
      </main>
    </div>
  );
}
