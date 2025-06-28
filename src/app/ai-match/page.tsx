import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { AIMatchForm } from './ai-match-form';

export default function AIMatchPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-headline text-4xl text-primary">AI Match</h1>
            <p className="text-muted-foreground mt-2">
              Let our AI find the perfect match for you based on your profile and preferences.
            </p>
          </div>
          <AIMatchForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
