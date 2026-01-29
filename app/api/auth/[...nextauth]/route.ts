import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verify } from '@node-rs/argon2';

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials): Promise<NextAuthUser | null> {
                await dbConnect();

                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const user = await User.findOne({ username: credentials.username });

                if (user) {
                    const isValid = await verify(user.password, credentials.password);
                    
                    if (isValid) {
                        // Senior Tip: NextAuth expects an 'id' property. 
                        // Map MongoDB's _id to id to avoid typing issues downstream.
                        return {
                            id: user._id.toString(),
                            name: user.username,
                            email: user.email,
                        };
                    }
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/login',
        newUser: '/register'
    },
    // Required for JWT encryption in production
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        // Adding user ID to the JWT token and session
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };