import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "GitLost - Smart .gitignore Generator",
  description: "Generate accurate and comprehensive .gitignore files for your projects with GitLost. Supports 249+ templates, auto-detection, and modern interface.",
  keywords: "gitignore, git, generator, developer tools, web development, programming",
  authors: [{ name: "BytexGrid" }],
  openGraph: {
    title: "GitLost - Smart .gitignore Generator",
    description: "Generate accurate and comprehensive .gitignore files for your projects with GitLost. Supports 249+ templates, auto-detection, and modern interface.",
    url: "https://bytexgrid.github.io/gitlost",
    siteName: "GitLost",
    images: [
      {
        url: "https://bytexgrid.github.io/gitlost/gitlost-app/public/og-image.png",
        width: 1200,
        height: 630,
        alt: "GitLost - Smart .gitignore Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitLost - Smart .gitignore Generator",
    description: "Generate accurate and comprehensive .gitignore files for your projects with GitLost. Supports 249+ templates, auto-detection, and modern interface.",
    images: ["https://bytexgrid.github.io/gitlost/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/gitlost/logo.ico" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
