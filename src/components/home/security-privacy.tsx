
'use client';

import { ShieldCheck, Lock, LifeBuoy } from 'lucide-react';
import siteContent from '@/lib/site-content.json';

const iconMap: { [key: string]: React.ElementType } = {
  ShieldCheck,
  Lock,
  LifeBuoy,
};

const { title, features } = siteContent.securityAndPrivacy;

export function SecurityPrivacy() {
  return (
    <section className="bg-background py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg border p-6"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <h3 className="mb-2 text-xl font-bold font-headline">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
