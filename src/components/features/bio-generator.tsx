"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  generateDeveloperBio,
  type GenerateDeveloperBioOutput,
} from "@/ai/flows/generate-developer-bio";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Check, Copy, Loader2, Sparkles } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const formSchema = z.object({
  description: z.string().min(10, "Please provide a short description about yourself.").max(300),
  style: z.enum(["funny", "professional", "minimalist"]),
});

type Style = z.infer<typeof formSchema>["style"];

export function BioGenerator() {
  const [generatedBios, setGeneratedBios] = useState<GenerateDeveloperBioOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "I'm a full-stack developer who loves building cool things with Next.js and enjoys a good cup of coffee.",
      style: "professional",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedBios(null);
    try {
      const result = await generateDeveloperBio(values);
      setGeneratedBios(result);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate bios. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
            <CardDescription>Tell us a bit about you.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About You</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="E.g., I'm a frontend developer passionate about UI/UX..."
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
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio Style</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a style" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="funny">Funny</SelectItem>
                          <SelectItem value="minimalist">Minimalist</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Bios
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <OutputCardSkeleton />
                <OutputCardSkeleton />
                <OutputCardSkeleton />
                <OutputCardSkeleton />
            </div>
        ) : generatedBios ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OutputCard title="Twitter/X Bio" content={generatedBios.twitterBio} onCopy={() => handleCopy("twitter", generatedBios.twitterBio)} isCopied={!!copiedStates["twitter"]} />
            <OutputCard title="LinkedIn Intro" content={generatedBios.linkedInIntro} onCopy={() => handleCopy("linkedin", generatedBios.linkedInIntro)} isCopied={!!copiedStates["linkedin"]} />
            <OutputCard title="Portfolio About Me" content={generatedBios.portfolioAboutMe} onCopy={() => handleCopy("portfolio", generatedBios.portfolioAboutMe)} isCopied={!!copiedStates["portfolio"]} />
            <OutputCard title="Elevator Pitch" content={generatedBios.elevatorPitch} onCopy={() => handleCopy("pitch", generatedBios.elevatorPitch)} isCopied={!!copiedStates["pitch"]} />
          </div>
        ) : (
          <Card className="h-full flex items-center justify-center min-h-[400px]">
             <div className="text-center text-muted-foreground p-8">
                Your generated bios will appear here. Choose a style and let the AI work its magic! ✨
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function OutputCard({ title, content, onCopy, isCopied }: { title: string; content: string; onCopy: () => void; isCopied: boolean }) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-headline">{title}</CardTitle>
        <Button variant="outline" size="icon" onClick={onCopy}>
          {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}

function OutputCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between pb-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-8 w-8 rounded-md" />
            </CardHeader>
            <CardContent className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </CardContent>
        </Card>
    );
}
