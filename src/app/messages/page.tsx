import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export default function MessagesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <h1 className="font-headline text-4xl">Messages</h1>
        <p className="mt-4 text-muted-foreground">Your messages page content goes here.</p>
      </main>
      <Footer />
    </div>
  );
}
