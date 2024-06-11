import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";

export const authConfig = {

    pages: {
        signIn: ROUTES_AUTH.LOGIN,
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            if (isLoggedIn && nextUrl.pathname === ROUTES_AUTH.LOGIN) {
                return NextResponse.redirect(new URL('/', nextUrl));
            } else if (isLoggedIn) {
                return true
            } else {
                return false
            }

        },


    },
    debug: process.env.ENV === "prod" ? false : true,
    basePath: '/',
    providers: []


} satisfies NextAuthConfig
