
'use client';

import { Header } from '@/components/layout/header';
import { MatchesTabs } from './ai-match-form';

export default function AIMatchPage() {
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
        <MatchesTabs />
      </main>
    </>
  );
}
