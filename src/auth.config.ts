import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {

    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            if (isLoggedIn && nextUrl.pathname === '/login') {
                return NextResponse.redirect(new URL('/', nextUrl));
            } else if (isLoggedIn) {
                return true
            } else {
                return false
            }

        },


    },

    basePath: '/',
    providers: []


} satisfies NextAuthConfig
