import { NextResponse, NextRequest } from "next/server";

const allowedPaths = ["/login", "/signin", "/signup", "/survey"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAllowedPath = allowedPaths.some(path => pathname.startsWith(path));

  const token = req.cookies.get("ME_TO_YOU_TOKEN")?.value;

  if (token) {
    if (isAllowedPath) {
      const homeUrl = req.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }
    return NextResponse.next();
  } else {
    if (isAllowedPath) {
      return NextResponse.next();
    } else {
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/signin";
      return NextResponse.redirect(loginUrl);
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next|public|favicon.ico|static|.*\\.svg$).*)"],
};
