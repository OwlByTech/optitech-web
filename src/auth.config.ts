import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";

const publicRoutes = new Set([
    ROUTES_AUTH.LOGIN,
    ROUTES_AUTH.SING_UP,
    ROUTES_AUTH.PRINCIPAL,
    ROUTES_AUTH.RESET_PASSWORD,
    ROUTES_AUTH.STEP1,
    ROUTES_AUTH.STEP2,
    ROUTES_AUTH.STEP3
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

            if (isLoggedIn && pathname === ROUTES_AUTH.LOGIN) {
                return NextResponse.redirect(new URL('/', nextUrl));
            }

            if (!isLoggedIn && publicRoutes.has(pathname)) {
                return true;
            }
            
            if (isLoggedIn && publicRoutes.has(pathname)) {
                return NextResponse.redirect(new URL('/', nextUrl));
            }

            if (!isLoggedIn) {
                return NextResponse.redirect(new URL(ROUTES_AUTH.PRINCIPAL, nextUrl));
            }

            return true;
        },
    },
    debug: process.env.NODE_ENV !== "production",
    basePath: '/',
    providers: [],
} satisfies NextAuthConfig;
