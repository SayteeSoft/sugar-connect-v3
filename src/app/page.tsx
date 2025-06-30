
'use client';

import { Header } from '@/components/layout/header';
import { Hero } from '@/components/home/hero';
import { FeaturedProfiles } from '@/components/home/featured-profiles';
import { Testimonials } from '@/components/home/testimonials';
import { SecurityPrivacy } from '@/components/home/security-privacy';
import { ByTheNumbers } from '@/components/home/by-the-numbers';
import { WhatIsSugarRelationship } from '@/components/home/what-is-sugar-relationship';
import { WhatIsDefinitions } from '@/components/home/what-is-definitions';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <FeaturedProfiles />
        <Testimonials />
        <WhatIsSugarRelationship />
        <WhatIsDefinitions />
        <SecurityPrivacy />
        <ByTheNumbers />
      </main>
    </>
  );
}
