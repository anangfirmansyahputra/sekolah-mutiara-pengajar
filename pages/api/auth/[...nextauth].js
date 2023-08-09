import AuthService from "@/services/auth.service";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            authorize: async (credentials) => {

                const loginResponse = await AuthService.login(credentials);

                if (loginResponse) {
                    return {
                        user: loginResponse.data,
                    };
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            session.user = token;
            return session;
        },
    },
    secret: "tolejs"
});
