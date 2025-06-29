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

export function TermsOfUseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="font-headline text-2xl text-primary">Terms of Use</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full">
            <div className="px-6 py-4">
                <SectionTitle>1. Acceptance of Terms</SectionTitle>
                <Paragraph>
                    By accessing and using our service, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                </Paragraph>

                <SectionTitle>2. User Conduct</SectionTitle>
                <Paragraph>
                    You agree not to use the service to post or transmit any material that is abusive, harassing, defamatory, vulgar, obscene, or is otherwise objectionable. You are responsible for all activities that occur under your account.
                </Paragraph>

                <SectionTitle>3. Intellectual Property</SectionTitle>
                <Paragraph>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Sugar Connect and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Sugar Connect.
                </Paragraph>

                <SectionTitle>4. Termination</SectionTitle>
                <Paragraph>
                    We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not to a breach of the Terms.
                </Paragraph>
                <Paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
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
