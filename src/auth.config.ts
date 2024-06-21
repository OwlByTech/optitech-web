import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";
import path from "path";

const publicRoutes = new Set<string>([
    ROUTES_AUTH.LOGIN,
    ROUTES_AUTH.SING_UP,
    ROUTES_AUTH.RESET_PASSWORD
]);

const secureRoutes = new Set<string>([
    ROUTES_AUTH.DASHBOARD
]);

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: ROUTES_AUTH.LOGIN,
        newUser: ROUTES_AUTH.SING_UP,
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            if(!isLoggedIn && secureRoutes.has(pathname)){
                return NextResponse.redirect(new URL('/', nextUrl));
            }

            if (isLoggedIn && pathname === ROUTES_AUTH.LOGIN) {
                return NextResponse.redirect(new URL(ROUTES_AUTH.DASHBOARD, nextUrl));
            }

            if (!isLoggedIn && publicRoutes.has(pathname)) {
                return true;
            }

            if (isLoggedIn && publicRoutes.has(pathname)) {
                return NextResponse.redirect(new URL(ROUTES_AUTH.DASHBOARD, nextUrl));
            }
            
            return true;
        },
    },
    debug: process.env.NODE_ENV !== "production",
    basePath: ROUTES_AUTH.DASHBOARD,
    providers: [],
} satisfies NextAuthConfig;
