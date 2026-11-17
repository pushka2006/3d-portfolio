import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  fallback: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
});

export const viewport: Viewport = {
  themeColor: "#030014",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Pushkar Balyan | Next-Gen Animated Portfolio — Full Stack Developer & AI Enthusiast",
  description:
    "Explore the futuristic, cinematic 3D portfolio of Pushkar Balyan. Full Stack Developer & AI Enthusiast specializing in Next.js, Python, Autonomous AI Agents, and Real-Time 3D Graphics.",
  keywords: [
    "Pushkar Balyan",
    "Full Stack Developer",
    "AI Enthusiast",
    "Next.js",
    "React",
    "Python",
    "TensorFlow",
    "Three.js",
    "Unreal Engine",
    "MPLADS AI",
    "Omega Nexus",
    "Portfolio",
  ],
  authors: [{ name: "Pushkar Balyan" }],
  creator: "Pushkar Balyan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pushkarbalyan.dev",
    title: "Pushkar Balyan | Next-Gen Animated Portfolio",
    description:
      "Turning Ideas Into Extraordinary Digital Experiences. Full Stack Software Engineer & AI Specialist.",
    siteName: "Pushkar Balyan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pushkar Balyan | Next-Gen Animated Portfolio",
    description:
      "Turning Ideas Into Extraordinary Digital Experiences. Full Stack Software Engineer & AI Specialist.",
    creator: "@pushkarbalyan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#030014] text-foreground min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
