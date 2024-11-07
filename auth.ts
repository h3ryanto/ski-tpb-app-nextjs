/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import authConfig from "./auth.config"


 
// export const authOptions : NextAuthOptions= { 
  export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {strategy: "jwt"},
//   secret: process.env.NEXTAUTH_SECRET, 
...authConfig,
  callbacks:{
    async jwt({token,account, profile,user}:any){
      if (account) {
        token.accessToken = account.access_token
        token.id  = user.email;
      }
      return token
    } ,
    async session({ session, token}:any) {
      // Send properties to the client, like an access_token from a provider.
      if (token.id ){
        session.accessToken = token.accessToken
        session.user.email = token.id 
      }
      
      return session
    }
  },
pages: {
//   signIn: '/login'
}
  
// }
});

// export default NextAuth(authOptions)

