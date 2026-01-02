import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VALogoBar from "./components/VALogoBar";
import { Toaster } from "sonner";
import { AppContextInterface, AppContextProvider } from "./AppContext";
import { IntrospectResponse, introspectUser } from "@/lib/auth/introspect";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VA Collection - Handmade Jewelry",
  description: "Handmade jewelry crafted with care in Sri Lanka.",

  openGraph: {
    title: "VA Collection - Handmade Jewelry",
    description: "Discover handmade jewelry by VA Collection.",
    url: "https://vacollection.web.lk",
    siteName: "VA Collection",
    images: [
      {
        url: "https://vacollection.web.lk/app_logo.png",
        width: 1200,
        height: 630,
        alt: "VA Collection Handmade Jewelry",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appContext: AppContextInterface = {
    username: "",
    isLoggedIn: false,
    userID: 0,
    userRole: "NONE",
  };

  const userInstrospect: IntrospectResponse | null = await introspectUser();
  if (userInstrospect) {
    appContext.isLoggedIn = true;
    appContext.username = userInstrospect.full_name;
    appContext.userID = userInstrospect.id;
    appContext.userRole = userInstrospect.role;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppContextProvider context={appContext}>
          <header className="relative z-50">
            <VALogoBar />
          </header>
          <main className="flex-1">
            <div>{children}</div>
            <Toaster richColors position="top-right" />
          </main>
        </AppContextProvider>
      </body>
    </html>
  );
}
