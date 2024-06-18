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

            // Si está autenticado y quiere acceder a la página de login, redirigir a /
            if (isLoggedIn && pathname === ROUTES_AUTH.LOGIN) {
                return NextResponse.redirect(new URL('/', nextUrl));
            }

            // Permitir acceso a rutas públicas
            if (!isLoggedIn && publicRoutes.has(pathname)) {
                return true;
            }

            // Redirigir a login si no está autenticado y está intentando acceder a otras rutas
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
