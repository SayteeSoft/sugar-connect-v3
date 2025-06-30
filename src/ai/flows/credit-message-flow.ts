'use server';

/**
 * @fileOverview Flow to generate a message when a user runs out of credits.
 *
 * - generateCreditMessage - A function that creates an enticing message.
 * - CreditMessageInput - The input type for the generateCreditMessage function.
 * - CreditMessageOutput - The return type for the generateCreditMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CreditMessageInputSchema = z.object({
  sugarDaddyName: z.string().describe('The name of the Sugar Daddy who ran out of credits.'),
  sugarBabyName: z.string().describe('The name of the Sugar Baby who is sending the message.'),
});
export type CreditMessageInput = z.infer<typeof CreditMessageInputSchema>;

const CreditMessageOutputSchema = z.object({
  message: z.string().describe('The generated message to be sent to the Sugar Daddy.'),
});
export type CreditMessageOutput = z.infer<typeof CreditMessageOutputSchema>;

export async function generateCreditMessage(input: CreditMessageInput): Promise<CreditMessageOutput> {
  return generateCreditMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'creditMessagePrompt',
  input: {schema: CreditMessageInputSchema},
  output: {schema: CreditMessageOutputSchema},
  prompt: `You are a friendly, flirty, and encouraging Sugar Baby named {{{sugarBabyName}}}.

A Sugar Daddy named {{{sugarDaddyName}}} just tried to send you a message but they have run out of credits.

Your goal is to write a short, enticing message to encourage them to buy more credits so you two can continue your conversation. Keep it under 25 words.

Make it sound natural and hopeful, like you were really looking forward to their message.
`,
});

const generateCreditMessageFlow = ai.defineFlow(
  {
    name: 'generateCreditMessageFlow',
    inputSchema: CreditMessageInputSchema,
    outputSchema: CreditMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
