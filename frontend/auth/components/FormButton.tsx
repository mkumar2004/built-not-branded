// FormButton.tsx — gradient to match hero CTA, plus a hover lift animation
import type { ButtonHTMLAttributes, ReactNode } from "react";

type FormButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: ReactNode;
};

export default function FormButton({ loading = false, disabled, children, className = "", ...props }: FormButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 font-semibold text-white shadow-lg shadow-indigo-900/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-indigo-800/50 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 ${className}`}
    >
      {loading ? <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" /> : null}
      {children}
    </button>
  );
}