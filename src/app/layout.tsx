import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Playfair_Display, Roboto } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'SugarConnect',
  description: 'An exclusive platform for ambitious and attractive individuals',
};

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
});

const fontBody = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  style: ['normal', 'italic'],
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
          fontBody.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
