import type { Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/client";
import { ThemeProvider } from "next-themes";

import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import {NuqsAdapter} from "nuqs/adapters/next";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ConvoGenius - AI-Powered ConvoGeniusing Assistant",
  description: "Transform your ConvoGeniusings with AI assistants that understand, participate, and elevate every conversation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="en" suppressHydrationWarning className="!scroll-smooth">
          <body
            className={`${jakarta.className} antialiased`}
          >
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange
              storageKey="theme"
            >
              <Toaster/>
              {children}
            </ThemeProvider>
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
  );
}
