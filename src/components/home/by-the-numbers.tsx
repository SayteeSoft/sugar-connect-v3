import { CakeSlice, Users, HeartHandshake } from 'lucide-react';

const stats = [
  {
    icon: CakeSlice,
    line1: 'Average Sugar Baby',
    line2: 'Age: 23',
  },
  {
    icon: Users,
    line1: '6x More Sugar Babies',
    line2: 'than Sugar Daddies',
  },
  {
    icon: HeartHandshake,
    line1: 'Average Time to Find a Match:',
    line2: '4 Days',
  },
];

export function ByTheNumbers() {
  return (
    <section className="bg-secondary py-12 md:pt-0 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          By The Numbers
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
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
