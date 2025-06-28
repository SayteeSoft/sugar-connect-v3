import { ShieldCheck, Lock, LifeBuoy } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Verified Members',
    description:
      'Video verification allows you to know that potential dates look like their photos.',
  },
  {
    icon: Lock,
    title: 'Secure Accounts',
    description:
      'Industry-leading account protection helps keep your profile and information safe.',
  },
  {
    icon: LifeBuoy,
    title: '24/7 Support',
    description:
      'We have a dedicated team of customer service agents to support you.',
  },
];

export function SecurityPrivacy() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          High Level Security & Privacy
        </h2>
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center rounded-lg border p-6"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
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
