'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check login status from localStorage on component mount
    if (typeof window !== 'undefined') {
      const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(loggedInStatus);
    }
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push('/matches');
    } else {
      router.push('/signup');
    }
  };

  return (
    <section className="relative h-[664px] w-full bg-hero-bg bg-cover bg-center bg-fixed text-white">
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-4 px-4 pb-16 text-center">
        <h1 className="font-headline text-7xl font-bold tracking-tight md:text-9xl">
          Sugar Connect
        </h1>
        <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
          An exclusive platform for ambitious and attractive individuals
        </p>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            onClick={handleButtonClick}
            size="lg"
            variant="secondary"
            className="w-52 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            I'm a Sugar Baby
          </Button>
          <Button
            onClick={handleButtonClick}
            size="lg"
            variant="secondary"
            className="w-52 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            I'm a Sugar Daddy
          </Button>
        </div>
        <Button onClick={handleButtonClick} size="lg" className="w-full max-w-xs text-lg">
          <Heart className="mr-2 h-5 w-5" />
          Find Your Match
        </Button>
      </div>
    </section>
  );
}
