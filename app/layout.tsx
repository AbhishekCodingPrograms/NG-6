import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SessionProvider from "@/components/SessionProvider";
import HeaderActions from "@/components/HeaderActions";
import MobileMenu from "@/components/MobileMenu";
import WeatherDateWidget from "@/components/WeatherDateWidget";

import { getMenu } from '@/lib/api';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  title: "NotesGallery Publisher Platform",
  description: "Enterprise-grade technology news and educational platform.",
  manifest: "/manifest.json",
  themeColor: "#d32f2f",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [primaryMenu, footerMenu] = await Promise.all([
    getMenu('primary'),
    getMenu('footer')
  ]);

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <SessionProvider>
          <Providers>
          {/* Ticker */}
        <div className="hidden md:block ticker-container">
          <div className="ticker-content">
            <span className="mr-8">SENSEX: 74,221 <span className="text-green-500">▲ +120</span></span>
            <span className="mr-8">AKTU RESULTS: <span className="text-green-500">DECLARED</span></span>
            <span className="mr-8">TCS HIRING: <span className="text-red-500">DEADLINE TOMORROW</span></span>
          </div>
        </div>

        {/* Header */}
        <header className="border-b border-border py-2 md:py-4 relative z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 flex justify-between items-center">
            
            {/* Left: Mobile Menu & Weather */}
            <div className="flex items-center gap-4 flex-1">
              <MobileMenu menuItems={primaryMenu} />
              <WeatherDateWidget />
            </div>

            {/* Center: Logo */}
            <div className="text-center flex-1">
              <a href="/" className="inline-block group">
                <h1 className="text-2xl md:text-4xl font-serif font-black tracking-tighter text-foreground group-hover:text-primary transition-colors">
                  NotesGallery<span className="text-primary">.</span>
                </h1>
              </a>
            </div>

            {/* Right: User / Search */}
            <div className="w-1/4 flex justify-end items-center gap-4">
              <button aria-label="Search" className="text-foreground hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
            </div>
            
          </div>
        </header>

        {/* Navigation */}
        <nav className="border-b border-border sticky top-0 bg-background z-50">
          <div className="container mx-auto px-4">
            <ul className="flex justify-center overflow-x-auto hide-scrollbar whitespace-nowrap">
              {primaryMenu.length > 0 ? (
                primaryMenu.map((item) => (
                  <li key={item.id}>
                    <a href={item.url} className="block nav-link text-primary hover:text-primary-dark transition-colors">
                      {item.title}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="/" className="block nav-link text-primary">Home</a></li>
                  <li><a href="/free-courses" className="block nav-link">Free Courses</a></li>
                  <li><a href="/internships" className="block nav-link">Internships</a></li>
                  <li><a href="/blog" className="block nav-link">Blog</a></li>
                  <li><a href="/recruitment" className="block nav-link">Recruitment</a></li>
                  <li><a href="/govt-jobs" className="block nav-link">Govt Job</a></li>
                  <li><a href="/hackathon" className="block nav-link">Hackathon</a></li>
                  <li><a href="/jobs" className="block nav-link">Jobs</a></li>
                </>
              )}
            </ul>
          </div>
        </nav>

        <main className="flex-1">{children}</main>

        {/* Footer */}
        <footer className="bg-slate-900 dark:bg-black text-white mt-16 py-12 border-t-4 border-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <h2 className="text-2xl font-serif font-bold mb-4">NotesGallery</h2>
                <p className="text-sm text-gray-400 w-3/4">The premier destination for AKTU students. Get instant access to news, syllabus, previous year papers, and premium notes.</p>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-4">Categories</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">AKTU News</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Notes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Papers</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-wider mb-4">Company</h3>
                <ul className="space-y-2 text-sm text-gray-400">
                  {footerMenu.length > 0 ? (
                    footerMenu.map((item) => (
                      <li key={item.id}>
                        <a href={item.url} className="hover:text-white transition-colors">{item.title}</a>
                      </li>
                    ))
                  ) : (
                    <>
                      <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                      <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
              &copy; 2026 NotesGallery. All rights reserved.
            </div>
            </div>
          </footer>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
