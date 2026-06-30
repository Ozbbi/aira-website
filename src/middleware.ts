import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// When Clerk keys are present, run Clerk's middleware with EVERY route public
// (we never block access — Clerk only manages the session so Google login works).
// When there is no key, this is a pure pass-through and the site behaves exactly
// as it did before Clerk was wired.
export default process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ? authMiddleware({ publicRoutes: ["/(.*)"] })
  : () => NextResponse.next();

export const config = {
  matcher: ["/((?!_next/image|_next/static|favicon.svg|.*\\..*).*)", "/(api)(.*)"],
};
