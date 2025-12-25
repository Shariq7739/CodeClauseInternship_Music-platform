'use server';

/**
 * @fileOverview This file implements the genre recommendations flow.
 *
 * - `getGenreRecommendations` -  A function that recommends songs or artists based on user listening habits.
 * - `GenreRecommendationsInput` - The input type for the getGenreRecommendations function.
 * - `GenreRecommendationsOutput` - The return type for the getGenreRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenreRecommendationsInputSchema = z.object({
  listeningHistory: z
    .string()
    .describe(
      'A comma separated list of the user listening history. For example: Pop, Rock, Classical'
    ),
});

export type GenreRecommendationsInput = z.infer<typeof GenreRecommendationsInputSchema>;

const GenreRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe('A comma separated list of recommended songs or artists'),
});

export type GenreRecommendationsOutput = z.infer<typeof GenreRecommendationsOutputSchema>;

export async function getGenreRecommendations(
  input: GenreRecommendationsInput
): Promise<GenreRecommendationsOutput> {
  return genreRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'genreRecommendationsPrompt',
  input: {schema: GenreRecommendationsInputSchema},
  output: {schema: GenreRecommendationsOutputSchema},
  prompt: `Based on my listening history: {{{listeningHistory}}}, recommend some songs or artists I might like. Return the recommendations as a comma separated list.
`,
});

const genreRecommendationsFlow = ai.defineFlow(
  {
    name: 'genreRecommendationsFlow',
    inputSchema: GenreRecommendationsInputSchema,
    outputSchema: GenreRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
