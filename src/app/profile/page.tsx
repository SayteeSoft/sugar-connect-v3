
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';


export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // In a real app, get the user's ID from session. For now, hardcode to 2.
    const loggedInUserId = 2;
    router.replace(`/profile/${loggedInUserId}`);
  }, [router]);

  return (
    <div className="flex flex-col min-h-screen">
       <Header />
       <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col justify-center items-center gap-4">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <p className="text-muted-foreground">Redirecting to your profile...</p>
       </main>
       <Footer />
     </div>
  );
}
