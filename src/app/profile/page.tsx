
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { useAuth } from '@/hooks/use-auth';


export default function ProfileRedirectPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace(`/profile/${user.id}`);
      } else {
        router.replace('/login');
      }
    }
  }, [router, user, isLoading]);

  return (
    <>
       <Header />
       <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col justify-center items-center gap-4">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
         <p className="text-muted-foreground">Redirecting to your profile...</p>
       </main>
     </>
  );
}
