import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import CredentialsProvider from 'next-auth/providers/credentials'

declare module 'next-auth' {
    interface Session {
        user: {
            name: any
            email: any
        } & DefaultSession['user']
    }
    interface JWT extends DefaultJWT {
        user: {
            name: any
            email: any
        } & DefaultJWT
    }
}


const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/'
    },
    secret: 'asfkasdlasd',
    debug: true,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'ddentification', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            //@ts-ignore
            async authorize(credentials, req) {

                try {
                    const user = { email: "demo@demo.com", password: "demo" }

                    console.log(credentials)
                    if (user.email === credentials?.email && user.password === credentials?.password) {
                        console.log("validate")
                        return {
                            ...user, name: "Demo Demo"

                        }
                    } else {
                        return null
                    }
                } catch (e) {
                    console.log(e)
                }


            }
        })
    ],
    callbacks: {
        async jwt({ token, user, session, trigger, account }) {
            if (Number(token?.token_expires) < Date.now()) {
                return null
            }
            if (trigger === 'update') {
                return { ...session, ...session }
            }

            if (user) return { ...token, ...user }
            return token
        },

        async session({ token, session }) {
            session.user = {
                name: token.name,
                email: token.email,
            }
            return session
        }
    }
}

export default authOptions
