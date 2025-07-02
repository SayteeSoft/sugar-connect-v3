
'use client';

import { CakeSlice, Users, HeartHandshake } from 'lucide-react';
import siteContent from '@/lib/site-content.json';

const iconMap: { [key: string]: React.ElementType } = {
  CakeSlice,
  Users,
  HeartHandshake,
};

const { title, stats } = siteContent.byTheNumbers;

export function ByTheNumbers() {
  return (
    <section className="bg-secondary py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          {title}
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.icon];
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {Icon && <Icon className="h-8 w-8" />}
                </div>
                <div className="flex h-14 flex-col justify-center">
                  <p className="text-lg font-semibold">{stat.line1}</p>
                  {stat.line2 && <p className="text-lg font-semibold text-muted-foreground">{stat.line2}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
