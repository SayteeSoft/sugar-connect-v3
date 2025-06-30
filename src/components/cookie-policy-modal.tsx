'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-headline text-2xl font-semibold text-foreground mt-6 mb-2">{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <p className="text-muted-foreground mb-4">{children}</p>
);

export function CookiePolicyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Cookie Policy</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl text-primary">Cookie Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
            <div className="px-6 py-4">
                <SectionTitle>1. Introduction</SectionTitle>
                <Paragraph>
                  This Cookie Policy explains how SD Connect ("we", "us", and "our") uses cookies and similar
                  technologies to recognize you when you visit our website. It explains what these technologies are,
                  why we use them to provide a secure and personalized experience, and outlines your rights to control our use of them.
                </Paragraph>

                <SectionTitle>2. What are cookies?</SectionTitle>
                <Paragraph>
                  A cookie is a small data file that is placed on your device when you visit a website. Cookies are
                  widely used by website owners in order to make their websites work, or to work more efficiently, as
                  well as to provide reporting information. Cookies set by the website owner (in this case, SD
                  Connect) are called "first-party cookies". Cookies set by parties other than the website owner are
                  called "third-party cookies".
                </Paragraph>

                <SectionTitle>3. Why do we use cookies?</SectionTitle>
                <Paragraph>
                  We use first-party and third-party cookies for several reasons. Some cookies are required for
                  technical reasons in order for our website to operate, and we refer to these as "essential" or
                  "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our
                  users to enhance the experience on our platform. For example, we use cookies to remember your login
                  status and preferences.
                </Paragraph>

                <SectionTitle>4. Types of Cookies We Use</SectionTitle>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">Strictly Necessary Cookies:</strong> These are essential for you to browse the website and
                    use its features, such as accessing secure areas of the site.
                  </li>
                  <li>
                    <strong className="text-foreground">Performance and Analytics Cookies:</strong> These cookies collect information about how you
                    use our website, like which pages you visited and which links you clicked on. None of this
                    information can be used to identify you. It is all aggregated and, therefore, anonymized. Their
                    sole purpose is to improve website functions.
                  </li>
                  <li>
                    <strong className="text-foreground">Functionality Cookies:</strong> These cookies allow our website to remember choices you have
                    made in the past, like what language you prefer or what your user name and password are so you can
                    automatically log in.
                  </li>
                  <li>
                    <strong className="text-foreground">Marketing Cookies:</strong> These cookies track your online activity to help advertisers
                    deliver more relevant advertising or to limit how many times you see an ad. These cookies can share
                    that information with other organizations or advertisers.
                  </li>
                </ul>
                
                <SectionTitle>5. How can you control cookies?</SectionTitle>
                <Paragraph>
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                  rights by setting your preferences in your browser. Most browsers allow you to refuse to accept
                  cookies and to delete cookies. The methods for doing so vary from browser to browser, and from
                  version to version. Please note, however, that if you disable cookies, you may not be able to use
                  all the features of our website.
                </Paragraph>

                <SectionTitle>6. Changes to This Cookie Policy</SectionTitle>
                <Paragraph>
                  We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                  cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit
                  this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </Paragraph>

                <SectionTitle>7. Contact Us</SectionTitle>
                <Paragraph>
                  If you have any questions about our use of cookies or other technologies, please email us using the
                  contact form on our website.
                </Paragraph>
            </div>
        </ScrollArea>
        <DialogFooter className="p-6 pt-4 border-t">
            <DialogClose asChild>
                <Button>Accept and Close</Button>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
