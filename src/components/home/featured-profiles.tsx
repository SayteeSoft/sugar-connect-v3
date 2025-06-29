'use client';

import { useState, useEffect } from "react";
import type { Profile } from "@/lib/data";
import { getProfiles, getProfile } from "@/lib/data";
import { ProfileCard } from "@/components/profile-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<Profile | undefined>();

  useEffect(() => {
    // Get profiles from client-side storage to reflect any updates
    const allProfiles = getProfiles();
    setProfiles(allProfiles);

    const loggedInStatus = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
    if (loggedInStatus) {
      // In a real app, you'd get the actual user ID. For demo, we use user 1.
      setLoggedInUser(getProfile(1));
    }
  }, []);

  const displayedProfiles = profiles
    .filter(profile => {
      // Don't show the admin account on the homepage
      if (profile.id === 1) return false;
      
      if (!loggedInUser) {
        // If not logged in, show a mix of profiles
        return true;
      }
      // Don't show the user their own profile on the homepage
      if (profile.id === loggedInUser.id) {
        return false;
      }
      // If logged in, show opposite roles.
      if (profile.role === loggedInUser.role) {
        return false;
      }
      return true;
    })
    .slice(0, 4);

  return (
    <section className="bg-background py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          Featured Profiles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {profiles.length > 0 ? (
            displayedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} loggedInUser={loggedInUser} />
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
