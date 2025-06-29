
'use client';

import Image from "next/image";
import Link from "next/link";
import type { Profile } from "@/lib/data";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MessageSquare, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProfileCardProps {
  profile: Profile;
  onRemove?: (profileId: number) => void;
  loggedInUser?: Profile;
}

export function ProfileCard({ profile, onRemove, loggedInUser }: ProfileCardProps) {
  const router = useRouter();
  const canChat = loggedInUser && loggedInUser.role !== profile.role;

  const handleChat = () => {
    router.push(`/messages?chatWith=${profile.id}`);
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove(profile.id);
    }
  };

  return (
    <Link href={`/profile/${profile.id}`} className="block">
      <Card className="group overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={profile.imageUrl ?? 'https://placehold.co/600x750'}
            alt={`Profile of ${profile.name}`}
            data-ai-hint={profile.hint}
            width={600}
            height={750}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 border-none text-white"
                    onClick={(e) => e.preventDefault()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {canChat && (
                  <DropdownMenuItem onSelect={handleChat}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Chat</span>
                  </DropdownMenuItem>
                )}
                {onRemove && (
                  <DropdownMenuItem onSelect={handleRemove} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Remove</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

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
    </Link>
  );
}
