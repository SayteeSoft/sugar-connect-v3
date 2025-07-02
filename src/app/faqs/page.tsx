
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
import siteContent from '@/lib/site-content.json';

const faqItems = siteContent.faqs;

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
