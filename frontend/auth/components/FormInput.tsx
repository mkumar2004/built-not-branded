// FormInput.tsx — updated for dark theme
import { forwardRef, type InputHTMLAttributes } from "react";
import ErrorText from "./ErrorText";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(function FormInput(
  { label, error, id, className = "", ...props },
  ref
) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
      {label}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={`mt-1.5 w-full rounded-lg border bg-white/5 px-3.5 py-3 text-white outline-none transition placeholder:text-slate-500 focus:ring-4 ${
          error
            ? "border-rose-500/50 focus:border-rose-500 focus:ring-rose-500/20"
            : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/20"
        } ${className}`}
        {...props}
      />
      {error ? <span id={`${inputId}-error`}><ErrorText>{error}</ErrorText></span> : null}
    </label>
  );
});

export default FormInput;