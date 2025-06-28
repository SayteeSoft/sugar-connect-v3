import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Cormorant_Garamond, Lato, Great_Vibes } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'SugarConnect',
  description: 'An exclusive platform for ambitious and attractive individuals',
};

const fontHeadline = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const fontBody = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  style: ['normal', 'italic'],
});

const fontLogo = Great_Vibes({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-logo',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-body antialiased',
          fontHeadline.variable,
          fontBody.variable,
          fontLogo.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
