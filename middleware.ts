import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  if (!token && req.nextUrl.pathname.startsWith("/new")) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (
    token &&
    (req.nextUrl.pathname.startsWith("/signin") ||
      req.nextUrl.pathname.startsWith("/signup"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
