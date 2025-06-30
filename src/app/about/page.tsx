
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutUsPage() {
  const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-headline text-2xl font-semibold text-foreground mt-8 mb-4">{children}</h2>
  );

  const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground mb-4 leading-relaxed">{children}</p>
  );

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">
              Welcome to SD Connect
            </CardTitle>
            <p className="text-xl text-muted-foreground mt-2">
              Where Ambitious Hearts and Discerning Tastes Meet
            </p>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto">
            <Paragraph>
              At SD Connect, we believe that relationships should be empowering, transparent, and tailored to the modern world. We have created an exclusive platform where successful, established individuals and ambitious, attractive people can connect on their own terms. Our community is built on a foundation of respect, honesty, and the shared desire for a relationship that enhances, rather than complicates, life.
            </Paragraph>

            <SectionTitle>Our Mission</SectionTitle>
            <Paragraph>
              Our mission is to redefine the landscape of modern dating by providing a high-quality, secure, and intuitive platform for creating mutually beneficial relationships. We strive to eliminate the ambiguity of conventional dating, allowing our members to be upfront about their desires and expectations from the very beginning. We are dedicated to fostering a community where every connection is a meaningful one.
            </Paragraph>

            <SectionTitle>Why Choose SD Connect?</SectionTitle>
            
            <h3 className="font-semibold text-lg mt-4 mb-2">Exclusivity & Quality</h3>
            <Paragraph>
              We curate our community to ensure a high caliber of members. Every profile is reviewed to maintain a network of genuine, successful, and ambitious individuals who are serious about finding a quality connection.
            </Paragraph>

            <h3 className="font-semibold text-lg mt-4 mb-2">Privacy & Discretion</h3>
            <Paragraph>
              Your privacy is our utmost priority. We employ industry-leading security measures and provide tools that give you full control over your profile's visibility, ensuring your experience is both safe and discreet.
            </Paragraph>

            <h3 className="font-semibold text-lg mt-4 mb-2">Meaningful Connections</h3>
            <Paragraph>
              We move beyond the superficial. SD Connect is for those who seek more than just a date; it's for individuals looking for mentorship, companionship, and a partnership that enriches their lives. Our platform encourages clear communication about expectations, leading to more honest and fulfilling relationships.
            </Paragraph>
            
            <h3 className="font-semibold text-lg mt-4 mb-2">A Modern Approach</h3>
            <Paragraph>
              The world of dating has evolved, and so have we. We provide a sophisticated, streamlined experience that respects your time and aspirations. With advanced search filters and a user-friendly interface, finding your ideal match has never been more efficient.
            </Paragraph>
            
            <div className="text-center mt-10 border-t pt-8">
                <h3 className="font-headline text-3xl text-primary">Join Our Community Today</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                    Discover a new standard of dating. Find a partner who understands your ambition and complements your lifestyle.
                </p>
                <Button asChild size="lg">
                    <Link href="/signup">
                        <Heart className="mr-2 h-5 w-5" />
                        Find Your Match
                    </Link>
                </Button>
            </div>

          </CardContent>
        </Card>
      </main>
    </>
  );
}
