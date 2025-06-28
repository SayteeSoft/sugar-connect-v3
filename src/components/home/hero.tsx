import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[70vh] w-full text-white">
      <Image
        src="https://placehold.co/1920x1080"
        alt="A stylish couple in an urban setting"
        data-ai-hint="couple city"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-6 px-4 text-center">
        <h1 className="font-logo text-7xl font-normal tracking-tight md:text-9xl">
          Sugar Connect
        </h1>
        <p className="max-w-2xl text-lg text-gray-200 md:text-xl">
          An exclusive platform for ambitious and attractive individuals
        </p>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button asChild size="lg" variant="secondary" className="w-52">
            <Link href="/signup">I'm a Sugar Baby</Link>
          </Button>
          <Button asChild size="lg" variant="secondary" className="w-52">
            <Link href="/signup">I'm a Sugar Daddy</Link>
          </Button>
        </div>
        <Button asChild size="lg" className="w-full max-w-xs text-lg">
          <Link href="/signup">
            <Heart className="mr-2 h-5 w-5" />
            Find Your Match
          </Link>
        </Button>
      </div>
    </section>
  );
}
