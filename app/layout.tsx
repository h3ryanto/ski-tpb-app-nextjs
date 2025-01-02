import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Header from "../components/layout/Header/page";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import AppBreadCrumb from "@/components/ui/app-bredcrumb";

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
          <SidebarProvider >
            <div className="grid grid-cols-[auto,1fr] w-full">
              <AppSidebar />

              <SidebarInset>
                <AppBreadCrumb />
                <main>

                  {children}
                  <Toaster />
                </main>
              </SidebarInset>
            </div>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
