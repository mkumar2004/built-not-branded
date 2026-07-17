import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-8 sm:px-6 lg:flex lg:items-center lg:justify-center">
      {/* Ambient drifting glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 animate-[drift1_10s_ease-in-out_infinite] rounded-full bg-indigo-600/25 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-96 w-96 animate-[drift2_13s_ease-in-out_infinite] rounded-full bg-violet-600/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-[pulse_5s_ease-in-out_infinite] rounded-full bg-fuchsia-600/10 blur-3xl" />
        {/* floating particles */}
        {[...Array(6)].map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-400/60"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float${(i % 3) + 1} ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <section className="relative z-10 grid w-full max-w-5xl animate-[cardIn_0.6s_cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0f] shadow-2xl shadow-black/60 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-950 via-[#0d0d17] to-violet-950 p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-1/2 top-0 h-72 w-px -translate-x-1/2 animate-[beam_3s_ease-in-out_infinite] bg-gradient-to-b from-violet-400/80 via-indigo-400/40 to-transparent" />
          </div>

          <div className="relative flex items-center gap-2 text-xl font-bold animate-[fadeSlideDown_0.6s_ease-out_0.1s_both]">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <Sparkles className="h-4 w-4" />
            </span>
            SkillFit
          </div>

          <div className="relative my-auto">
            <span className="mb-4 inline-flex animate-[fadeSlideUp_0.6s_ease-out_0.2s_both] items-center gap-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-200">
              <Sparkles className="h-3 w-3 animate-[spin_4s_linear_infinite]" /> Skill-first hiring
            </span>
            <h2 className="mt-4 animate-[fadeSlideUp_0.6s_ease-out_0.3s_both] text-4xl font-bold leading-tight tracking-tight">
              Judged by <span className="bg-gradient-to-r from-violet-400 to-indigo-300 bg-clip-text text-transparent">real work</span>,<br />not paperwork.
            </h2>
            <p className="mt-5 max-w-sm animate-[fadeSlideUp_0.6s_ease-out_0.4s_both] text-slate-400">
              A calm, secure place for candidates and hiring teams to find the right fit.
            </p>
          </div>

          <p className="relative animate-[fadeSlideUp_0.6s_ease-out_0.5s_both] text-sm text-slate-500">
            Secure and built for hiring.
          </p>
        </aside>

        <div className="bg-[#0a0a0f] p-6 sm:p-10">
          <div className="mb-8 flex items-center gap-2 text-xl font-bold text-white lg:hidden">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <Sparkles className="h-4 w-4" />
            </span>
            SkillFit
          </div>
          <h1 className="animate-[fadeSlideUp_0.5s_ease-out_0.1s_both] text-3xl font-bold tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-2 animate-[fadeSlideUp_0.5s_ease-out_0.2s_both] text-slate-400">{subtitle}</p>
          <div className="mt-8 animate-[fadeSlideUp_0.5s_ease-out_0.3s_both]">{children}</div>
        </div>
      </section>

      <style>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes drift1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 40px); }
        }
        @keyframes drift2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, -30px); }
        }
        @keyframes beam {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(15px, -20px); opacity: 0.8; }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(-15px, -25px); opacity: 0.7; }
        }
        @keyframes float3 {
          0%, 100% { transform: translate(0, 0); opacity: 0.2; }
          50% { transform: translate(10px, -15px); opacity: 0.6; }
        }
      `}</style>
    </main>
  );
}