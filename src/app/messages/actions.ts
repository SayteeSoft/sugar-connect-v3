
'use server';

import { generateCreditMessage, type CreditMessageInput, type CreditMessageOutput } from "@/ai/flows/credit-message-flow";

/**
 * Server action to trigger the AI credit message generation flow.
 * This keeps the Genkit-related dependencies on the server.
 */
export async function triggerCreditMessage(input: CreditMessageInput): Promise<CreditMessageOutput> {
  try {
    const response = await generateCreditMessage(input);
    return response;
  } catch (error) {
    console.error("Error triggering credit message flow:", error);
    // In a real app, you'd want more robust error handling/logging
    // For now, we'll return a generic error message to prevent crashing.
    return { message: "Sorry, I was about to say something but got distracted. Why not buy some more credits so we can chat properly? ;)" };
  }
}
