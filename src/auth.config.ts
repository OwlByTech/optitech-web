import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";
import { ROUTES_SIDEBAR } from "./modules/dashboard/types";

const publicRoutes = new Set<string>([
    ROUTES_AUTH.LOGIN,
    ROUTES_AUTH.SIGN_UP,
    ROUTES_AUTH.PRINCIPAL,
    ROUTES_AUTH.RESET_PASSWORD,
    ROUTES_AUTH.STEP1,
    ROUTES_AUTH.STEP2,
    ROUTES_AUTH.STEP3
]);

const secureRoutes = new Set<string>([
    ROUTES_SIDEBAR.DASHBOARD
]);

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: ROUTES_AUTH.LOGIN,
        newUser: ROUTES_AUTH.SIGN_UP,
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const { pathname } = nextUrl;

            if (!isLoggedIn && secureRoutes.has(pathname)) {
                return NextResponse.redirect(new URL('/', nextUrl));
            }

            if (isLoggedIn && pathname === ROUTES_AUTH.LOGIN) {
                return NextResponse.redirect(new URL(ROUTES_SIDEBAR.DASHBOARD, nextUrl));
            }

            if (!isLoggedIn && publicRoutes.has(pathname)) {
                return true;
            }

            if (isLoggedIn && publicRoutes.has(pathname)) {
                return NextResponse.redirect(new URL(ROUTES_SIDEBAR.DASHBOARD, nextUrl));
            }
            return true;
        },
    },
    debug: process.env.NODE_ENV !== "production",
    basePath: ROUTES_SIDEBAR.DASHBOARD,
    providers: [],
} satisfies NextAuthConfig;
