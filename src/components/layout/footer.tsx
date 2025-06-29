'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import dynamic from 'next/dynamic';

const CookiePolicyModal = dynamic(() => import('../cookie-policy-modal').then(mod => mod.CookiePolicyModal), { ssr: false });
const PrivacyPolicyModal = dynamic(() => import('../privacy-policy-modal').then(mod => mod.PrivacyPolicyModal), { ssr: false });
const TermsOfUseModal = dynamic(() => import('../terms-of-use-modal').then(mod => mod.TermsOfUseModal), { ssr: false });


export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        {/* Logo & Name */}
        <div className="mb-8 space-y-4">
          <Link href="/" className="font-headline text-lg font-bold text-primary inline-flex items-center gap-2 justify-center">
            <Heart className="h-5 w-5" />
            SugarConnect
          </Link>
          <p className="text-sm text-muted-foreground">An exclusive platform for ambitious and attractive individuals.</p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Site */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Site</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Glossary</Link></li>
            </ul>
          </div>

          {/* Column 2: Policies */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Policies</h3>
            <ul className="space-y-2">
              <li><CookiePolicyModal /></li>
              <li><PrivacyPolicyModal /></li>
              <li><TermsOfUseModal /></li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
              <li><Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} SugarConnect. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
