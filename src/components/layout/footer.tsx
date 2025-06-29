
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { CookiePolicyModal } from '../cookie-policy-modal';
import { PrivacyPolicyModal } from '../privacy-policy-modal';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check login status from localStorage on component mount
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
    }
  }, []);

  return (
    <footer className="w-full border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8 text-center">
        {/* Logo & Name */}
        <div className="mb-8 space-y-4">
          <Link href="/" className="font-headline text-lg font-bold text-primary inline-flex items-center gap-2 justify-center">
            <Heart className="h-5 w-5" />
            SugarConnect
          </Link>
        </div>

        {/* Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Site */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Site</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
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
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
            </ul>
          </div>

          {/* Column 3: Help */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Help</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
              {isLoggedIn && (
                <li><Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin</Link></li>
              )}
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-6 space-y-2">
            <p className="text-sm text-muted-foreground">
              An exclusive platform for ambitious and attractive individuals.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} SugarConnect. All rights reserved.
            </p>
        </div>
      </div>
    </footer>
  );
}
