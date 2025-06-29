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

export function PrivacyPolicyModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl text-primary">Privacy Policy</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
            <div className="px-6 py-4">
                <SectionTitle>1. Introduction</SectionTitle>
                <Paragraph>
                  This Privacy Policy outlines how we collect, use, disclose, and protect your personal information when you use our services. We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner.
                </Paragraph>

                <SectionTitle>2. Information We Collect</SectionTitle>
                <Paragraph>
                  We may collect the following types of information: Personal Identification Information (Name, email address, phone number, etc.), Profile Information (age, photos, interests, bio), and Usage Data (how you use our service, IP address, browser type).
                </Paragraph>

                <SectionTitle>3. How We Use Your Information</SectionTitle>
                <Paragraph>
                  Your information is used to provide and improve our services, personalize your experience, communicate with you, ensure the security of our platform, and comply with legal obligations.
                </Paragraph>

                <SectionTitle>4. Information Sharing</SectionTitle>
                <Paragraph>
                  We do not sell your personal information. We may share information with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law.
                </Paragraph>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
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
