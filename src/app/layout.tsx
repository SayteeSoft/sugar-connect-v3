
import type {Metadata} from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import { Alegreya, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import { Footer } from '@/components/layout/footer';
import { MessageSimulator } from '@/components/message-simulator';
import { SocialActivitySimulator } from '@/components/social-activity-simulator';

export const metadata: Metadata = {
  title: 'SugarConnect',
  description: 'An exclusive platform for ambitious and attractive individuals',
};

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontAlegreya = Alegreya({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-alegreya',
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
          fontAlegreya.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen bg-background">
            {children}
            <Footer />
          </div>
          <Toaster />
          <MessageSimulator />
          <SocialActivitySimulator />
        </ThemeProvider>
      </body>
    </html>
  );
}
