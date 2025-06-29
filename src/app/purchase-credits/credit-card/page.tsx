
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CreditCard } from 'lucide-react';
import { useState, useMemo, Suspense } from 'react';

const creditPackages = [
  { id: 'pkg-1', credits: 100, price: 20 },
  { id: 'pkg-2', credits: 500, price: 80 },
  { id: 'pkg-3', credits: 1000, price: 150 },
];

const paymentFormSchema = z.object({
  cardName: z.string().min(2, { message: "Name on card is required." }),
  cardNumber: z.string().refine((val) => /^\d{16}$/.test(val.replace(/\s/g, '')), { message: "Invalid card number. Must be 16 digits." }),
  expiryDate: z.string().refine((val) => /^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(val), { message: "Invalid format. Use MM / YY." }),
  cvv: z.string().refine((val) => /^\d{3,4}$/.test(val), { message: "Invalid CVV." }),
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

function CreditCardPaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const packageId = searchParams.get('packageId');
  const selectedPackage = useMemo(() => creditPackages.find(p => p.id === packageId), [packageId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
  });

  const onSubmit = async (data: PaymentFormValues) => {
    setIsSubmitting(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);

    toast({
      title: 'Purchase Successful!',
      description: `You have successfully purchased ${selectedPackage?.credits} credits.`,
    });
    
    // In a real app, you would update user credits here.
    
    router.push('/profile');
  };

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
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CreditCard className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle className="font-headline text-2xl">Credit/Debit Card Payment</CardTitle>
            <CardDescription>
              You are purchasing {selectedPackage.credits} credits for £{selectedPackage.price}.00
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input id="cardName" {...register('cardName')} />
                {errors.cardName && <p className="text-sm text-destructive">{errors.cardName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" {...register('cardNumber')} placeholder="0000 0000 0000 0000" />
                {errors.cardNumber && <p className="text-sm text-destructive">{errors.cardNumber.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input id="expiryDate" {...register('expiryDate')} placeholder="MM / YY" />
                  {errors.expiryDate && <p className="text-sm text-destructive">{errors.expiryDate.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" {...register('cvv')} placeholder="123" />
                  {errors.cvv && <p className="text-sm text-destructive">{errors.cvv.message}</p>}
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Pay £{selectedPackage.price}.00
              </Button>
            </form>
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

export default function CreditCardPaymentPage() {
    return (
        <Suspense fallback={<PageLoader />}>
            <CreditCardPaymentContent />
        </Suspense>
    )
}
