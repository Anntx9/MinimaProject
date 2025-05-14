import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

// The GeistSans object from 'geist/font/sans' directly provides the .variable property.
// We don't need to call it as a function.
// The variable name (e.g., '--font-geist-sans') is automatically provided.

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
      {/* Use GeistSans.variable directly */}
      <body className={`${GeistSans.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
