'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Sugar Connect changed my life. I've met incredible people and experienced things I only dreamed of. It's more than just a site; it's a lifestyle.",
    name: "Emily",
    role: "Sugar Baby",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman portrait"
  },
  {
    quote: "As a busy professional, I value my time. Sugar Connect is efficient, discreet, and full of genuine, ambitious individuals. Highly recommended.",
    name: "David",
    role: "Sugar Daddy",
    avatar: "https://placehold.co/100x100.png",
    hint: "man portrait"
  },
  {
    quote: "I was looking for mentorship and a different kind of relationship. I found a wonderful partner here who supports my goals and dreams. So grateful!",
    name: "Sophia",
    role: "Sugar Baby",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman face"
  },
  {
    quote: "The quality of profiles on this site is unmatched. I've made meaningful connections that have enriched my life in every aspect.",
    name: "Michael",
    role: "Sugar Daddy",
    avatar: "https://placehold.co/100x100.png",
    hint: "man profile"
  },
  {
    quote: "Finding someone who understands my ambition and lifestyle was easy with Sugar Connect. It's a game-changer for successful dating.",
    name: "Isabella",
    role: "Sugar Baby",
    avatar: "https://placehold.co/100x100.png",
    hint: "woman smile"
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-12 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          What Our Members Say
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-sm sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="flex flex-col h-full">
                    <CardContent className="flex flex-col p-6 flex-grow">
                      <div className="flex gap-0.5 mb-2">
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <Star className="w-5 h-5 text-primary fill-primary" />
                          <Star className="w-5 h-5 text-primary fill-primary" />
                      </div>
                      <p className="text-muted-foreground italic mb-4 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center mt-auto">
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.hint} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
