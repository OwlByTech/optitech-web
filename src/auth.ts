import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
import { loginService } from "./modules/auth/services";
export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            //@ts-ignore
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    console.log(email, password)
                    const token = await loginService(email, password)

                    if (token) {
                        return { token };
                    } else {
                        return null;
                    }

                } else {
                    return null;
                }
            }
        })
    ],
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
        }
    }

})
