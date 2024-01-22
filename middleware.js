import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./app/helper/authenticate";

export async function middleware(request) {
    let user;
    try {
        user = await verifyAuth(request);
    } catch (error) {
        console.log(error);
    }

    if (user && (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/register")) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    if (!user && request.nextUrl.pathname === "/home") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ '/', '/home','/register' ],
  }