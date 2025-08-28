"use client";

import Link from "next/link";
import { Bot, FileText, Info, Menu, PenSquare, User } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import React from "react";
import { ThemeToggle } from "../theme-toggle";

const mainNav = [
  { href: "/readme", label: "README Generator" },
  { href: "/bio", label: "Bio Generator" },
  { href: "/pitch", label: "Pitch Writer" },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Bot className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold font-headline tracking-tighter">
        DevElevate AI
      </span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>

        <div className="flex items-center md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <SheetDescription className="sr-only">
                Main navigation menu
              </SheetDescription>
              <div className="flex flex-col h-full">
                <div className="p-4 border-b">
                  <Logo />
                </div>
                <nav className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-4 p-4">
                    <MobileLink href="/readme" onOpenChange={setOpen}>
                      README Generator
                    </MobileLink>
                    <MobileLink href="/bio" onOpenChange={setOpen}>
                      Bio Generator
                    </MobileLink>
                    <MobileLink href="/pitch" onOpenChange={setOpen}>
                      Pitch Writer
                    </MobileLink>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <div className="ml-4 md:hidden">
            <Logo />
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-6">
          {mainNav.map((item) => (
            <MainNavLink key={item.href} href={item.href}>
              {item.label}
            </MainNavLink>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" asChild>
            <Link href="/about">
              <Info className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">About</span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

const MainNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors hover:text-foreground/80",
        isActive ? "text-foreground" : "text-foreground/60"
      )}
    >
      {children}
    </Link>
  );
};

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function MobileLink({
  children,
  href,
  disabled,
  onOpenChange,
}: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        pathname === href && "text-foreground font-semibold"
      )}
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </Link>
  );
}
