
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Header } from "@/components/layout/header";
import { useAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/profile');
    }
  }, [isLoggedIn, router]);

  if (isLoading || isLoggedIn) {
    return (
       <>
         <Header />
         <main className="flex-grow container mx-auto p-4 md:p-6 flex flex-col justify-center items-center gap-4">
           <Loader2 className="h-8 w-8 animate-spin text-primary" />
           <p className="text-muted-foreground">Loading...</p>
         </main>
       </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 relative bg-hero-bg bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50" />
        <Card className="w-full max-w-md mx-auto z-10">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl">100% Free Signup</CardTitle>
            <CardDescription>Join our exclusive community today.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup defaultValue="sugar-baby" className="flex space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sugar-baby" id="r1" />
                    <Label htmlFor="r1">Sugar Baby</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sugar-daddy" id="r2" />
                    <Label htmlFor="r2">Sugar Daddy</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline hover:text-primary/90 transition-colors">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
