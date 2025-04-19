import type { Metadata } from 'next';
import Image from 'next/image';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Poké Matcher',
  description: 'Find out which Pokémon matches your personality !',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <header className="flex justify-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Pokématcher"
              priority={true}
              width={500}
              height={500}
              className="w-auto h-auto"
            />
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
