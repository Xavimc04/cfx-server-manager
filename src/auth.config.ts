import { NextAuthConfig } from "next-auth";

export const authConfig = { 
    providers: [],
    callbacks: {
        session({ token, session } : { token:any, session:any }) {
            if(token && session) {
                session.user.id = token.id
                session.user.email = token.email
                session.user.name = token.name
                session.user.image = token.image
            }

            return session; 
        }
    },
} satisfies NextAuthConfig;