import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Changed import path
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const geistSans = GeistSans({ 
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Removed GeistMono as it's not explicitly requested and GeistSans is preferred for UI

export const metadata: Metadata = {
  title: 'MinimaProject',
  description: 'Minimalist Project Management Tool',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
