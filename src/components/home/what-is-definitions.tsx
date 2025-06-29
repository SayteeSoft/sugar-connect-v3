import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export function WhatIsDefinitions() {
  return (
    <section className="bg-secondary py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 font-headline text-3xl font-bold text-primary md:text-4xl">
            What is a...
          </h2>
          <Tabs defaultValue="sugar-daddy" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
              <TabsTrigger value="sugar-daddy">Sugar Daddy</TabsTrigger>
              <TabsTrigger value="sugar-baby">Sugar Baby</TabsTrigger>
            </TabsList>
            <TabsContent value="sugar-daddy">
              <Card className="mt-6 text-left">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground">
                    A Sugar Daddy is a successful and generous individual who is willing to provide financial support and mentorship to a partner in exchange for companionship and a mutually beneficial relationship.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sugar-baby">
              <Card className="mt-6 text-left">
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground">
                    A Sugar Baby is an ambitious and attractive person who seeks a mature partner to provide them with a certain lifestyle and support their goals, in return for their company and affection.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
