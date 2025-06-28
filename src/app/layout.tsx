import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'SugarConnect',
  description: 'An exclusive platform for ambitious and attractive individuals',
};

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontPlayfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  weight: ['400', '500', '600', '700', '800', '900'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-body antialiased',
          fontInter.variable,
          fontPlayfairDisplay.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
