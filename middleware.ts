import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  return request
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg).*)"],
}
