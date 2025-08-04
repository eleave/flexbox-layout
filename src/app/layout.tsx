import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grid Layout Example",
  description: "A simple example of a grid layout using React components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const blackPanelClassName =
    "h-10 bg-foreground text-background text-center flex items-center justify-center";
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className={blackPanelClassName}>Header</header>
        <main>{children}</main>
        <footer className={blackPanelClassName}>Footer</footer>
      </body>
    </html>
  );
}
