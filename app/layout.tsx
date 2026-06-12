import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import SessionProvider from "@/components/SessionProvider";
import HeaderActions from "@/components/HeaderActions";
import MobileMenu from "@/components/MobileMenu";
import WeatherDateWidget from "@/components/WeatherDateWidget";

import { getMenu, getTopCategoriesAsMenu, getLatestPosts } from '@/lib/api';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata: Metadata = {
  metadataBase: new URL('https://notesgallery.in'),
  title: {
    default: "NotesGallery | Premium Tech News & AKTU Updates",
    template: "%s | NotesGallery",
  },
  description: "The premier destination for AKTU students and tech enthusiasts. Get instant access to the latest technology news, university updates, free courses, and premium internships.",
  keywords: ["AKTU", "Technology News", "Internships", "Free Courses", "NotesGallery", "BTech Notes"],
  openGraph: {
    title: "NotesGallery | Premium Tech News & AKTU Updates",
    description: "The premier destination for AKTU students and tech enthusiasts. Get instant access to the latest technology news, university updates, free courses, and premium internships.",
    url: 'https://notesgallery.in',
    siteName: 'NotesGallery',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "NotesGallery | Premium Tech News & AKTU Updates",
    description: "Instant access to AKTU news, tech updates, internships, and study materials.",
  },
  manifest: "/manifest.json",
  themeColor: "#2563eb",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [primaryMenu, footerMenu, latestPosts] = await Promise.all([
    getTopCategoriesAsMenu(),
    getMenu('footer'),
    getLatestPosts(5)
  ]);

  // Duplicate posts for seamless infinite scroll
  const tickerItems = [...latestPosts, ...latestPosts];

  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="antialiased font-sans min-h-screen flex flex-col">
        <SessionProvider>
          <Providers>
            {/* Ticker */}
            {latestPosts.length > 0 && (
              <div className="hidden md:block bg-[#111] text-white text-xs font-bold py-2 overflow-hidden whitespace-nowrap relative border-b border-gray-800">
                <div className="animate-ticker inline-block w-max">
                  {tickerItems.map((post, idx) => (
                    <span key={`${post.id}-${idx}`} className="mx-8">
                      <span className="text-primary mr-2 uppercase">{post.category_names?.[0] || 'LATEST'}</span>
                      <a href={`/article/${post.slug}`} className="hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: post.title.rendered }}></a>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Header */}
            <header className="border-b border-border py-2 md:py-4 relative z-50 bg-background">
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

                {/* Right: Actions */}
                <HeaderActions />

              </div>
            </header>

            {/* Navigation */}
            <nav className="border-b border-border sticky top-0 bg-background z-50">
              <div className="container mx-auto px-4">
                <ul className="flex md:justify-center overflow-x-auto hide-scrollbar whitespace-nowrap -mx-4 px-4 md:mx-0 md:px-0 gap-2">
                  <li><a href="/" className="block nav-link text-primary hover:text-primary-dark transition-colors">Home</a></li>
                  {primaryMenu.length > 0 && primaryMenu.map((item) => (
                    <li key={item.id}>
                      <a href={item.url} className="block nav-link text-primary hover:text-primary-dark transition-colors">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-[#0a0a0a] text-gray-300 py-16 border-t-4 border-primary">
              <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
                  {/* Brand & Bio */}
                  <div className="md:col-span-12 lg:col-span-5">
                    <a href="/" className="inline-block group mb-6">
                      <h2 className="text-3xl font-serif font-black tracking-tighter text-white group-hover:text-primary transition-colors">
                        NotesGallery<span className="text-primary">.</span>
                      </h2>
                    </a>
                    <p className="text-sm text-gray-400 leading-relaxed mb-8 max-w-md">
                      The premier destination for AKTU students and tech enthusiasts. Get instant access to the latest technology news, university updates, free courses, and premium internships to accelerate your career.
                    </p>
                    {/* Social Icons */}
                    <div className="flex gap-4">
                      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                      </a>
                      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                      </a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                      </a>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="md:col-span-4 lg:col-span-2 lg:col-start-7">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Categories</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      {primaryMenu.slice(0, 5).map((item) => (
                        <li key={`footer-cat-${item.id}`}>
                          <a href={item.url} className="hover:text-primary transition-colors flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Quick Links */}
                  <div className="md:col-span-4 lg:col-span-2">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Company</h3>
                    <ul className="space-y-3 text-sm text-gray-400">
                      <li>
                        <a href="/about" className="hover:text-primary transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-primary transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          Contact
                        </a>
                      </li>
                      <li>
                        <a href="/privacy-policy" className="hover:text-primary transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          Privacy Policy
                        </a>
                      </li>
                      <li>
                        <a href="/terms-of-use" className="hover:text-primary transition-colors flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                          Terms of Use
                        </a>
                      </li>
                    </ul>
                  </div>

                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                  <div>
                    &copy; {new Date().getFullYear()} NotesGallery. All rights reserved.
                  </div>
                  <div className="flex gap-6">
                    <a href="/privacy-policy" className="hover:text-white transition-colors">Privacy</a>
                    <a href="/terms-of-use" className="hover:text-white transition-colors">Terms</a>
                    <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
                  </div>
                </div>
              </div>
            </footer>
          </Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
