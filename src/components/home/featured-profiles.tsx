import { featuredProfiles } from "@/lib/data";
import { ProfileCard } from "@/components/profile-card";

export function FeaturedProfiles() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          Featured Profiles
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featuredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </section>
  );
}
