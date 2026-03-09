'use server';
/**
 * @fileOverview An AI agent that provides personalized style recommendations and product pairings.
 *
 * - aiStyleRecommendation - A function that generates style recommendations.
 * - AIStyleRecommendationInput - The input type for the aiStyleRecommendation function.
 * - AIStyleRecommendationOutput - The return type for the aiStyleRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIStyleRecommendationInputSchema = z.object({
  browsingHistory: z
    .array(z.string())
    .describe('A list of descriptions or names of products the user has previously viewed.'),
  currentItemDetails: z
    .string()
    .describe('Detailed information about the current product the user is viewing.'),
});
export type AIStyleRecommendationInput = z.infer<
  typeof AIStyleRecommendationInputSchema
>;

const AIStyleRecommendationOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      productName: z.string().describe('The name of the recommended product.'),
      description: z
        .string()
        .describe('A brief explanation of why this product is recommended and how it pairs.'),
    })
  ),
});
export type AIStyleRecommendationOutput = z.infer<
  typeof AIStyleRecommendationOutputSchema
>;

export async function aiStyleRecommendation(
  input: AIStyleRecommendationInput
): Promise<AIStyleRecommendationOutput> {
  return aiStyleRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiStyleRecommendationPrompt',
  input: {schema: AIStyleRecommendationInputSchema},
  output: {schema: AIStyleRecommendationOutputSchema},
  prompt: `You are an expert luxury fashion stylist for 'Versare', an e-commerce brand blending classic European minimalism with warm 'Brasil-core' aesthetics.

Your task is to provide personalized style recommendations and product pairings based on the user's browsing history and the current item they are viewing.

Consider the following:
- **User's Browsing History**: {{{browsingHistory}}}
- **Current Item Details**: {{{currentItemDetails}}}

Suggest 3-5 complementary products that align with 'Versare's unique aesthetic, explaining clearly why each recommendation is suitable and how it pairs with the user's inferred taste or the current item. Focus on highlighting natural fabrics, artisan craftsmanship, and a sophisticated yet comfortable style.`,
});

const aiStyleRecommendationFlow = ai.defineFlow(
  {
    name: 'aiStyleRecommendationFlow',
    inputSchema: AIStyleRecommendationInputSchema,
    outputSchema: AIStyleRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
