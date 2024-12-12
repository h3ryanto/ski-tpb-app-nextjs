import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/layout/Header/page";
import { SessionProvider } from 'next-auth/react';
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
// import { AppSidebar } from "@/components/ui/app-sidebar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "ski-tpb-app",
  description: "Aplikasi TPB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>,
) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiase`}>
        <SessionProvider refetchInterval={60}>
          {/* <SidebarProvider >
            <AppSidebar />
            <SidebarTrigger /> */}

          <div className="flex flex-1 flex-col ">

            <Header />

            {children}
          </div>


          {/* </SidebarProvider> */}
        </SessionProvider>
      </body>
    </html>
  );
}
