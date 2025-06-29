
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const sitemapLinks = {
  "Main Pages": [
    { href: "/", title: "Home", description: "The main landing page of SugarConnect." },
    { href: "/search", title: "Search", description: "Find and filter profiles." },
    { href: "/messages", title: "Messages", description: "Your private conversations." },
    { href: "/matches", title: "Matches", description: "View your matches and favorites." },
  ],
  "User Account": [
    { href: "/profile", title: "My Profile", description: "View and edit your profile." },
    { href: "/login", title: "Login", description: "Access your account." },
    { href: "/signup", title: "Sign Up", description: "Create a new account for free." },
    { href: "/purchase-credits", title: "Purchase Credits", description: "Buy credits to connect with others." },
    { href: "/settings", title: "Settings", description: "Manage your account settings." },
  ],
  "Information & Legal": [
    { href: "/about", title: "About Us", description: "Learn more about our mission and community." },
    { href: "/contact", title: "Contact Us", description: "Get in touch with our support team." },
    { href: "/cookie-policy", title: "Cookie Policy", description: "Our policy on cookies." },
    { href: "/sitemap", title: "Sitemap", description: "A map of all pages on the site." },
  ],
   "Admin": [
    { href: "/admin", title: "Admin Dashboard", description: "Manage users and site settings." },
  ],
};

const SitemapSection = ({ title, links }: { title: string, links: { href: string; title: string; description: string }[] }) => (
  <div>
    <h2 className="font-headline text-2xl text-primary mt-6 mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {links.map((link) => (
        <Link href={link.href} key={link.href} passHref>
          <Card className="hover:bg-muted/50 transition-colors h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                {link.title}
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  </div>
);


export default function SitemapPage() {
  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-4xl text-primary">Sitemap</Title>
            <p className="text-muted-foreground pt-2">Navigate through all the pages available on SugarConnect.</p>
          </CardHeader>
          <CardContent>
            {Object.entries(sitemapLinks).map(([sectionTitle, links]) => (
                <SitemapSection key={sectionTitle} title={sectionTitle} links={links} />
            ))}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
