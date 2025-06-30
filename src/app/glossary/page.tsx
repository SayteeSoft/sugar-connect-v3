
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

const glossaryTerms = [
  {
    term: "Allowance",
    definition: "A regular sum of money paid by a Sugar Daddy to a Sugar Baby as part of their arrangement. It can be provided weekly or monthly to cover expenses like tuition, rent, or other lifestyle costs."
  },
  {
    term: "Arrangement",
    definition: "The negotiated agreement between a Sugar Daddy and a Sugar Baby, outlining the expectations, boundaries, and terms of their relationship, including financial support and companionship."
  },
  {
    term: "Discreet",
    definition: "A term used to describe a relationship or arrangement that is kept private and confidential, away from public view or the knowledge of others."
  },
  {
    term: "Freestyle",
    definition: "The practice of seeking a sugar arrangement offline, in person, at places like upscale bars, restaurants, or social events, rather than using a dedicated website or app."
  },
  {
    term: "Generous",
    definition: "A key attribute of a Sugar Daddy, referring to their willingness to provide financial support, gifts, and experiences to their Sugar Baby."
  },
  {
    term: "Long-Term Arrangement (LTA)",
    definition: "A sugar relationship that is intended to last for an extended period, often evolving into a deeper, more committed partnership."
  },
  {
    term: "Meet & Greet (M&G)",
    definition: "The first, often casual, meeting between a potential Sugar Daddy and Sugar Baby. It's a chance to see if there is chemistry and to discuss the terms of a potential arrangement. It's typically unpaid."
  },
  {
    term: "Mutually Beneficial Relationship",
    definition: "The core principle of sugar dating, where both parties get something they desire from the relationship. The Sugar Baby receives financial support and mentorship, and the Sugar Daddy receives companionship and affection."
  },
  {
    term: "No Strings Attached (NSA)",
    definition: "An arrangement that is purely physical and transactional, with no expectation of emotional connection or commitment beyond the agreed-upon terms."
  },
  {
    term: "PPM (Pay Per Meet)",
    definition: "A type of arrangement where the Sugar Daddy provides an agreed-upon amount of money or a gift at each meeting, as opposed to a regular allowance."
  },
  {
    term: "Sugar Baby (SB)",
    definition: "An ambitious and attractive individual who seeks financial support, mentorship, and an upgraded lifestyle from a Sugar Daddy in exchange for their companionship."
  },
  {
    term: "Sugar Daddy (SD)",
    definition: "A successful, established, and generous individual who provides financial support and mentorship to a Sugar Baby in return for companionship and a relationship on mutually agreed terms."
  },
  {
    term: "Splenda Daddy",
    definition: "A slang term for a man who wants to be a Sugar Daddy but lacks the financial means to be truly generous, often offering a lower allowance than is typical."
  },
  {
    term: "Vanilla",
    definition: "A term used to describe a conventional relationship or dating that does not involve a sugar arrangement or any other non-traditional dynamics."
  }
];


export default function GlossaryPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTerms = glossaryTerms.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-4xl text-primary">Glossary of Terms</CardTitle>
            <CardDescription>
              Your guide to the language of sugar dating.
            </CardDescription>
          </CardHeader>
          <CardContent className="max-w-3xl mx-auto">
            <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search terms..." 
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {filteredTerms.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {item.term}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.definition}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
             {filteredTerms.length === 0 && (
                <p className="text-center text-muted-foreground mt-8">No terms found matching your search.</p>
            )}
          </CardContent>
        </Card>
      </main>
    </>
  );
}
