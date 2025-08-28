import { Github, Linkedin, Globe } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex-col gap-4 sm:flex-row py-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} DevElevate AI. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <Link href="https://www.simonlinn.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </Link>
            <Link href="https://github.com/SawSimonLinn" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link href="https://www.linkedin.com/in/sawsimonlinn/" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
