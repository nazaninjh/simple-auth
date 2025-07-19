import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const currentPath = req.nextUrl.pathname;
  const isPublicPath = currentPath === "/" || currentPath === "/signup";

  const token = req.cookies.get("token")?.value || "";
  console.log("token==", token);

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/dashboard", "/signup"],
};
