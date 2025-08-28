
'use server';
/**
 * @fileOverview A flow to generate a README file based on project information.
 *
 * - generateReadme - A function that generates a README file.
 * - GenerateReadmeInput - The input type for the generateReadme function.
 * - GenerateReadmeOutput - The return type for the generateReadme function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateReadmeInputSchema = z.object({
  githubRepoUrl: z.string().url().describe('The URL of the GitHub repository.'),
  projectDescription: z.string().describe('A description of the project. If it\'s short, the AI will expand on it.'),
  projectUrl: z.string().optional().describe('The live demo URL of the project.'),
  techStack: z.string().describe('The tech stack used in the project (e.g., Next.js, Tailwind CSS).'),
  installationInstructions: z.string().describe('Instructions on how to install the project.'),
  envInstructions: z.string().optional().describe('Optional instructions for setting up environment variables.'),
  feedbackInstructions: z.string().describe('Instructions on how users can give feedback or connect.'),
  license: z.string().describe('The license under which the project is released (e.g., MIT).'),
});

export type GenerateReadmeInput = z.infer<typeof GenerateReadmeInputSchema>;

const GenerateReadmeOutputSchema = z.object({
  readmeContent: z.string().describe('The generated README content in Markdown format.'),
});

export type GenerateReadmeOutput = z.infer<typeof GenerateReadmeOutputSchema>;

export async function generateReadme(input: GenerateReadmeInput): Promise<GenerateReadmeOutput> {
  return generateReadmeFlow(input);
}

const readmePrompt = ai.definePrompt({
  name: 'readmePrompt',
  input: {schema: z.object({
      ...GenerateReadmeInputSchema.shape,
      projectName: z.string(),
      techStackBadges: z.string(),
  })},
  output: {schema: GenerateReadmeOutputSchema},
  prompt: `You are an expert README writer. Your task is to generate a README in Markdown format that is professional, visually appealing, and follows the structure of the example provided.

**Instructions:**
1.  **Project Description**: If the user provides a short project description, expand on it to create a detailed and engaging paragraph.
2.  **Generate Features**: Based on the project description, generate a bulleted list of 5-7 key features. Each feature must start with an emoji (e.g., ⚡, 🎨, 🎞️, 🧠, 📱, 🌗, 🥷).
3.  **Tech Stack Badges**: The \`{{{techStackBadges}}}\` variable is already provided. Do not create your own. Place it as shown in the template.
4.  **Project Name**: Use the \`{{{projectName}}}\` variable.
5.  **Screenshots**: Include the screenshot section with the table layout. The user will replace the placeholder paths.
6.  **Live Demo**: If a \`{{{projectUrl}}}\` is provided, use it.
7.  **Installation**: Combine the repo URL, project name, and installation instructions to create the setup commands.
8.  **Environment Variables**: Only include the "Environment Variables" section if \`{{{envInstructions}}}\` are provided.
9.  **Feedback & License**: Use the provided values for the feedback and license sections.

---

**README Template:**

<p align="center">
  <img src="./public/heading.PNG" alt="heading img">
</p>

{{{techStackBadges}}}

<h2 align="center">✨ {{{projectName}}} ✨</h2>

<p align="center">
  {{{projectDescription}}}
</p>

---

## 🔥 Features

- ⚡ Built with **{{{techStack}}}**

---

## 📸 Screenshot

<table align="center">
  <tr>
    <td colspan="2"><img src="./public/001.PNG" width="100%"/></td>
  </tr>
  <tr>
    <td><img src="./public/002.PNG" width="100%"/></td>
    <td><img src="./public/003.PNG" width="100%"/></td>
  </tr>
  <tr>
    <td><img src="./public/005.PNG" width="100%"/></td>
    <td><img src="./public/004.PNG" width="100%"/></td>
  </tr>
</table>

---

## 🚀 Live Demo

👉 [Visit The Website]({{{projectUrl}}})

---

## 🛠️ Setup & Run

\`\`\`bash
git clone {{{githubRepoUrl}}}
cd {{{projectName}}}
{{{installationInstructions}}}
\`\`\`

{{#if envInstructions}}
## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your .env file:
\`\`\`
{{{envInstructions}}}
\`\`\`
{{/if}}

---

## 💬 Feedback

{{{feedbackInstructions}}}

---

## 📄 License

This project is licensed under the {{{license}}} License.
`,
});


const generateReadmeFlow = ai.defineFlow(
  {
    name: 'generateReadmeFlow',
    inputSchema: GenerateReadmeInputSchema,
    outputSchema: GenerateReadmeOutputSchema,
  },
  async input => {
    // Extract username and project name from URL
    const urlParts = input.githubRepoUrl.split('/');
    const repoName = urlParts.pop()?.replace('.git', '') || '';
    const projectName = repoName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      
    // Transform the tech stack into shields.io badges
    const techBadges = input.techStack.split(',').map(tech => {
        const techTrimmed = tech.trim();
        const techEncoded = encodeURIComponent(techTrimmed.toUpperCase());
        const logo = techTrimmed.toLowerCase().replace(/\s/g, '').replace(/\./g, '');
        let color = '000000'; // default black
        if (logo.includes('next')) color = '000000';
        if (logo.includes('tailwind')) color = '06B6D4';
        if (logo.includes('typescript')) color = '3178C6';
        if (logo.includes('react')) color = '61DAFB';
        
        return `<img src="https://img.shields.io/badge/${techEncoded}-${color}?style=for-the-badge&logo=${logo}&logoColor=white" />`;
    }).join('\n  ');
    
    const augmentedInput = {
        ...input,
        projectName,
        projectUrl: input.projectUrl || 'https://www.simonlinn.com',
        techStackBadges: `<p align="center">\n  ${techBadges}\n</p>`,
    };

    const {output} = await readmePrompt(augmentedInput);
    return output!;
  }
);
