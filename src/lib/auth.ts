import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      // Restrict to the site owner's GitHub username
      return profile?.login === "martin-luecke";
    },
    async session({ session }) {
      return session;
    },
  },
});
