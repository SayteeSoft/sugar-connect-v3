'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

const CookiePolicyModal = dynamic(() => import('@/components/cookie-policy-modal').then(mod => mod.CookiePolicyModal), { ssr: false });

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This check runs only on the client-side
    const consent = localStorage.getItem('sugarconnect_cookie_consent');
    if (consent !== 'true') {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sugarconnect_cookie_consent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 w-full bg-card border-t z-50 shadow-lg animate-in slide-in-from-bottom-5">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          This Cookie Policy explains how SD Connect ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website, helping us to provide a secure and personalized experience. It explains what these technologies are, why we use them, and your rights to control their use. For more information Click this{' '}
          <CookiePolicyModal />
          {' '}link.
        </p>
        <Button onClick={handleAccept} size="sm" className="flex-shrink-0">
          Accept and Close
        </Button>
      </div>
    </div>
  );
}
