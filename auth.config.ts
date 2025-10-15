import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import axios from "axios"

export default {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials: any) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };

                try {
                    // 🔐 Kirim login ke API Golang
                    const res = await axios.post(
                        `${process.env.API_URL}/auth/login`,
                        { email, password },
                        {
                            withCredentials: true, // wajib agar cookie refresh_token diterima
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        }
                    );


                    console.log(`${process.env.API_URL}`)
                    // // 🍪 Ambil Set-Cookie dari response Golang
                    // const setCookie = res.headers["set-cookie"]?.values;
                    // console.log(setCookie, "dapat dari goolang")
                    // if (setCookie) {
                    //     // Teruskan cookie refresh_token ke browser client
                    //     req.res?.setHeader("Set-Cookie", setCookie);
                    //     console.log("✅ Forwarded refresh_token cookie to browser");
                    // } else {
                    //     console.warn("⚠️ Tidak ada cookie diterima dari API Golang");
                    // }
                    // console.log(req.cookies.get('refresh_token')?.value, "dapat dari browser")
                    // 🧠 Pastikan email cocok & user valid
                    // console.log(res.data, "dapat dari goolang")
                    if (res.data && res.data.email === email) {
                        // if (res.data.isActive) {
                        const user = {
                            email: res.data.email,
                            name: res.data.name,
                            photo: res.data.photo,
                            isAdmin: res.data.isAdmin,
                            // isGuest: res.data.isGuest,
                            accessToken: res.data.accessToken, // dari JSON response
                            refreshAccessToken: res.data.refreshAccessToken
                        };
                        return user;
                        // }
                    }

                    return null; // invalid login
                } catch (error: any) {
                    console.error("❌ Error during authorize:", error.response?.data || error.message);
                    return null;
                }
            },
        }),
    ],
} satisfies NextAuthConfig;