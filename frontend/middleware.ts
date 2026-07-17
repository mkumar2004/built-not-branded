import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup", "/forgot-password"];
const ROLE_HOME: Record<string, string> = {
  candidate: "/candidate",
  recruiter: "/recruiter",
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("sf_token")?.value;
  const role = request.cookies.get("sf_role")?.value ?? "";

  const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path));

  if (!token && !isPublicPath) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/login", request.url));
  }

  if (token && pathname.startsWith("/candidate") && role !== "candidate") {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/login", request.url));
  }

  if (token && pathname.startsWith("/recruiter") && role !== "recruiter") {
    return NextResponse.redirect(new URL(ROLE_HOME[role] ?? "/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};