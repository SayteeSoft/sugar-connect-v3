'use client';

import { useState, useEffect } from "react";
import type { Profile } from "@/lib/data";
import { getProfiles } from "@/lib/data";
import { ProfileCard } from "@/components/profile-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    // Get profiles from client-side storage to reflect any updates
    const allProfiles = getProfiles();
    setProfiles(allProfiles);
  }, []);

  const displayedProfiles = profiles.slice(0, 4);

  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          Featured Profiles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {displayedProfiles.length > 0 ? (
            displayedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))
          ) : (
            Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="rounded-lg aspect-[4/5] w-full" />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
