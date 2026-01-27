import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                // Mock authentication as requested
                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "admin"
                ) {
                    return { id: "1", name: "Admin User", email: "admin@example.com" };
                }
                return null;
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnLogin = nextUrl.pathname.startsWith('/login');

            if (isOnAdmin) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            if (isOnLogin) {
                if (isLoggedIn) return Response.redirect(new URL('/admin', nextUrl));
                return true;
            }

            return true;
        }
    }
});
