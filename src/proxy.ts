import { NextResponse, type NextRequest } from "next/server";

import { isLocale } from "@/lib/i18n";

/** Send locale-less paths to the Uzbek default. */
export function proxy(request: NextRequest) {
  const [, first] = request.nextUrl.pathname.split("/");
  if (first && isLocale(first)) return;

  const url = request.nextUrl.clone();
  url.pathname = `/uz${request.nextUrl.pathname === "/" ? "" : request.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|images|favicon.ico|.*\\..*).*)"],
};
