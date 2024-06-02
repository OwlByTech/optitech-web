import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod'
export const { auth, signIn, signOut } = NextAuth({
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
                    if (email === "optitech@optitech.com" && password === "optitech")
                        return {
                            name: "Optitech",
                            email: "optitech@gmail.com"
                        }


                }
            }
        })
    ]

})
