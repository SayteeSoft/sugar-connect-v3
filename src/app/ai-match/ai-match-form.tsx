'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfiles } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Eye, Footprints } from 'lucide-react';

const ProfilesGrid = ({ profiles }: { profiles: Profile[] }) => {
  if (profiles.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        No profiles to display.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};

export function MatchesTabs() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    // In a real app, this data would be fetched based on the logged-in user
    // For this demo, we'll use the static data
    setProfiles(getProfiles());
  }, []);

  // Mock data for each tab
  const favorites = profiles.slice(0, 4);
  const visitors = profiles.slice(4, 8);
  const viewed = profiles.slice(8, 12);

  return (
    <Tabs defaultValue="favorites" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="favorites">
          <Heart className="mr-2 h-4 w-4" />
          Favorites
        </TabsTrigger>
        <TabsTrigger value="visitors">
          <Footprints className="mr-2 h-4 w-4" />
          Visitors
        </TabsTrigger>
        <TabsTrigger value="viewed">
          <Eye className="mr-2 h-4 w-4" />
          Viewed
        </TabsTrigger>
      </TabsList>
      <TabsContent value="favorites" className="mt-6">
        <ProfilesGrid profiles={favorites} />
      </TabsContent>
      <TabsContent value="visitors" className="mt-6">
        <ProfilesGrid profiles={visitors} />
      </TabsContent>
      <TabsContent value="viewed" className="mt-6">
        <ProfilesGrid profiles={viewed} />
      </TabsContent>
    </Tabs>
  );
}
