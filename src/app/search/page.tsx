
import { Header } from '@/components/layout/header';
import { SearchClient } from './search-client';
import { getProfiles, getProfile } from '@/lib/data';

export default async function SearchPage() {
  const profiles = getProfiles();
  const loggedInUser = getProfile(1);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="text-center mb-8">
            <h1 className="font-headline text-4xl text-primary">Discover Your Match</h1>
            <p className="text-muted-foreground mt-2">
                Use our advanced search to find exactly who you're looking for.
            </p>
        </div>
        <SearchClient initialProfiles={profiles} initialLoggedInUser={loggedInUser} />
      </main>
    </>
  );
}
