import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Dokumen | ski-tpb-app"
};


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>{children}</div>
    )
}



