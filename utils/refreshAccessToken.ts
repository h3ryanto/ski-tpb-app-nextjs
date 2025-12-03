import axios from "axios"
import { serialize } from 'cookie'
import { signOut } from "@/auth"
// import { NextRequest } from "next/server";

// refreshAccessToken di NextAuth config
async function refreshAccessToken(token: any) {
    try {
        const accessRefreshToken = token.refreshAccessToken
        const cookie = serialize('refresh_token', accessRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production' ? true : false,
            domain: `${process.env.NODE_ENV == 'production' ? 'app.heryheryanto.my.id' : 'localhost'}`,
            sameSite: 'none',
            path: '/',
            maxAge: Date.now() + 2 * 60 * 1000,
        })
        // console.log(accessRefreshToken, "refresh sebelum refresh token")
        const res = await axios.post(
            `${process.env.API_URL}/auth/refresh`,
            {}, // body kosong
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Cookie": cookie,

                }
            } // ini wajib agar cookie refresh_token terkirim
        );

        const data = res.data;
        // console.log(data.refreshAccessToken, "refresh hasil refresh token")
        return {
            ...token,
            accessToken: data.accessToken,
            refreshAccessToken: data.refreshAccessToken,
            accessTokenExpires: Date.now() + 10 * 60 * 1000,
        };
    } catch (error: any) {
        console.error("Error refreshing token:", error.response?.data || error.message);
        await signOut()
        return { ...token, error: "RefreshAccessTokenError" };
    }
}

export default refreshAccessToken;