import NextAuth, {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { checkUserInDB, addUserToDB } from '@/app/server_actions/actions';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],

}
  // Add any additional configuration options

const handler=NextAuth(authOptions)

export {handler as GET , handler as POST}