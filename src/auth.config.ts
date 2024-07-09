import { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import { ROUTES_AUTH } from "./modules/auth/types/auth";
import { ROUTES_CONFIG, ROUTES_SIDEBAR } from "./modules/dashboard/types";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: ROUTES_AUTH.LOGIN,
        newUser: ROUTES_AUTH.SIGN_UP,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.token = user.token;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.token = token.token as string;
            return session;
        },
    },
    debug: process.env.NODE_ENV !== "production",
    basePath: ROUTES_SIDEBAR.DASHBOARD,
    providers: [],
} satisfies NextAuthConfig;
