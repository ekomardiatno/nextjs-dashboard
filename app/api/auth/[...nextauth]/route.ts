import { User } from '@/app/lib/definitions';
import prisma from '../../../lib/prisma';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

const authOption: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login'
  },
  providers: [
    Credentials({
      type: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {label: "Email", type: 'email'},
        password: {label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }
        return null;
      },
    })
  ],
  callbacks: {
    async jwt({ token, account, profile, user }) {
      if(account?.provider === 'credentials') {
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }: any) {
      if('email' in token) {
        session.user.email = token.email
      }
      if('name' in token) {
        session.user.name = token.name
      }
      return session
    }
  }
}

const handler = NextAuth(authOption)

export {
  handler as GET, handler as POST
}