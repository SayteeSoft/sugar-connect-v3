import Image from "next/image";
import type { Profile } from "@/lib/data";
import { Card } from "@/components/ui/card";

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
      <div className="relative aspect-[2/3] w-full">
        <Image
          src={profile.imageUrl}
          alt={`Profile of ${profile.name}`}
          data-ai-hint={profile.hint}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="flex items-center gap-2">
            <h3 className="font-headline text-xl font-bold">
              {profile.name}, {profile.age}
            </h3>
            {profile.online && (
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
            )}
          </div>
          <p className="text-sm text-gray-300">{profile.location}</p>
        </div>
      </div>
    </Card>
  );
}
