"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  X,
  Code2,
  ShieldCheck,
  BarChart3,
  Zap,
  Brain,
  GitBranch,
  GitPullRequest,
  GitCommit,
  ArrowUpRight,
  Lock,
  AlertCircle,
  ThumbsUp,
  Star,
  HelpCircle,
  Send,
  Terminal,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Logo Component                                                    */
/* ------------------------------------------------------------------ */
const Logo = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#4F46E5" />
        <stop offset="100%" stopColor="#7C3AED" />
      </linearGradient>
    </defs>
    <path
      d="M24 2 L44 14 L44 24 L24 36 L4 24 L4 14 Z"
      fill="url(#logoGrad)"
    />
    <path
      d="M24 12 L36 19 L36 29 L24 36 L24 26 L14 20.5 Z"
      fill="#05050a"
      opacity="0.4"
    />
    <path
      d="M14 26 Q24 30 34 26"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
      opacity="0.9"
    />
  </svg>
);

export default function SkillFitLanding() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [previewTab, setPreviewTab] = useState("report");

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="landing-root">
      {/* ------------------------------------------------------------ */}
      {/* 1. Sticky Navigation                                         */}
      {/* ------------------------------------------------------------ */}
      <header className="header-glass">
        <div className="container navbar">
          <a href="#" className="footer-logo-title" style={{ textDecoration: "none" }}>
            <Logo size={32} />
            <span style={{ fontSize: "1.35rem", tracking: "-0.02em" }}>SkillFit</span>
          </a>

          <nav className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#comparison" className="nav-link">Traditional vs SkillFit</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#preview" className="nav-link">Platform Preview</a>
            <a href="#benefits" className="nav-link">Benefits</a>
            <a href="#testimonials" className="nav-link">Testimonials</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
        </div>
      </header>

      {/* Ambient background glows */}
      <div className="glow-blob glow-indigo" style={{ top: "10%", right: "5%", width: "500px", height: "500px" }} />
      <div className="glow-blob glow-purple" style={{ top: "35%", left: "-10%", width: "600px", height: "600px" }} />
      <div className="glow-blob glow-indigo" style={{ bottom: "20%", right: "-10%", width: "500px", height: "500px" }} />

      {/* ------------------------------------------------------------ */}
      {/* 2. Hero Section                                              */}
      {/* ------------------------------------------------------------ */}
      <section className="container" style={{ padding: "6rem 0 8rem" }}>
        <div className="grid-2" style={{ alignItems: "center" }}>
          {/* Left Hero Details */}
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "99px", background: "rgba(79, 70, 229, 0.1)", border: "1px solid rgba(79, 70, 229, 0.2)", fontSize: "0.85rem", color: "var(--accent)", marginBottom: "1.5rem" }}>
              <Sparkles size={14} />
              <span>Next-Gen Project-Based Recruitment</span>
            </div>
            
            <h1 className="hero-title" style={{ marginBottom: "1.5rem" }}>
              Judged by Real Work,<br />
              <span className="text-gradient">Not Paperwork.</span>
            </h1>

            <p className="subtitle" style={{ marginBottom: "2.5rem", maxWidth: "540px" }}>
              SkillFit helps companies discover exceptional developers using AI-powered skill evaluation, GitHub analysis, coding assessments, and project-based hiring.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "3rem" }}>
               <a href="/get-started" className="btn btn-primary">Get Started <ArrowRight size={17} /></a>
            </div>

            {/* Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-tertiary)", fontWeight: "700" }}>Compliance & Security</span>
              <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", opacity: "0.7" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <Lock size={14} className="text-gradient" />
                  <span>SOC2 Certified</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  <ShieldCheck size={14} className="text-gradient" />
                  <span>GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Illustration */}
          <div className="hero-visual-wrapper">
            {/* SVG Connecting Lines (Dotted connectors from screen to far-right badges) */}
            <svg className="svg-connectors">
              <path d="M 420 185 Q 465 185 500 120" className="connector-line" />
              <path d="M 420 250 Q 465 250 500 240" className="connector-line" />
              <path d="M 420 315 Q 465 315 500 360" className="connector-line" />
            </svg>

            {/* Diagonal Laser Beam Divider */}
            <div className="diagonal-laser-beam" />

            {/* Left Legacy Paperwork Bin */}
            <div className="legacy-bin-container">
              <div className="legacy-bin">
                <span className="bin-label">NOT SHORTLISTED</span>
                
                {/* Resume Paper */}
                <div className="legacy-paper resume">
                  <div className="paper-title">Resume</div>
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.5rem" }}>
                    <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#cbd5e1" }} />
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                      <div style={{ width: "35px", height: "3px", background: "#94a3b8", borderRadius: "2px" }} />
                      <div style={{ width: "20px", height: "2px", background: "#cbd5e1", borderRadius: "2px" }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                    <div style={{ width: "100%", height: "3px", background: "#e2e8f0", borderRadius: "1px" }} />
                    <div style={{ width: "95%", height: "3px", background: "#e2e8f0", borderRadius: "1px" }} />
                    <div style={{ width: "80%", height: "3px", background: "#e2e8f0", borderRadius: "1px" }} />
                    <div style={{ width: "85%", height: "3px", background: "#e2e8f0", borderRadius: "1px" }} />
                  </div>
                  <span className="paper-rejected-stamp">REJECTED</span>
                </div>

                {/* Marksheet Paper */}
                <div className="legacy-paper marksheet">
                  <div className="paper-title">Marksheet</div>
                  <div style={{ marginTop: "0.4rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <div>
                      <p style={{ fontSize: "0.55rem", color: "#64748b", margin: 0 }}>Percentage</p>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: "800", color: "#dc2626", margin: 0, lineHeight: 1.1 }}>62%</h4>
                    </div>
                    <div style={{ width: "100%", height: "1px", background: "#e2e8f0" }} />
                    <p style={{ fontSize: "0.48rem", color: "#94a3b8", margin: 0 }}>College: Tier 3 Engineering</p>
                  </div>
                </div>

                {/* College Certificate Paper */}
                <div className="legacy-paper certificate">
                  <div className="paper-title">College Certificate</div>
                  <p style={{ fontSize: "0.5rem", color: "#64748b", margin: "0.2rem 0 0" }}>This certifies that the candidate has completed a Bachelor of Tech Degree.</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.4rem" }}>
                    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#94a3b8" }} />
                    <span style={{ fontSize: "0.45rem", color: "#94a3b8" }}>Class of 2024</span>
                  </div>
                </div>

                {/* Box/Bin Front Panel Details */}
                <div style={{ position: "absolute", bottom: "12px", right: "12px", width: "24px", height: "24px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.15)", border: "1px solid rgba(239, 68, 68, 0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <X size={12} style={{ color: "#f87171" }} />
                </div>
              </div>

              {/* Crumpled paper balls outside bin */}
              <div className="crumpled-ball" style={{ bottom: "-8px", left: "-15px" }} />
              <div className="crumpled-ball" style={{ bottom: "-12px", left: "20px", width: "22px", height: "22px" }} />
              <div className="crumpled-ball" style={{ bottom: "-5px", right: "-10px", width: "25px", height: "25px" }} />
            </div>

            {/* Right SkillFit 3D Perspective Laptop */}
            <div className="premium-laptop-3d">
              <div className="laptop-shell-3d">
                <div className="laptop-screen-header">
                  <div className="laptop-dot red" />
                  <div className="laptop-dot yellow" />
                  <div className="laptop-dot green" />
                  <div style={{ display: "flex", gap: "0.3rem", alignItems: "center", marginLeft: "1.5rem" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: "var(--text-tertiary)" }} />
                    <span style={{ fontSize: "0.62rem", color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}>solution.js</span>
                  </div>
                </div>
                <div className="laptop-screen-content">
                  {/* Left: Code Pane */}
                  <div className="code-pane-high">
                    <p style={{ color: "#64748b", marginBottom: "0.5rem" }}>solution.js</p>
                    <span style={{ color: "#f472b6" }}>function</span> <span style={{ color: "#60a5fa" }}>twoSum</span>(nums, target) &#123;<br />
                    &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>let</span> map = &#123;&#125;;<br />
                    &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>for</span> (<span style={{ color: "#f472b6" }}>let</span> i = <span style={{ color: "#f59e0b" }}>0</span>; i &lt; nums.length; i++) &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#f472b6" }}>let</span> diff = target - nums[i];<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#f472b6" }}>if</span> (map[diff] !== <span style={{ color: "#60a5fa" }}>undefined</span>) &#123;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: "#f472b6" }}>return</span> [map[diff], i];<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;map[nums[i]] = i;<br />
                    &nbsp;&nbsp;&#125;<br />
                    &nbsp;&nbsp;<span style={{ color: "#f472b6" }}>return</span> [];<br />
                    &#125;<span className="typing-cursor" />
                  </div>

                  {/* Right: GitHub Evaluation Pane */}
                  <div className="eval-pane" style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                    {/* GitHub Info Card */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", fontWeight: "600", color: "white" }}>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </div>
                      <span style={{ fontSize: "0.62rem", fontFamily: "var(--font-mono)", color: "var(--text-tertiary)" }}>awesome-developer</span>
                      <div style={{ display: "flex", gap: "0.5rem", fontSize: "0.55rem", color: "var(--text-tertiary)", marginTop: "0.15rem" }}>
                        <span>52 Commits</span>
                        <span>3 Branches</span>
                        <span>5 PRs</span>
                      </div>

                      <div style={{ margin: "0.35rem 0 0" }}>
                        <p style={{ fontSize: "0.52rem", color: "var(--text-tertiary)", marginBottom: "0.15rem" }}>Repository Overview</p>
                        {/* Sparkline Graph */}
                        <svg viewBox="0 0 120 28" style={{ width: "100%", height: "24px" }}>
                          <path d="M 0 24 Q 20 18 35 22 T 70 8 T 100 12 T 120 5" className="github-sparkline" />
                        </svg>
                      </div>
                    </div>

                    {/* Fit Score Badge */}
                    <div className="fit-score-card">
                      <div>
                        <p style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.7)", margin: 0 }}>Fit Score</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.15rem", fontSize: "0.52rem", color: "var(--accent-emerald)", marginTop: "0.1rem" }}>
                          <CheckCircle2 size={9} />
                          <span>Strong Match</span>
                        </div>
                      </div>
                      <div className="fit-score-circle-g">
                        <svg width="58" height="58">
                          <circle className="fit-circle-bg" cx="29" cy="29" r="26" />
                          <circle className="fit-circle-fg" cx="29" cy="29" r="26" />
                        </svg>
                        <div className="fit-score-num">82</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Far-Right Floating Badges connected with SVG lines */}
            <div className="floating-badges-group">
              <div className="floating-badge-item">
                <div className="floating-badge-icon">
                  <Brain size={15} style={{ color: "white" }} />
                </div>
                <span className="floating-badge-text">AI Evaluation</span>
              </div>

              <div className="floating-badge-item">
                <div className="floating-badge-icon">
                  <ShieldCheck size={15} style={{ color: "white" }} />
                </div>
                <span className="floating-badge-text">Bias Free</span>
              </div>

              <div className="floating-badge-item">
                <div className="floating-badge-icon">
                  <Zap size={15} style={{ color: "white" }} />
                </div>
                <span className="floating-badge-text">Skill First</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 3. Trusted Companies                                         */}
      {/* ------------------------------------------------------------ */}
      <section style={{ borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", background: "var(--bg-secondary)", padding: "1.5rem 0" }}>
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "2rem" }}>
          <span style={{ fontSize: "0.8rem", color: "var(--text-tertiary)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>Innovative partners</span>
          <div className="marquee-container" style={{ flex: 1, maxWidth: "70%" }}>
            <div className="marquee-content">
              <span className="marquee-logo">Google</span>
              <span className="marquee-logo">Microsoft</span>
              <span className="marquee-logo">Atlassian</span>
              <span className="marquee-logo">Razorpay</span>
              <span className="marquee-logo">Postman</span>
              <span className="marquee-logo">Vercel</span>
              <span className="marquee-logo">Linear</span>
              <span className="marquee-logo">Notion</span>
              <span className="marquee-logo">Freshworks</span>
              {/* Duplicate for infinite effect */}
              <span className="marquee-logo">Google</span>
              <span className="marquee-logo">Microsoft</span>
              <span className="marquee-logo">Atlassian</span>
              <span className="marquee-logo">Razorpay</span>
              <span className="marquee-logo">Postman</span>
              <span className="marquee-logo">Vercel</span>
              <span className="marquee-logo">Linear</span>
              <span className="marquee-logo">Notion</span>
              <span className="marquee-logo">Freshworks</span>
            </div>
          </div>
          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "500" }}>and 100+ others</span>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 4. Why SkillFit (Features)                                   */}
      {/* ------------------------------------------------------------ */}
      <section id="features" style={{ padding: "8rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "99px", background: "rgba(167, 139, 250, 0.05)", border: "1px solid rgba(167, 139, 250, 0.1)", fontSize: "0.85rem", color: "var(--accent)", marginBottom: "1rem" }}>
            <Brain size={14} />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Evaluate Real Capabilities</h2>
          <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto 4.5rem" }}>
            Move beyond static PDF resumes. Evaluate active programming skill, project contribution history, and real code architecture automatically.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {/* Card 1 */}
            <div className="card-premium">
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "12px", background: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Brain size={24} style={{ color: "var(--accent)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>AI Skill Evaluation</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Evaluate actual problem-solving and algorithmic complexity metrics instead of college GPA or pedigree.
              </p>
            </div>

            {/* Card 2 */}
            <div className="card-premium">
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "12px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <GitBranch size={24} style={{ color: "var(--accent)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>GitHub Repo Analysis</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Analyze candidates' production GitHub repos, pull requests, commit patterns, and code architecture in seconds.
              </p>
            </div>

            {/* Card 3 */}
            <div className="card-premium">
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "12px", background: "rgba(167, 139, 250, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <Code2 size={24} style={{ color: "var(--accent)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>Real Project Assessment</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Ask candidates to build functional modular full-stack projects, and analyze their complete setup rather than sandbox snippets.
              </p>
            </div>

            {/* Card 4 */}
            <div className="card-premium">
              <div style={{ width: "3.5rem", height: "3.5rem", borderRadius: "12px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem" }}>
                <ShieldCheck size={24} style={{ color: "var(--accent-emerald)" }} />
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "0.75rem" }}>Bias-Free Hiring</h3>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                Mask candidate names, age, gender, degrees, and university pedigree. Focus 100% on capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 5. Hiring Problems vs SkillFit                               */}
      {/* ------------------------------------------------------------ */}
      <section id="comparison" style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">The Shift to Real Skills</h2>
            <p className="subtitle" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Traditional resume screening is broken. Compare legacy recruitment methods with SkillFit’s AI assessment loop.
            </p>
          </div>

          <div className="comparison-grid">
            {/* Legacy Column */}
            <div className="comparison-card bad">
              <h3>
                <span style={{ color: "#ef4444" }}>Traditional Hiring</span>
                <span style={{ fontSize: "1.1rem", marginLeft: "auto" }}>❌</span>
              </h3>
              <ul className="comparison-list">
                <li className="comparison-item bad">
                  <X size={16} className="comparison-icon" style={{ color: "#ef4444" }} />
                  <span>Filters candidates arbitrarily by degree and marks.</span>
                </li>
                <li className="comparison-item bad">
                  <X size={16} className="comparison-icon" style={{ color: "#ef4444" }} />
                  <span>Relies on self-proclaimed resumes and keywords.</span>
                </li>
                <li className="comparison-item bad">
                  <X size={16} className="comparison-icon" style={{ color: "#ef4444" }} />
                  <span>Forces candidates to do manual whiteboard puzzles.</span>
                </li>
                <li className="comparison-item bad">
                  <X size={16} className="comparison-icon" style={{ color: "#ef4444" }} />
                  <span>Introduces severe pedigree bias and misses self-taught geniuses.</span>
                </li>
                <li className="comparison-item bad">
                  <X size={16} className="comparison-icon" style={{ color: "#ef4444" }} />
                  <span>Takes 30+ days to complete a single developer assessment.</span>
                </li>
              </ul>
            </div>

            {/* SkillFit Column */}
            <div className="comparison-card good">
              <h3>
                <span className="text-gradient">SkillFit Platform</span>
                <span style={{ fontSize: "1.1rem", marginLeft: "auto" }}>✅</span>
              </h3>
              <ul className="comparison-list">
                <li className="comparison-item good">
                  <CheckCircle2 size={16} className="comparison-icon" style={{ color: "var(--accent-emerald)" }} />
                  <span>Evaluates real production-grade repositories and active commits.</span>
                </li>
                <li className="comparison-item good">
                  <CheckCircle2 size={16} className="comparison-icon" style={{ color: "var(--accent-emerald)" }} />
                  <span>Uses AI to inspect logic flow, error handling, and complexity.</span>
                </li>
                <li className="comparison-item good">
                  <CheckCircle2 size={16} className="comparison-icon" style={{ color: "var(--accent-emerald)" }} />
                  <span>Measures performance in real dev sandboxes, not memory puzzles.</span>
                </li>
                <li className="comparison-item good">
                  <CheckCircle2 size={16} className="comparison-icon" style={{ color: "var(--accent-emerald)" }} />
                  <span>Enforces 100% blind screening profiles, focusing on pure output.</span>
                </li>
                <li className="comparison-item good">
                  <CheckCircle2 size={16} className="comparison-icon" style={{ color: "var(--accent-emerald)" }} />
                  <span>Generates complete candidate ranking profiles within 24 hours.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 6. How It Works                                              */}
      {/* ------------------------------------------------------------ */}
      <section id="how-it-works" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "5.5rem" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.4rem 1rem", borderRadius: "99px", background: "rgba(124, 58, 237, 0.05)", border: "1px solid rgba(124, 58, 237, 0.1)", fontSize: "0.85rem", color: "var(--accent)", marginBottom: "1rem" }}>
              <Zap size={14} />
              <span>Simple Setup Workflow</span>
            </div>
            <h2 className="section-title">Automate Your Technical Screening</h2>
            <p className="subtitle" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
              See how SkillFit bridges the gap between candidate application and the final hiring decision.
            </p>
          </div>

          <div className="timeline-track-holder">
            <div className="timeline-track">
              {/* Connector line */}
              <div className="timeline-connector" />

              {/* Step 1 */}
              <div className="timeline-step">
                <div className="timeline-number flex-center">1</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Create Challenge</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Select or define a real-world coding assessment (e.g., API server, UI widget).
                </p>
              </div>

              {/* Step 2 */}
              <div className="timeline-step">
                <div className="timeline-number flex-center">2</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Candidates Build</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Applicants write real-world modular code in their own IDEs and push to Git.
                </p>
              </div>

              {/* Step 3 */}
              <div className="timeline-step">
                <div className="timeline-number flex-center">3</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>AI Evaluates</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  AI processes pull requests, testing performance, structures, and security.
                </p>
              </div>

              {/* Step 4 */}
              <div className="timeline-step">
                <div className="timeline-number flex-center">4</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Top Ranked</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  A unified, vetted dashboard ranks the top developers based on score matches.
                </p>
              </div>

              {/* Step 5 */}
              <div className="timeline-step">
                <div className="timeline-number flex-center">5</div>
                <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Hire Vetted Talent</h4>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                  Review clear evaluation reports and hire with complete certainty.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 7. Platform Preview Mockup                                    */}
      {/* ------------------------------------------------------------ */}
      <section id="preview" style={{ padding: "6rem 0", background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h2 className="section-title">Designed for Vetting Teams</h2>
            <p className="subtitle" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Explore the clean dashboard workspace used by hiring managers to scan applicant profiles.
            </p>
          </div>

          <div className="dashboard-mockup">
            {/* Sidebar */}
            <div className="dashboard-sidebar">
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
                <div className={`dashboard-menu-item ${previewTab === "report" ? "active" : ""}`} onClick={() => setPreviewTab("report")}>
                  <Brain size={16} />
                  <span>Evaluation Report</span>
                </div>
                <div className={`dashboard-menu-item ${previewTab === "git" ? "active" : ""}`} onClick={() => setPreviewTab("git")}>
                  <GitBranch size={16} />
                  <span>GitHub Insights</span>
                </div>
                <div className={`dashboard-menu-item ${previewTab === "rank" ? "active" : ""}`} onClick={() => setPreviewTab("rank")}>
                  <BarChart3 size={16} />
                  <span>Global Rankings</span>
                </div>
              </div>
            </div>

            {/* Main Area */}
            <div className="dashboard-main" style={{ gridColumn: "span 2" }}>
              {previewTab === "report" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <h4 style={{ fontSize: "1.2rem", fontWeight: "700" }}>AI Recommendation Report</h4>
                      <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Candidate ID: #983-DEV</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.2)", borderRadius: "8px", padding: "0.4rem 0.8rem" }}>
                      <span style={{ fontSize: "1.25rem", fontWeight: "800", color: "var(--accent-emerald)" }}>82</span>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Fit Score</span>
                    </div>
                  </div>

                  <div className="dashboard-grid-mini">
                    <div className="dashboard-card-mini">
                      <h5 style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <ThumbsUp size={14} className="text-gradient" />
                        <span>Core Strengths</span>
                      </h5>
                      <ul style={{ fontSize: "0.8rem", color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <li>Clean separation of business logic and routing layers.</li>
                        <li>Effective utilization of async hooks and state variables.</li>
                        <li>94% code coverage on unit test assertions.</li>
                      </ul>
                    </div>
                    
                    <div className="dashboard-card-mini">
                      <h5 style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <AlertCircle size={14} style={{ color: "var(--accent)" }} />
                        <span>Refactoring Notes</span>
                      </h5>
                      <ul style={{ fontSize: "0.8rem", color: "var(--text-secondary)", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <li>Several inline hardcoded variables should be moved to env.</li>
                        <li>High cyclomatic complexity on database connector.</li>
                      </ul>
                    </div>
                  </div>

                  <div className="dashboard-card-mini" style={{ background: "rgba(79, 70, 229, 0.03)", borderColor: "rgba(79, 70, 229, 0.1)" }}>
                    <h5 style={{ fontSize: "0.9rem", fontWeight: "700", marginBottom: "0.5rem" }}>AI Summary Recommendation</h5>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6" }}>
                      Candidate displays high modular architecture proficiency. Highly recommended for the Senior Engineer opening. Code logic demonstrates strong familiarity with concurrent state syncs.
                    </p>
                  </div>
                </div>
              )}

              {previewTab === "git" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: "700" }}>GitHub Repository Analysis</h4>
                  <div className="dashboard-card-mini">
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: "600", fontFamily: "var(--font-mono)" }}>github.com/vetted-dev/express-rest</span>
                      <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-color)", padding: "0.2rem 0.6rem", borderRadius: "4px" }}>Active Repo</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "1rem" }}>
                      <div style={{ background: "rgba(255,255,255,0.01)", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                        <h6 style={{ fontSize: "1.2rem", fontWeight: "700" }}>42</h6>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Pull Requests</p>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.01)", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                        <h6 style={{ fontSize: "1.2rem", fontWeight: "700" }}>312</h6>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Total Commits</p>
                      </div>
                      <div style={{ background: "rgba(255,255,255,0.01)", padding: "0.75rem", borderRadius: "8px", textAlign: "center" }}>
                        <h6 style={{ fontSize: "1.2rem", fontWeight: "700" }}>18</h6>
                        <p style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>Contributors</p>
                      </div>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: "1.5" }}>
                      The repository shows constant commit activity over the past 6 months. High quality of code comments, clear commit naming standards, and clean pull request descriptions detected.
                    </p>
                  </div>
                </div>
              )}

              {previewTab === "rank" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <h4 style={{ fontSize: "1.2rem", fontWeight: "700" }}>Global Applicant Ranking</h4>
                  <div style={{ background: "rgba(255,255,255,0.01)", borderRadius: "12px", border: "1px solid var(--border-color)", overflow: "hidden" }}>
                    {[
                      { rank: 1, name: "Applicant #983", score: 96, label: "Top 1%" },
                      { rank: 2, name: "Applicant #412", score: 92, label: "Top 5%" },
                      { rank: 3, name: "Applicant #771", score: 88, label: "Top 8%" },
                      { rank: 4, name: "Applicant #305", score: 85, label: "Top 12%" },
                    ].map((row) => (
                      <div key={row.rank} style={{ display: "flex", alignItems: "center", justify: "space-between", padding: "1rem 1.5rem", borderBottom: row.rank !== 4 ? "1px solid var(--border-color)" : "none" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{ fontSize: "0.9rem", fontWeight: "700", color: row.rank === 1 ? "var(--accent)" : "var(--text-tertiary)", width: "20px" }}>#{row.rank}</span>
                          <span style={{ fontSize: "0.9rem", fontWeight: "600" }}>{row.name}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                          <span style={{ fontSize: "0.75rem", background: "rgba(79, 70, 229, 0.1)", color: "var(--accent)", padding: "0.1rem 0.5rem", borderRadius: "4px" }}>{row.label}</span>
                          <span style={{ fontSize: "0.95rem", fontWeight: "700" }}>{row.score}% match</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 8. Benefits Grid                                             */}
      {/* ------------------------------------------------------------ */}
      <section id="benefits" style={{ padding: "8rem 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="section-title" style={{ marginBottom: "1rem" }}>Unfair Advantages of SkillFit</h2>
          <p className="subtitle" style={{ maxWidth: "600px", margin: "0 auto 4.5rem" }}>
            Why companies switch from legacy candidate screening loops to SkillFit’s project assessments.
          </p>

          <div className="benefits-grid">
            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Zap size={18} className="text-gradient" />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>80% Faster Screening</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Automate your entire entry-level to mid-level screening process, filtering hundreds of applicants.
              </p>
            </div>

            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(124, 58, 237, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Bias-Free Evaluation</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Completely mask names, locations, gender, and educational credentials to prevent screening bias.
              </p>
            </div>

            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(167, 139, 250, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <GitBranch size={18} style={{ color: "var(--accent)" }} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>GitHub Integration</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Import repository code, history metadata, and contributions. No sandbox restrictions.
              </p>
            </div>

            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(16, 185, 129, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Code2 size={18} style={{ color: "var(--accent-emerald)" }} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Coding Assessments</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Set real-world sandbox environments for backend coding, web layouts, and debugging challenges.
              </p>
            </div>

            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Brain size={18} style={{ color: "var(--text-primary)" }} />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>AI Recommendations</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Generate customized highlights, logic refactoring reports, and code structure breakdowns.
              </p>
            </div>

            <div className="benefit-card">
              <div style={{ width: "2.5rem", height: "2.5rem", borderRadius: "8px", background: "rgba(79, 70, 229, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <BarChart3 size={18} className="text-gradient" />
              </div>
              <h4 style={{ fontSize: "1.1rem", fontWeight: "700", marginBottom: "0.5rem" }}>Portfolio Review</h4>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: "1.6", textAlign: "left" }}>
                Instantly scan old portfolio structures to trace development experience and frameworks used.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 9. Statistics                                                */}
      {/* ------------------------------------------------------------ */}
      <section className="stats-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-number text-gradient-indigo">95%</h3>
              <p className="stat-label">Hiring Accuracy</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number text-gradient">10,000+</h3>
              <p className="stat-label">Developers Vetted</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number text-gradient-indigo">82%</h3>
              <p className="stat-label">Average Match Score</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-number text-gradient">4x</h3>
              <p className="stat-label">Faster Time-to-Hire</p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 10. Testimonials                                             */}
      {/* ------------------------------------------------------------ */}
      <section id="testimonials" style={{ padding: "8rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2 className="section-title">Loved by Engineering Leads</h2>
            <p className="subtitle" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
              See how VPEs and recruitment managers streamline their workflows using our evaluation tools.
            </p>
          </div>

          <div className="testimonials-grid">
            {/* Card 1 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--accent)" stroke="var(--accent)" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "SkillFit revolutionized how we screen frontend talent. We stopped asking standard coding trivia, and instead analyzed their real full-stack project layouts."
                </p>
              </div>
              <div className="testimonial-user">
                <div className="testimonial-avatar">SP</div>
                <div>
                  <h5 className="testimonial-name">Sarah Patel</h5>
                  <p className="testimonial-role">VPE at Linear</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--accent)" stroke="var(--accent)" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "The bias-free profile matching helps us review raw development outputs. The circular fit score dashboard is incredibly accurate."
                </p>
              </div>
              <div className="testimonial-user">
                <div className="testimonial-avatar">DH</div>
                <div>
                  <h5 className="testimonial-name">David H.</h5>
                  <p className="testimonial-role">Director of Talent, Vercel</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="testimonial-card">
              <div>
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="var(--accent)" stroke="var(--accent)" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "We cut our screening hours by 75%. AI repo parsing flagged several candidates with copy-pasted homework that our manual loops would have missed."
                </p>
              </div>
              <div className="testimonial-user">
                <div className="testimonial-avatar">MK</div>
                <div>
                  <h5 className="testimonial-name">Marcus King</h5>
                  <p className="testimonial-role">Lead Recruiter, Postman</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 11. FAQ Accordion                                            */}
      {/* ------------------------------------------------------------ */}
      <section id="faq" className="faq-section" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)" }}>
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="subtitle" style={{ maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Got questions about evaluation parameters, repository metrics, or integrations?
            </p>
          </div>

          <div className="faq-wrapper">
            {[
              {
                q: "How does AI scoring work?",
                a: "Our AI model compiles, executes, and audits applicant submissions. It analyzes cyclomatic complexity, memory management, testing layouts, and file modularity before producing a final skill score matched against your role's benchmark parameters."
              },
              {
                q: "Do candidates need GitHub?",
                a: "While link capability directly imports historical commit metadata, it is not mandatory. Candidates can also zip or upload source code directly through our web sandboxes, where SkillFit sets up a private sandbox environment."
              },
              {
                q: "Can companies create custom assessments?",
                a: "Yes. Vetting managers can upload specific template codebases, specify custom unit test coverage goals, write validation parameters, and define code design pattern requirements."
              },
              {
                q: "How is bias reduced?",
                a: "All personal identifiers (names, avatar, gender, location, degree titles, and college references) are completely redacted. Vetting panels review applicant solutions via a standardized, anonymous workspace."
              },
              {
                q: "What is your pricing model?",
                a: "We offer a Free Tier for core testing. Paid corporate profiles start at $149/month which includes advanced integrations, candidate validation sandboxes, and unlimited evaluation slots."
              }
            ].map((item, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? "active" : ""}`}>
                <button className="faq-trigger" onClick={() => toggleFaq(index)}>
                  <span>{item.q}</span>
                  <ChevronDown size={18} className="faq-icon" />
                </button>
                <div className="faq-answer">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 12. Final CTA                                                */}
      {/* ------------------------------------------------------------ */}
      <section id="contact" className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div>
              <div className="cta-badge">
                <Sparkles size={12} />
                <span>Get Vetted Immediately</span>
              </div>
              <h2 className="section-title" style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>
                Stop Hiring Resumes.<br />
                <span className="text-gradient">Start Hiring Talent.</span>
              </h2>
              <p className="subtitle" style={{ marginBottom: "2.5rem", maxWidth: "500px" }}>
                Configure your first custom coding assessment challenge in under 10 minutes and watch AI build your global candidate scoreboard.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <button className="btn btn-primary">Book Demo Workspace</button>
                <button className="btn btn-secondary">Contact Vetting Advisors</button>
              </div>
            </div>

            {/* Illustration */}
            <div style={{ display: "flex", justifyContent: "center", position: "relative", marginTop: "3rem" }}>
              <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid var(--border-color)", padding: "1.5rem", borderRadius: "20px", width: "100%", maxWidth: "340px", boxShadow: "0 20px 40px rgba(0,0,0,0.6)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: "700" }}>Live Evaluation Queue</span>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#ef4444" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center", fontSize: "0.75rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>API Server Challenge</span>
                    <span style={{ color: "var(--accent-emerald)", fontWeight: "600" }}>Vetted</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", width: "100%" }}>
                    <div style={{ height: "4px", background: "var(--accent-emerald)", borderRadius: "2px", width: "100%" }} />
                  </div>
                  <div style={{ display: "flex", justify: "space-between", alignItems: "center", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>Frontend React Build</span>
                    <span style={{ color: "var(--accent)", fontWeight: "600" }}>Evaluating...</span>
                  </div>
                  <div style={{ height: "4px", background: "rgba(255,255,255,0.05)", borderRadius: "2px", width: "100%" }}>
                    <div style={{ height: "4px", background: "var(--accent)", borderRadius: "2px", width: "65%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* 13. Footer                                                   */}
      {/* ------------------------------------------------------------ */}
      <footer className="footer">
        <div className="container">
          <div className="footer-columns">
            <div className="footer-brand">
              <a href="#" className="footer-logo-title" style={{ textDecoration: "none" }}>
                <Logo size={28} />
                <span>SkillFit</span>
              </a>
              <p style={{ fontSize: "0.85rem", lineHeight: "1.6", maxWidth: "260px" }}>
                Evaluating candidates on skills and real production code, not degrees.
              </p>
            </div>

            {/* Column 1 */}
            <div>
              <h5 className="footer-column-title">Product</h5>
              <ul className="footer-links-list">
                <li><a href="#features" className="footer-link">Features</a></li>
                <li><a href="#how-it-works" className="footer-link">How It Works</a></li>
                <li><a href="#preview" className="footer-link">Platform Preview</a></li>
                <li><a href="#benefits" className="footer-link">Benefits</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h5 className="footer-column-title">Company</h5>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">About Us</a></li>
                <li><a href="#" className="footer-link">Careers</a></li>
                <li><a href="#" className="footer-link">Press Kit</a></li>
                <li><a href="#" className="footer-link">Vetting Advisors</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h5 className="footer-column-title">Resources</h5>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Developer Docs</a></li>
                <li><a href="#" className="footer-link">Security Center</a></li>
                <li><a href="#" className="footer-link">Integrations API</a></li>
                <li><a href="#" className="footer-link">System Status</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h5 className="footer-column-title">Legal</h5>
              <ul className="footer-links-list">
                <li><a href="#" className="footer-link">Privacy Policy</a></li>
                <li><a href="#" className="footer-link">Terms of Service</a></li>
                <li><a href="#" className="footer-link">Security Policies</a></li>
                <li><a href="#" className="footer-link">GDPR Compliance</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} SkillFit Inc. All rights reserved.</p>
            <div className="footer-socials">
              <span className="footer-social-icon">Twitter</span>
              <span className="footer-social-icon">GitHub</span>
              <span className="footer-social-icon">LinkedIn</span>
              <span className="footer-social-icon">Discord</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
