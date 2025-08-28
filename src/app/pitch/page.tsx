import { PitchWriter } from "@/components/features/pitch-writer";

export default function PitchPage() {
  return (
    <div className="container max-w-5xl py-8 px-4">
        <div className="space-y-2 text-center mb-12">
            <h1 className="text-4xl font-bold font-headline">Cover Letter / Pitch Writer</h1>
            <p className="text-muted-foreground">
              Paste your resume and a job description to get a compelling pitch that gets you noticed.
            </p>
        </div>
        <PitchWriter />
    </div>
  );
}
