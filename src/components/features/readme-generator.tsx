
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateReadme,
} from "@/ai/flows/generate-readme";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Loader2, Wand2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import ReactMarkdown from "react-markdown";

const formSchema = z.object({
  githubRepoUrl: z.string().url("Please enter a valid GitHub repository URL."),
  projectDescription: z.string().min(10, "A project description of at least 10 characters is required."),
  projectUrl: z.string().url("Please enter a valid URL.").optional().or(z.literal('')),
  techStack: z.string().min(2, "Tech stack is required."),
  installationInstructions: z.string().min(10, "Installation instructions are required."),
  envInstructions: z.string().optional(),
  feedbackInstructions: z.string().min(10, "Feedback instructions are required."),
  license: z.string().min(2, "License is required (e.g., MIT)."),
});

export function ReadmeGenerator() {
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      githubRepoUrl: "https://github.com/username/repo-name",
      projectDescription: "A clean, animated portfolio crafted from scratch using Next.js, TailwindCSS, and Aceternity UI. This project features beautiful animations powered by Framer Motion, dynamic project routing, and smooth scroll effects — all wrapped in a responsive layout.",
      projectUrl: "",
      techStack: "Next.js, Tailwind CSS, TypeScript, Framer Motion",
      installationInstructions: "npm install\n\nnpm run dev",
      envInstructions: "API_KEY=your_api_key_here\nANOTHER_VAR=another_value",
      feedbackInstructions: "Feel free to connect with me or drop feedback via [LinkedIn](https://www.linkedin.com/in/sawsimonlinn/). Let’s build something magical together! 💻✨",
      license: "MIT",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReadmeContent(null);
    try {
      const result = await generateReadme(values);
      setReadmeContent(result.readmeContent);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate README. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = () => {
    if (!readmeContent) return;
    navigator.clipboard.writeText(readmeContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Fill in the form below to generate your README.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="githubRepoUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>GitHub Repository URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://github.com/username/repo-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="projectUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Live Demo URL (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="https://myproject.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <FormField
                  control={form.control}
                  name="techStack"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tech Stack (comma-separated)</FormLabel>
                      <FormControl>
                        <Input placeholder="Next.js, Tailwind CSS" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your project. If the description is short, the AI will expand on it."
                        className="resize-y h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="installationInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Installation Instructions</FormLabel>
                    <FormControl>
                      <Textarea className="resize-y h-24 font-mono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="envInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Environment Variables (Optional)</FormLabel>
                    <FormControl>
                      <Textarea className="resize-y h-24 font-mono" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="feedbackInstructions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feedback / Connect</FormLabel>
                    <FormControl>
                      <Textarea className="resize-y" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>License</FormLabel>
                    <FormControl>
                      <Input placeholder="MIT" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Generate README
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Generated README</CardTitle>
            <CardDescription>
              Your AI-generated README will appear here.
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
            disabled={!readmeContent}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </CardHeader>
        <CardContent className="h-[calc(100%-4rem)]">
          <div className="prose prose-sm dark:prose-invert w-full h-full rounded-md border bg-muted/50 p-4 overflow-auto max-w-full">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-8 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <br/>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <br/>
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-20 w-full bg-muted" />
                </div>
              ) : readmeContent ? (
                <ReactMarkdown className="bg-transparent" components={{
                  // eslint-disable-next-line @next/next/no-img-element
                  img: ({node, ...props}) => <img {...props} style={{display: 'inline-block'}} alt={props.alt || ''} />
                }}>{readmeContent}</ReactMarkdown>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Your README markdown will be displayed here.
                </div>
              )}
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
