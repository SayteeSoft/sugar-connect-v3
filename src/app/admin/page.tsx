
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AdminClient } from './admin-client';
import { getProfiles } from '@/lib/data';

export default function AdminPage() {
  const profiles = getProfiles();

  return (
    <div className="flex flex-col min-h-screen">
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
      <Footer />
    </div>
  );
}
