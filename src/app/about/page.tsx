
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Github, Globe, Linkedin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Simon Linn | DevElevate AI",
  description: "Learn more about Simon Linn, the creator of DevElevate AI.",
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <Avatar className="h-40 w-40 border-4 border-primary/20">
            <AvatarImage src="https://avatars.githubusercontent.com/u/150866883?v=4" alt="Simon Linn" />
            <AvatarFallback>SL</AvatarFallback>
          </Avatar>
        </div>
        <div className="space-y-4 text-center md:text-left">
          <h1 className="text-4xl font-bold font-headline">Simon Linn</h1>
          <p className="text-lg text-muted-foreground">
            Full-Stack Developer & Job Seeker Extraordinaire
          </p>
          <p className="max-w-prose">
            Hey there! I'm a recent grad who realized job hunting is... a lot. So, I started building the tools I needed, like this very project! I've now got over 10 projects under my belt (you can see them on my portfolio). My brain is a sponge for new things—right now I'm diving deep into AI.
            <br /><br />
            I'm on the hunt for a frontend developer role, but I ended up creating the full stack. I've even turned simple static sites into full-stack beasts just for fun. If you want to build something cool or just chat, find me on LinkedIn. If you search "Saw Simon Linn," you'll find me everywhere!
          </p>
        </div>
      </div>
      <Card className="mt-12">
        <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Connect with Me</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap justify-center items-center gap-4">
           <Button asChild variant="outline">
            <Link href="https://www.simonlinn.com" target="_blank" rel="noreferrer">
              <Globe className="mr-2" /> Website
            </Link>
          </Button>
           <Button asChild variant="outline">
            <Link href="https://github.com/SawSimonLinn" target="_blank" rel="noreferrer">
              <Github className="mr-2" /> GitHub
            </Link>
          </Button>
           <Button asChild variant="outline">
            <Link href="https://www.linkedin.com/in/sawsimonlinn/" target="_blank" rel="noreferrer">
              <Linkedin className="mr-2" /> LinkedIn
            </Link>
          </Button>
          <div className="w-full text-center p-4 bg-accent/10 border border-accent/20 rounded-lg mt-4">
             <p className="text-yellow-800 dark:text-yellow-300 font-semibold">If you buy me a coffee, I can finally get a <code className="bg-accent/20 px-1 rounded-sm">.ai</code> domain for this project.</p>
             <Button asChild className="mt-3">
              <Link href="https://www.buymeacoffee.com/sawsimonlinn" target="_blank" rel="noreferrer">
                <Coffee className="mr-2" /> Buy Me a Coffee
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
