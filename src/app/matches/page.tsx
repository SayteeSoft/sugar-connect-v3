
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { MatchesTabs } from './match-form';
import { getProfiles, getProfile, type Profile } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function MatchesPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentUser, setCurrentUser] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const allProfiles = getProfiles();
    const user = getProfile(1);
    setProfiles(allProfiles);
    setCurrentUser(user);
    setIsLoading(false);
  }, []);


  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl text-primary">Matches</h1>
          <p className="text-muted-foreground mt-2">
            Browse your favorites, see who visited your profile, and who you have viewed.
          </p>
        </div>
        {isLoading ? (
            <div className="w-full">
                <div className="grid w-full lg:w-1/3 grid-cols-3 mx-auto">
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                    <Skeleton className="h-10" />
                </div>
                <div className="space-y-3 max-w-3xl mx-auto mt-6">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        ) : (
            <MatchesTabs initialProfiles={profiles} initialCurrentUser={currentUser} />
        )}
      </main>
    </>
  );
}
