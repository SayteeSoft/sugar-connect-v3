
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import siteContent from '@/lib/site-content.json';

const { title, tabs } = siteContent.whatIsDefinitions;

export function WhatIsDefinitions() {
  return (
    <section className="bg-secondary py-12 md:pt-12 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 font-headline text-3xl font-bold text-primary md:text-4xl">
            {title}
          </h2>
          <Tabs defaultValue={tabs[0].value} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
              {tabs.map(tab => (
                 <TabsTrigger key={tab.value} value={tab.value}>{tab.trigger}</TabsTrigger>
              ))}
            </TabsList>
            {tabs.map(tab => (
              <TabsContent key={tab.value} value={tab.value}>
                <Card className="mt-6 text-left">
                  <CardContent className="p-6">
                    <p className="text-lg text-muted-foreground">
                      {tab.content}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
