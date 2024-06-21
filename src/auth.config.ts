import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";

const publicRoutes = new Set([
    ROUTES_AUTH.LOGIN,
    ROUTES_AUTH.SING_UP,
    ROUTES_AUTH.PRINCIPAL,
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
