import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { FeaturedProfiles } from '@/components/home/featured-profiles';
import { Footer } from '@/components/layout/footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProfiles />
      </main>
      <Footer />
    </div>
  );
}
