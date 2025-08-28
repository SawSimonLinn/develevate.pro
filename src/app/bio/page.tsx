import { BioGenerator } from "@/components/features/bio-generator";

export default function BioPage() {
  return (
    <div className="container max-w-5xl py-8 px-4">
        <div className="space-y-2 text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Developer Bio Generator</h1>
            <p className="text-muted-foreground">
              Write 1-2 lines about yourself and get multiple bios in different formats and styles.
            </p>
        </div>
        <BioGenerator />
    </div>
  );
}
