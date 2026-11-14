import { getSessionCookie } from "better-auth/cookies";
import type { NextFetchEvent, NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Pages and endpoints that must load without a session.
const publicPaths = ["/sign-in", "/sign-up", "/api/auth"];

export function authMiddleware(
  middlewareFn?: (
    _auth: { req: NextRequest; authorized: boolean },
    request: NextRequest,
    event: NextFetchEvent
  ) => Promise<Response | undefined> | Response | undefined
) {
  return async function middleware(
    request: NextRequest,
    event: NextFetchEvent
  ) {
    const sessionCookie = getSessionCookie(request);
    const authorized = Boolean(sessionCookie);

    if (middlewareFn) {
      const response = await middlewareFn(
        { req: request, authorized },
        request,
        event
      );
      if (response?.headers.get("Location")) {
        return response;
      }
    }

    const isPublic = publicPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (!(sessionCookie || isPublic)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
  };
}
