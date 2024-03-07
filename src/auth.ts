import NextAuth from 'next-auth';  
import Discord from 'next-auth/providers/discord'  

import { authConfig } from './auth.config';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from './lib/prisma';

export const { 
    handlers: { GET, POST },
    auth, 
    signIn, 
    signOut 
} = NextAuth({ 
    ...authConfig,
    adapter: PrismaAdapter(prisma),
    providers: [
        Discord({
            clientId: process.env.DISCORD_CLIENT_ID,
            clientSecret: process.env.DISCORD_CLIENT_SECRET
        })
    ]
})