'use server';

/**
 * @fileOverview AI-powered matching system flow.
 *
 * - aiMatch - A function that suggests potential matches based on user profile data.
 * - AiMatchInput - The input type for the aiMatch function.
 * - AiMatchOutput - The return type for the aiMatch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiMatchInputSchema = z.object({
  profileDescription: z
    .string()
    .describe('A detailed description of the user profile, including interests, preferences, and what they are looking for in a match.'),
  preferences: z
    .string()
    .describe('Specific preferences for a match, such as age range, location, and desired relationship type.'),
});
export type AiMatchInput = z.infer<typeof AiMatchInputSchema>;

const AiMatchOutputSchema = z.object({
  suggestedMatches: z
    .array(z.string())
    .describe('A list of suggested matches based on the profile description and preferences.'),
  reasoning: z
    .string()
    .describe('Explanation of why these matches are suggested.'),
});
export type AiMatchOutput = z.infer<typeof AiMatchOutputSchema>;

export async function aiMatch(input: AiMatchInput): Promise<AiMatchOutput> {
  return aiMatchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiMatchPrompt',
  input: {schema: AiMatchInputSchema},
  output: {schema: AiMatchOutputSchema},
  prompt: `You are an AI dating assistant that suggests potential matches based on user profile information and preferences.

  Profile Description: {{{profileDescription}}}
  Preferences: {{{preferences}}}

  Based on this information, suggest a list of potential matches and explain why you think they would be a good fit.
  Format the output as a JSON object:
  {
    "suggestedMatches": ["Profile 1", "Profile 2", "Profile 3"],
    "reasoning": "Explanation of why these matches are suggested."
  }
  `,
});

const aiMatchFlow = ai.defineFlow(
  {
    name: 'aiMatchFlow',
    inputSchema: AiMatchInputSchema,
    outputSchema: AiMatchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
