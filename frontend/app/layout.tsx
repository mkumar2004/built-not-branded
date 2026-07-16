import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillFit — Judged by Real Work, Not Paperwork",
  description: "SkillFit helps companies discover exceptional developers using AI-powered skill evaluation, GitHub analysis, coding assessments, and project-based hiring.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
