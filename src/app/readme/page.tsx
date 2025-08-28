import { ReadmeGenerator } from "@/components/features/readme-generator";

export default function ReadmePage() {
  return (
    <div className="container max-w-5xl py-8 px-4">
        <div className="space-y-2 text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">GitHub README Generator</h1>
            <p className="text-muted-foreground">
                Paste your project info and get a clean, engaging, emoji-rich README in seconds.
            </p>
        </div>
        <ReadmeGenerator />
    </div>
  );
}
