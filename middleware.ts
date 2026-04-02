import { NextResponse, type NextRequest } from "next/server";

const protectedPrefixes = ["/asdasddfg/admin", "/api/admin"];

function unauthorizedResponse() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Rumos Admin"',
    },
  });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!protectedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!authHeader || !username || !password) {
    return unauthorizedResponse();
  }

  const [scheme, encoded] = authHeader.split(" ");

  if (scheme !== "Basic" || !encoded) {
    return unauthorizedResponse();
  }

  const decoded = atob(encoded);
  const [inputUser, inputPassword] = decoded.split(":");

  if (inputUser !== username || inputPassword !== password) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/asdasddfg/admin/:path*", "/api/admin/:path*"],
};
