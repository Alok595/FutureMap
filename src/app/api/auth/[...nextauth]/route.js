import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        
        await connectToDatabase();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user || !user.password) {
          throw new Error("No user found with this email, or they used a different login method.");
        }
        
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }
        
        return user;
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        try {
          await connectToDatabase();
          
          let existingUser = await User.findOne({ email: user.email });
          const role = user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user';
          
          if (!existingUser) {
            existingUser = await User.create({
              name: user.name,
              email: user.email,
              image: user.image,
              provider: 'google',
              role: role,
            });
          } else {
            // Auto upgrade if they were a user but their email is now the admin email
            if (existingUser.role !== role && user.email === process.env.ADMIN_EMAIL) {
              existingUser.role = role;
              await existingUser.save();
            }
          }
          
          return true;
        } catch (error) {
          console.error("Error saving user to database", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      // Always fetch the latest user data from DB to keep the role in sync
      if (token.email) {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.role = dbUser.role;
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
