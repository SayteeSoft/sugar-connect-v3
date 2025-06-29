
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useState, useEffect, useMemo, Suspense } from 'react';

const creditPackages = [
  { id: 'pkg-1', credits: 100, price: 20 },
  { id: 'pkg-2', credits: 500, price: 80 },
  { id: 'pkg-3', credits: 1000, price: 150 },
];

function PayPalPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(true);

  const packageId = searchParams.get('packageId');
  const selectedPackage = useMemo(() => creditPackages.find(p => p.id === packageId), [packageId]);

  useEffect(() => {
      if(selectedPackage) {
        const timer = setTimeout(() => {
            setIsProcessing(false);
            toast({
                title: 'Purchase Successful!',
                description: `You have successfully purchased ${selectedPackage.credits} credits via PayPal.`,
            });
            router.push('/profile');
        }, 3000); // Simulate redirect and payment confirmation

        return () => clearTimeout(timer);
      }
  }, [selectedPackage, router, toast]);

  if (!selectedPackage) {
      return (
          <>
            <Header />
            <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Invalid Package</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">The selected credit package is invalid. Please go back and select a package.</p>
                        <Button onClick={() => router.push('/purchase-credits')} className="mt-4">Back to Packages</Button>
                    </CardContent>
                </Card>
            </main>
          </>
      )
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <p className="font-bold text-5xl text-[#f5a3f5] mx-auto"><i>PayPal</i></p>
            <CardTitle className="font-headline text-2xl pt-4">Redirecting to PayPal</CardTitle>
            <CardDescription>
              You are purchasing {selectedPackage.credits} credits for £{selectedPackage.price}.00
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Please wait while we securely redirect you to PayPal to complete your payment.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

const PageLoader = () => (
    <>
        <Header />
        <main className="flex-grow container mx-auto p-4 md:p-6 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
    </>
);

export default function PayPalPaymentPage() {
    return (
        <Suspense fallback={<PageLoader />}>
            <PayPalPaymentContent />
        </Suspense>
    )
}
