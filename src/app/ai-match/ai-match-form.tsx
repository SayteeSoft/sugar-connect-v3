'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { aiMatch, type AiMatchOutput } from '@/ai/flows/ai-match';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  profileDescription: z.string().min(50, {
    message: 'Profile description must be at least 50 characters.',
  }),
  preferences: z.string().min(10, {
    message: 'Preferences must be at least 10 characters.',
  }),
});

export function AIMatchForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AiMatchOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileDescription: '',
      preferences: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await aiMatch(values);
      setResult(response);
    } catch (e) {
      setError('An error occurred while fetching matches. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="profileDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Profile Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe yourself, your interests, lifestyle, and what makes you unique..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Be detailed to get the best matches.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are you looking for?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., age range 20-30, non-smoker, loves travel"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Specify your preferences for a potential match.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Find My AI Matches
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {loading && (
        <div className="mt-8 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
          <p className="mt-2 text-muted-foreground">
            Our AI is finding your matches...
          </p>
        </div>
      )}

      {error && <p className="mt-8 text-center text-destructive">{error}</p>}

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Sparkles className="text-primary" />
              Your AI Match Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Suggested Matches:</h3>
              <ul className="list-disc list-inside space-y-1 rounded-md border p-4 bg-secondary/50">
                {result.suggestedMatches.map((match, index) => (
                  <li key={index}>{match}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Reasoning:</h3>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
