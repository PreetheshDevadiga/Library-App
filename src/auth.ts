
import { db } from './db/db';
import NextAuth, { User } from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { MemberRepository } from "./repository/member.repository";
import bcrypt from 'bcrypt';
 import {IMember} from './models/member.model'
 import Google from "next-auth/providers/google"

const memberRepo = new MemberRepository(db);

function mapMemberToUser(member: IMember): User {
  
  return {
    id: String(member.id),
    name: member.firstName,
    email: member.email,
  };
}

async function getUser(email: string):Promise<IMember | undefined> {
  try {
    const user = await memberRepo.getByEmail(email);
    if(user) return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { handlers,auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [Google,
    Credentials({
      async authorize(credentials) {
        console.log(credentials);
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          let passwordsMatch=false;
          if(user?.password){
            passwordsMatch = await bcrypt.compare(password, user.password);
            
          }
          if (passwordsMatch && user){
            console.log("inside password match");
             return mapMemberToUser(user)
            }else {
              console.log("inside else password doesnt match")
              return null;
            };
        }
 
        return null;
      },
    }),
  ],
});