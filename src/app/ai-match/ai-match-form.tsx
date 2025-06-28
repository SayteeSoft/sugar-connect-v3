'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/data';
import { getProfiles } from '@/lib/data';
import { ProfileCard } from '@/components/profile-card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Eye, Footprints } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";


const ProfilesGrid = ({ profiles, onRemove }: { profiles: Profile[]; onRemove: (profileId: number) => void; }) => {
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
        <ProfileCard key={profile.id} profile={profile} onRemove={onRemove} />
      ))}
    </div>
  );
};

export function MatchesTabs() {
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Profile[]>([]);
  const [visitors, setVisitors] = useState<Profile[]>([]);
  const [viewed, setViewed] = useState<Profile[]>([]);

  useEffect(() => {
    // In a real app, this data would be fetched based on the logged-in user
    // For this demo, we'll use the static data
    const allProfiles = getProfiles();
    setFavorites(allProfiles.slice(0, 4));
    setVisitors(allProfiles.slice(4, 8));
    setViewed(allProfiles.slice(8, 12));
  }, []);
  
  const handleRemove = (profileId: number, listType: 'favorites' | 'visitors' | 'viewed') => {
    let profileName = '';
    
    if (listType === 'favorites') {
      profileName = favorites.find(p => p.id === profileId)?.name || 'Profile';
      setFavorites(prev => prev.filter(p => p.id !== profileId));
    } else if (listType === 'visitors') {
      profileName = visitors.find(p => p.id === profileId)?.name || 'Profile';
      setVisitors(prev => prev.filter(p => p.id !== profileId));
    } else if (listType === 'viewed') {
      profileName = viewed.find(p => p.id === profileId)?.name || 'Profile';
      setViewed(prev => prev.filter(p => p.id !== profileId));
    }

    toast({
      title: "Profile Removed",
      description: `${profileName} has been removed from your ${listType} list.`,
    });
  };

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
        <ProfilesGrid profiles={favorites} onRemove={(id) => handleRemove(id, 'favorites')} />
      </TabsContent>
      <TabsContent value="visitors" className="mt-6">
        <ProfilesGrid profiles={visitors} onRemove={(id) => handleRemove(id, 'visitors')} />
      </TabsContent>
      <TabsContent value="viewed" className="mt-6">
        <ProfilesGrid profiles={viewed} onRemove={(id) => handleRemove(id, 'viewed')} />
      </TabsContent>
    </Tabs>
  );
}
