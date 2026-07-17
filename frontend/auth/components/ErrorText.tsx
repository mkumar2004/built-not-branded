// ErrorText.tsx — unchanged in structure, just visible on dark bg already (rose-600 reads fine on black)
type ErrorTextProps = {
  children: React.ReactNode;
};

export default function ErrorText({ children }: ErrorTextProps) {
  return (
    <p role="alert" className="mt-1.5 text-sm text-rose-400">
      {children}
    </p>
  );
}