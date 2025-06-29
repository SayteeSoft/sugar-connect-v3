
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { AdminClient } from './admin-client';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

export default function AdminPage() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading } = useAuth();
  const isAdmin = user?.id === 1;

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading || !isLoggedIn) {
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
        <AdminClient />
      </main>
    </>
  );
}
