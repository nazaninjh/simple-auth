import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const isPublicPath = currentPath === "/" || currentPath === "/signup";

  const accessToken = req.cookies.get("accessToken")?.value;

  if (isPublicPath && accessToken) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/dashboard"],
};
