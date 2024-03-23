import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@appli/ui";
import { cn } from "@appli/ui/lib/utils";

import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";

import "@appli/ui/globals.css";

import { GridDetail } from "@appli/ui";

import { Navigation } from "./_components/navigation";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://turbo.t3.gg"
      : "http://localhost:3000",
  ),
  title: "Appli | Streamline job applications",
  description: "Appli is a platform to streamline job applications",
  openGraph: {
    title: "Appli | Streamline job applications",
    description: "Appli is a platform to streamline job applications",
    url: env.KINDE_SITE_URL,
    siteName: "Appli",
  },
  twitter: {
    card: "summary_large_image",
    site: "@alex_streza",
    creator: "@alex_streza",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TRPCReactProvider>
            <Navigation />
            {props.children}
            <GridDetail />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
