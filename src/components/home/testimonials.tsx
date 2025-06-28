import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "SugarConnect changed my life. I've met incredible people and experienced things I only dreamed of. It's more than just a site; it's a lifestyle.",
    name: "Emily",
    role: "Sugar Baby",
    avatar: "https://placehold.co/100x100",
    hint: "woman portrait"
  },
  {
    quote: "As a busy professional, I value my time. SugarConnect is efficient, discreet, and full of genuine, ambitious individuals. Highly recommended.",
    name: "David",
    role: "Sugar Daddy",
    avatar: "https://placehold.co/100x100",
    hint: "man portrait"
  },
  {
    quote: "I was looking for mentorship and a different kind of relationship. I found a wonderful partner here who supports my goals and dreams. So grateful!",
    name: "Sophia",
    role: "Sugar Baby",
    avatar: "https://placehold.co/100x100",
    hint: "woman face"
  },
];

export function Testimonials() {
  return (
    <section className="bg-secondary py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="mb-8 text-center font-headline text-3xl font-bold text-primary md:text-4xl">
          What Our Members Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex flex-col p-6 flex-grow">
                <div className="flex gap-0.5 mb-2">
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <Star className="w-5 h-5 text-primary fill-primary" />
                    <Star className="w-5 h-5 text-primary fill-primary" />
                </div>
                <p className="text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
