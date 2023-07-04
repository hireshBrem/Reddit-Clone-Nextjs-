'use client';

import { ThemeProvider } from "next-themes";

export default function TProvider({children}: any){
    return (
        <>
            <ThemeProvider attribute="class">
                {children}
            </ThemeProvider>
        </>
    )
}