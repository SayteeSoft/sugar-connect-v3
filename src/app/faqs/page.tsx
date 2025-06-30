
'use client';

import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const faqItems = [
  {
    question: "What is SD Connect?",
    answer: "SD Connect is a premier online platform designed to connect successful, established individuals (Sugar Daddies and Mommies) with ambitious, attractive people (Sugar Babies) for transparent and mutually beneficial relationships."
  },
  {
    question: "Is my privacy protected on SD Connect?",
    answer: "Absolutely. We prioritize your privacy and discretion above all else. We use advanced security measures and give you full control over your profile's visibility, including options to hide photos or your profile from public view."
  },
  {
    question: "How do I create a successful profile?",
    answer: "A great profile is honest, detailed, and features high-quality, recent photos. Be clear about who you are and what you're looking for in an arrangement. This transparency attracts the right kind of partners and sets the foundation for a successful relationship."
  },
  {
    question: "What is a 'mutually beneficial relationship'?",
    answer: "It's a relationship where both partners are upfront about their needs and expectations. Typically, a Sugar Daddy provides financial support, mentorship, and a lifestyle upgrade, while a Sugar Baby offers companionship, affection, and enriches the Sugar Daddy's life."
  },
  {
    question: "How does messaging work on the site?",
    answer: "Sugar Daddies typically purchase credits to initiate conversations with Sugar Babies. Sugar Babies can often reply to messages for free. This system helps ensure that connections are initiated by members who are serious about pursuing an arrangement."
  },
  {
    question: "What is the difference between 'allowance' and 'Pay Per Meet' (PPM)?",
    answer: "An allowance is a fixed amount of financial support provided on a regular basis (e.g., weekly or monthly). PPM means support is provided at each meeting. The choice between them is a key part of the arrangement discussion and depends on the preferences of both individuals."
  },
  {
    question: "Are there safety features on the platform?",
    answer: "Yes. We offer profile verification to confirm members' identities and have a dedicated support team to address any concerns. We strongly encourage all members to practice caution, have initial meetings in public places, and never share sensitive personal information like bank details."
  },
  {
    question: "Can I use the site for free?",
    answer: "Creating a profile is free for all members. Sugar Babies can generally use the site with a free membership. Sugar Daddies usually need to upgrade to a premium membership or purchase credits to send messages and unlock full access."
  }
];

export default function FaqsPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqItems.filter(item =>
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Frequently Asked Questions</CardTitle>
            <CardDescription>
              Find answers to common questions about SD Connect and sugar dating.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto">
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search questions..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">No questions found matching your search.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
