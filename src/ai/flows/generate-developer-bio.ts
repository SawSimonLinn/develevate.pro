'use server';

/**
 * @fileOverview Bio generator AI agent.
 *
 * - generateDeveloperBio - A function that handles the bio generation process.
 * - GenerateDeveloperBioInput - The input type for the generateDeveloperBio function.
 * - GenerateDeveloperBioOutput - The return type for the generateDeveloperBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const GenerateDeveloperBioInputSchema = z.object({
  description: z.string().describe('A short description about yourself.'),
  style: z.enum(['funny', 'professional', 'minimalist']).describe('The style of the bio.'),
});
export type GenerateDeveloperBioInput = z.infer<typeof GenerateDeveloperBioInputSchema>;

const GenerateDeveloperBioOutputSchema = z.object({
  twitterBio: z.string().describe('A short bio suitable for Twitter/X (160 chars).'),
  linkedInIntro: z.string().describe('A short paragraph for LinkedIn introduction.'),
  portfolioAboutMe: z.string().describe('A longer bio for portfolio or about me section.'),
  elevatorPitch: z.string().describe('A concise elevator pitch.'),
});
export type GenerateDeveloperBioOutput = z.infer<typeof GenerateDeveloperBioOutputSchema>;

export async function generateDeveloperBio(input: GenerateDeveloperBioInput): Promise<GenerateDeveloperBioOutput> {
  return generateDeveloperBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDeveloperBioPrompt',
  input: {schema: GenerateDeveloperBioInputSchema},
  output: {schema: GenerateDeveloperBioOutputSchema},
  prompt: `You are an expert bio writer specializing in creating compelling bios for developers.

You will use the following information to generate multiple bios in different formats with the specified style.

Description: {{{description}}}
Style: {{{style}}}

Output types:
- Twitter/X bio (160 chars)
- LinkedIn intro (short paragraph)
- Portfolio/About Me (longer)
- Elevator pitch`, 
});

const generateDeveloperBioFlow = ai.defineFlow(
  {
    name: 'generateDeveloperBioFlow',
    inputSchema: GenerateDeveloperBioInputSchema,
    outputSchema: GenerateDeveloperBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
