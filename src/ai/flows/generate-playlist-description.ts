'use server';

/**
 * @fileOverview Generates a playlist description using AI.
 *
 * - generatePlaylistDescription - A function that generates a description for a playlist.
 * - GeneratePlaylistDescriptionInput - The input type for the generatePlaylistDescription function.
 * - GeneratePlaylistDescriptionOutput - The return type for the generatePlaylistDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePlaylistDescriptionInputSchema = z.object({
  playlistName: z.string().describe('The name of the playlist.'),
  musicGenre: z.string().describe('The genre of music in the playlist.'),
  artistNames: z.array(z.string()).describe('A list of artists in the playlist.'),
});
export type GeneratePlaylistDescriptionInput = z.infer<
  typeof GeneratePlaylistDescriptionInputSchema
>;

const GeneratePlaylistDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description of the playlist.'),
});
export type GeneratePlaylistDescriptionOutput = z.infer<
  typeof GeneratePlaylistDescriptionOutputSchema
>;

export async function generatePlaylistDescription(
  input: GeneratePlaylistDescriptionInput
): Promise<GeneratePlaylistDescriptionOutput> {
  return generatePlaylistDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePlaylistDescriptionPrompt',
  input: {schema: GeneratePlaylistDescriptionInputSchema},
  output: {schema: GeneratePlaylistDescriptionOutputSchema},
  prompt: `You are an AI assistant that generates engaging playlist descriptions.

  Based on the playlist's name, music genre, and artists, create a compelling and concise description.

  Playlist Name: {{{playlistName}}}
  Music Genre: {{{musicGenre}}}
  Artists: {{#each artistNames}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

  Description:`,
});

const generatePlaylistDescriptionFlow = ai.defineFlow(
  {
    name: 'generatePlaylistDescriptionFlow',
    inputSchema: GeneratePlaylistDescriptionInputSchema,
    outputSchema: GeneratePlaylistDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
