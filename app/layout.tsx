import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
// import Header from "../components/layout/Header/page";
import { SessionProvider } from 'next-auth/react';
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import AppBreadCrumb from "@/components/ui/app-bredcrumb";
import { ThemeProvider } from "@/components/ui/theme-provider"
import { MenuProvider } from "@/contexts/MenuContext";


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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiase text-sm`}>
        <SessionProvider refetchInterval={60}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* 🔥 WAJIB DI SINI */}
            <MenuProvider>
              <SidebarProvider>
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
            </MenuProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
