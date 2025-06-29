
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { AdminClient } from './admin-client';
import { getProfiles, getProfile, type Profile } from '@/lib/data';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AdminPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loggedInStatus = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (!loggedInStatus) {
      router.replace('/login');
      return;
    }

    // For demo, hardcoding admin user ID as 1
    const adminProfile = getProfile(1);
    if (adminProfile && adminProfile.id === 1) {
      setIsAdmin(true);
      setProfiles(getProfiles());
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 text-center">
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">You do not have permission to view this page.</p>
              <Button onClick={() => router.push('/')} className="mt-4">Back to Home</Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="mb-8 text-center">
            <h1 className="font-headline text-4xl text-primary">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
                Manage user profiles and site settings.
            </p>
        </div>
        <AdminClient initialProfiles={profiles} />
      </main>
    </>
  );
}
