
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Settings, LogIn, Coins, Heart } from "lucide-react";
import { ThemeSwitcher } from "../theme-switcher";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Profile } from "@/lib/data";
import { getProfile } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<Profile | undefined>();
  const [credits, setCredits] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage on component mount
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
      if (loggedInStatus) {
        // In a real app, you'd get the user ID from the session/token.
        // For this demo, we'll use the static ID for the admin user.
        const userProfile = getProfile(1);
        setProfile(userProfile);
        if (userProfile) {
          if (userProfile.role === 'daddy') {
            setCredits(15);
          } else {
            setCredits(Infinity);
          }
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setProfile(undefined);
    setCredits(0);
    router.push("/login");
  };

  const handleLogin = () => {
    router.push("/login");
  };
  
  const handleProfile = () => {
    router.push("/profile");
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center px-4 md:px-6">
        <div className="flex flex-1 items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <div>
              <span className="font-headline text-lg font-bold text-primary">
                SugarConnect
              </span>
              <p className="text-xs text-muted-foreground whitespace-nowrap hidden md:block">
                An exclusive platform for ambitious and attractive individuals.
              </p>
            </div>
          </Link>
        </div>
        <nav className="hidden items-center justify-center space-x-6 text-lg font-medium md:flex">
          <Link
            href="/profile"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Profile
          </Link>
          <Link
            href="/messages"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Messages
          </Link>
          <Link
            href="/search"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Search
          </Link>
          <Link
            href="/ai-match"
            className="text-foreground/60 transition-colors hover:text-foreground"
          >
            Matches
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          {isLoggedIn && profile && (profile.role === 'daddy' && profile.id !== 1) && (
            <Button asChild size="sm">
              <Link href="/purchase-credits">
                Buy Credits
                <Badge variant="secondary" className="ml-2 rounded-full px-2">{credits}</Badge>
              </Link>
            </Button>
          )}
          {isLoggedIn && profile && (profile.role === 'baby' || profile.id === 1) && (
             <div className="flex items-center gap-2 h-10 px-3 text-sm font-medium">
                <Coins className="h-4 w-4 text-primary" />
                <span className="text-foreground">Unlimited Credits</span>
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={profile?.imageUrl ?? "https://placehold.co/100x100"}
                    data-ai-hint={profile?.hint ?? "person"}
                    alt={profile?.name ?? "@user"}
                  />
                  <AvatarFallback>{profile?.name?.charAt(0).toUpperCase() ?? "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.name ?? 'saytee.software'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        saytee.software@gmail.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={handleProfile}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onSelect={handleLogin}>
                  <LogIn className="mr-2 h-4 w-4" />
                  <span>Log In</span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
