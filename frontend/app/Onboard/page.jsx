"use client";

import { useState, useEffect } from "react";
import { 
  Github, 
  FolderCode, 
  Briefcase, 
  User, 
  UploadCloud, 
  Globe, 
  Smartphone, 
  Cpu, 
  Play, 
  SkipForward, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Code
} from "lucide-react";
import Getform from "../../Component/Getform";

export default function OnboardPage() {
  const [step, setStep] = useState("start"); // "start" | "animating" | "form"
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing safe environment...");

  // Simulated progress updates over 60 seconds (or skipped)
  useEffect(() => {
    if (step !== "animating") return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (100 / 60); // Increment to reach 100 in 60 seconds
        if (next >= 100) {
          clearInterval(interval);
          setStep("form");
          return 100;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  // Update status text based on progress percentage
  useEffect(() => {
    if (progress < 15) {
      setStatusText("Spinning up secure Docker container...");
    } else if (progress < 30) {
      setStatusText("Connecting to GitHub secure sandbox API...");
    } else if (progress < 45) {
      setStatusText("Setting up repository cloning pipelines...");
    } else if (progress < 60) {
      setStatusText("Downloading LLM skill validation weights...");
    } else if (progress < 80) {
      setStatusText("Initializing pgvector memory buffers...");
    } else if (progress < 95) {
      setStatusText("Finalizing system integrity check...");
    } else {
      setStatusText("Onboarding complete! Preparing workspaces...");
    }
  }, [progress]);

  const handleStart = () => {
    setStep("animating");
    setProgress(0);
  };

  const handleSkip = () => {
    setStep("form");
  };

  if (step === "form") {
    return <Getform />;
  }

  return (
    <div className="onboard-root">
      {/* CSS Stylesheet Injector */}
      <style dangerouslySetInnerHTML={{ __html: `
        .onboard-root {
          background: radial-gradient(circle at 50% 50%, #0a0a22 0%, #03030d 100%);
          min-height: 100vh;
          width: 100%;
          color: #e2e8f0;
          font-family: system-ui, -apple-system, sans-serif;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Ambient Glow Blobs */
        .ambient-glow-1 {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
          top: 15%;
          left: 10%;
          filter: blur(40px);
          pointer-events: none;
        }
        .ambient-glow-2 {
          position: absolute;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%);
          bottom: 10%;
          right: 5%;
          filter: blur(50px);
          pointer-events: none;
        }

        /* Start Screen Layout */
        .start-container {
          text-align: center;
          max-width: 550px;
          padding: 2.5rem;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 10;
        }

        .start-title {
          font-size: 2.5rem;
          font-weight: 800;
          background: linear-gradient(135deg, #a78bfa 0%, #6366f1 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .start-desc {
          color: #94a3b8;
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 2rem;
        }

        .btn-start {
          background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
          color: white;
          border: none;
          padding: 1rem 2.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 99px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: 0 0 20px rgba(124, 58, 237, 0.4);
          transition: all 0.3s ease;
        }

        .btn-start:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(124, 58, 237, 0.6);
        }

        /* Onboarding Interactive Scene */
        .scene-container {
          position: relative;
          width: 100%;
          max-width: 1000px;
          height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        /* 3D Perspective Card */
        .card-perspective {
          perspective: 1200px;
          margin-bottom: 2.5rem;
          animation: flyInDown 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .main-card {
          width: 620px;
          height: 290px;
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 35px 70px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1);
          transform: rotateX(8deg) rotateY(-8deg) rotateZ(1deg);
          animation: floatingCard 6s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .card-row-top {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .icon-box {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .icon-box.github {
          background: white;
          color: #0d1117;
        }

        .icon-box.folder {
          background: #4f46e5;
          color: white;
        }

        .dropdown-box {
          flex: 1;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 0.75rem 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .dropdown-title {
          font-size: 0.7rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .dropdown-icons {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          color: #a78bfa;
        }

        .dropdown-icons-divider {
          width: 1px;
          height: 20px;
          background: rgba(255, 255, 255, 0.1);
        }

        .input-dashed-box {
          border: 2px dashed rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          color: #94a3b8;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.01);
        }

        /* Floating Tags */
        .floating-tag {
          position: absolute;
          padding: 0.6rem 1.2rem;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          z-index: 10;
        }

        .tag-role {
          background: linear-gradient(135deg, rgba(167, 139, 250, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
          border: 1px solid rgba(167, 139, 250, 0.25);
          color: #d8b4fe;
          left: 8%;
          top: 35%;
          animation: flyInLeft 1s ease-out, floatTag1 5s ease-in-out infinite 1s;
        }

        .tag-fresher {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(79, 70, 229, 0.15) 100%);
          border: 1px solid rgba(99, 102, 241, 0.25);
          color: #c7d2fe;
          left: 12%;
          top: 60%;
          animation: flyInLeft 1.2s ease-out, floatTag2 6s ease-in-out infinite 1.2s;
        }

        .tag-exp {
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
          border: 1px solid rgba(124, 58, 237, 0.25);
          color: #e9d5ff;
          right: 12%;
          top: 45%;
          animation: flyInRight 1s ease-out, floatTag3 5.5s ease-in-out infinite 1s;
        }

        /* Target Glowing Orb */
        .target-orb-container {
          position: absolute;
          top: 10%;
          right: 15%;
          z-index: 10;
          animation: flyInRight 1.2s ease-out;
        }

        .target-orb {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: radial-gradient(circle, #c084fc 0%, #7c3aed 70%);
          box-shadow: 0 0 30px rgba(124, 58, 237, 0.8);
          animation: orbPulse 2s ease-in-out infinite;
        }

        .orb-halo {
          position: absolute;
          top: -15px;
          left: -15px;
          right: -15px;
          bottom: -15px;
          border: 1.5px solid rgba(124, 58, 237, 0.3);
          border-radius: 50%;
          animation: haloPulse 3s linear infinite;
        }

        /* SVG Connectors with running light path */
        .connectors-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 4;
        }

        .connecting-line {
          stroke: rgba(124, 58, 237, 0.15);
          stroke-width: 2;
          fill: none;
          stroke-dasharray: 6 6;
        }

        .pulse-path {
          stroke: #c084fc;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 10 30;
          animation: pathRun 4s linear infinite;
        }

        /* Progress Bar & Loader Controls */
        .loader-panel {
          width: 100%;
          max-width: 500px;
          margin-top: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          z-index: 10;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 99px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7c3aed 0%, #c084fc 100%);
          border-radius: 99px;
          transition: width 0.3s ease;
        }

        .progress-text-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .status-msg {
          color: #c084fc;
          font-weight: 600;
          animation: blink 1.5s ease-in-out infinite;
        }

        .btn-skip {
          margin-top: 1rem;
          background: rgba(255, 255, 255, 0.05);
          color: #94a3b8;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 0.5rem 1.25rem;
          font-size: 0.8rem;
          font-weight: 600;
          border-radius: 99px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .btn-skip:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        /* KEYFRAME ANIMATIONS */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes flyInDown {
          from { opacity: 0; transform: translateY(-50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes flyInLeft {
          from { opacity: 0; transform: translateX(-100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes flyInRight {
          from { opacity: 0; transform: translateX(100px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes floatingCard {
          0% { transform: rotateX(8deg) rotateY(-8deg) rotateZ(1deg) translateY(0px); }
          50% { transform: rotateX(9deg) rotateY(-6deg) rotateZ(1.5deg) translateY(-8px); }
          100% { transform: rotateX(8deg) rotateY(-8deg) rotateZ(1deg) translateY(0px); }
        }

        @keyframes floatTag1 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        @keyframes floatTag2 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }

        @keyframes floatTag3 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
          100% { transform: translateY(0px); }
        }

        @keyframes orbPulse {
          0% { transform: scale(1); box-shadow: 0 0 20px rgba(124, 58, 237, 0.6); }
          50% { transform: scale(1.08); box-shadow: 0 0 40px rgba(124, 58, 237, 1); }
          100% { transform: scale(1); box-shadow: 0 0 20px rgba(124, 58, 237, 0.6); }
        }

        @keyframes haloPulse {
          0% { transform: scale(0.9); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }

        @keyframes pathRun {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -120; }
        }

        @keyframes blink {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      ` }} />

      {/* Background ambient lights */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {step === "start" && (
        <div className="start-container">
          <div style={{ display: "inline-flex", padding: "0.4rem 1rem", background: "rgba(124,58,237,0.1)", borderRadius: "99px", border: "1px solid rgba(124,58,237,0.2)", color: "#c084fc", fontSize: "0.8rem", fontWeight: "700", gap: "0.4rem", alignItems: "center", marginBottom: "1.5rem" }}>
            <Sparkles size={14} />
            <span>AI SANDBOX INITIALIZATION</span>
          </div>
          <h1 className="start-title">Configure Your Sandbox Workspace</h1>
          <p className="start-desc">
            We are preparing a clean, isolated evaluation container to analyze your repository and projects. Click below to begin the setup.
          </p>
          <button className="btn-start" onClick={handleStart}>
            Start AI Onboarding <ArrowRight size={18} />
          </button>
        </div>
      )}

      {step === "animating" && (
        <div className="scene-container">
          {/* SVG Connector Lines mimicking the dashed paths from the image */}
          <svg className="connectors-svg">
            {/* Tag Role to Card */}
            <path d="M 200 240 Q 250 240 330 200" className="connecting-line" />
            <path d="M 200 240 Q 250 240 330 200" className="pulse-path" />

            {/* Tag Fresher to Card */}
            <path d="M 210 390 Q 260 390 330 270" className="connecting-line" />
            <path d="M 210 390 Q 260 390 330 270" className="pulse-path" />

            {/* Card to Tag Experience */}
            <path d="M 720 230 Q 770 230 810 290" className="connecting-line" />
            <path d="M 720 230 Q 770 230 810 290" className="pulse-path" />

            {/* Card to Target Glowing Orb (Arched dashed line) */}
            <path d="M 520 180 Q 560 90 770 110" className="connecting-line" />
            <path d="M 520 180 Q 560 90 770 110" className="pulse-path" />
          </svg>

          {/* Floating Tags (Left) */}
          <div className="floating-tag tag-role">
            <Code size={16} />
            <span>Frontend Developer</span>
          </div>

          <div className="floating-tag tag-fresher">
            <User size={16} />
            <span>Fresher</span>
          </div>

          {/* 3D Perspective Card Layout */}
          <div className="card-perspective">
            <div className="main-card">
              {/* Row 1: GitHub & Folder & Role */}
              <div className="card-row-top">
                <div className="icon-box github">
                  <Github size={30} />
                </div>
                <div className="icon-box folder">
                  <FolderCode size={30} />
                </div>
                
                <div className="dropdown-box">
                  <span className="dropdown-title">Select your role</span>
                  <div className="dropdown-icons">
                    <Globe size={18} title="Web developer" />
                    <div className="dropdown-icons-divider" />
                    <Smartphone size={18} title="Android developer" />
                    <div className="dropdown-icons-divider" />
                    <Cpu size={18} title="AI/ML developer" />
                  </div>
                </div>
              </div>

              {/* Row 2: Dashed input upload box */}
              <div className="input-dashed-box">
                <UploadCloud size={20} className="text-[#a78bfa]" />
                <span>Paste your GitHub repo link or drop your project folder</span>
              </div>
            </div>
          </div>

          {/* Floating Tags (Right) */}
          <div className="floating-tag tag-exp">
            <Briefcase size={16} />
            <span>1-3 yrs</span>
          </div>

          {/* Target Glowing Orb (Top Right) */}
          <div className="target-orb-container">
            <div className="target-orb" />
            <div className="orb-halo" />
          </div>

          {/* Loader controls & progress tracking */}
          <div className="loader-panel">
            <div className="progress-text-row">
              <span className="status-msg">{statusText}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            <button className="btn-skip" onClick={handleSkip}>
              Skip Setup <SkipForward size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
