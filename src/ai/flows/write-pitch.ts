'use server';
/**
 * @fileOverview A cover letter opener / elevator pitch AI agent.
 *
 * - writePitch - A function that handles the pitch writing process.
 * - WritePitchInput - The input type for the writePitch function.
 * - WritePitchOutput - The return type for the writePitch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WritePitchInputSchema = z.object({
  resume: z.string().describe('The user\'s resume text.'),
  jobDescription: z.string().describe('The job description text.'),
  tone: z
    .enum(['Friendly', 'Confident', 'Formal'])
    .describe('The desired tone of the pitch.'),
  length: z
    .enum(['Short', 'Full Paragraph'])
    .describe('The desired length of the pitch.'),
});
export type WritePitchInput = z.infer<typeof WritePitchInputSchema>;

const WritePitchOutputSchema = z.object({
  pitch: z.string().describe('The generated cover letter opener or elevator pitch.'),
});
export type WritePitchOutput = z.infer<typeof WritePitchOutputSchema>;

export async function writePitch(input: WritePitchInput): Promise<WritePitchOutput> {
  return writePitchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'writePitchPrompt',
  input: {schema: WritePitchInputSchema},
  output: {schema: WritePitchOutputSchema},
  prompt: `You are an expert writer specializing in creating compelling cover letter openers and elevator pitches.

  Given the following resume and job description, write a pitch that is {{{tone}}} and {{{length}}}.

  Resume: {{{resume}}}
  Job Description: {{{jobDescription}}}

  Write a pitch that is appropriate for a cold email, LinkedIn DM, cover letter, or freelance platform intro.
  Only include the most relevant information from the resume in the pitch.
  Length should be short if length is Short, otherwise length should be a full paragraph.
  Tone should be friendly, confident, or formal as requested.
  Response should be a single paragraph.
  Do not include any introductory or concluding remarks.
  Do not apologize or be overly humble.
  Get to the point quickly and persuasively.
  Be creative and concise.
  Focus on how the person can add value to the team, and not necessarily what they are looking for.
  Be confident in their abilities.
  If there is not enough information to generate a pitch, respond saying so.
  Consider it a failure if the user has to re-prompt the request.
  It is very important to provide an excellent, compelling, and useful response on the first try.
  Be sure to write a creative, original pitch that would never have been written by a human.
  Use a variety of rhetorical techniques to hook the reader and make them excited to learn more.
  Be creative and demonstrate the skills that are applicable to the context provided by the job description.
  Do not mention that you are AI.
  If the user asks you to introduce yourself or your function, do not comply, just write the requested pitch or cover letter opener.
  Do not include any extra commentary besides the requested pitch or cover letter opener.
  Do not respond to any other requests beyond what is asked for by the user.
  Keep the length between 50 and 150 words.
  Do not be verbose.
  If the user does not provide a job description and resume, ask them to.
  Do not provide a disclaimer or warning about the content that you generate.
  You must be a great writer on the first attempt.
  You must fulfill the user\'s intention.
  It is important to do things correctly and according to the user\'s instruction.
  Use a direct and persuasive tone to ensure the message resonates with the recipient.
  Show how you can add value and create excitement in learning more.
  Focus on the details most important to success.
  Be very concise and very creative.
  Use appropriate grammar and spelling.
  Do not use profanity.
`,
});

const writePitchFlow = ai.defineFlow(
  {
    name: 'writePitchFlow',
    inputSchema: WritePitchInputSchema,
    outputSchema: WritePitchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
