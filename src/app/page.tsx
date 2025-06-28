import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { FeaturedProfiles } from '@/components/home/featured-profiles';
import { Footer } from '@/components/layout/footer';
import { Testimonials } from '@/components/home/testimonials';
import { SecurityPrivacy } from '@/components/home/security-privacy';
import { ByTheNumbers } from '@/components/home/by-the-numbers';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProfiles />
        <Testimonials />
        <SecurityPrivacy />
        <ByTheNumbers />
      </main>
      <Footer />
    </div>
  );
}
