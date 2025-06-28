import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MatchesTabs } from './ai-match-form';

export default function AIMatchPage() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <Footer />
    </div>
  );
}
