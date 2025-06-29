
'use client';

import { useState, useEffect } from "react";
import type { Profile } from "@/lib/data";
import { getProfiles, getProfile } from "@/lib/data";
import { ProfileCard } from "@/components/profile-card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedProfiles() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This logic now runs only on the client, preventing server/client mismatch
    const allProfiles = getProfiles();
    setProfiles(allProfiles);

    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    if (loggedInStatus) {
      // In a real app, you'd get the actual user ID. For demo, we use user 1.
      setLoggedInUser(getProfile(1));
    }
    setIsLoading(false);
  }, []);

  const displayedProfiles = isLoading ? [] : profiles
    .filter(profile => {
      // Don't show the admin account on the homepage
      if (profile.id === 1) return false;
      
      if (loggedInUser) {
        // Don't show the user their own profile on the homepage
        if (profile.id === loggedInUser.id) {
          return false;
        }
        // If logged in, show opposite roles. This now applies to the admin as well.
        if (profile.role === loggedInUser.role) {
          return false;
        }
      }
      // If not logged in, all non-admin profiles are shown (up to the slice limit)
      // If logged in, only profiles that passed the above checks are shown
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, index) => (
                <Skeleton key={index} className="rounded-lg aspect-[4/5] w-full" />
            ))
          ) : (
            displayedProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} loggedInUser={loggedInUser} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
