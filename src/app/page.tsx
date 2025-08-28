
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Copy, FileText, PenSquare, User, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };
  
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="w-full py-20 md:py-32 lg:py-40 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container px-4 md:px-6 text-center">
          <motion.div 
            className="max-w-3xl mx-auto space-y-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm shine">
              Powered by AI
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Elevate Your Dev Profile
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground md:text-xl">
              Instantly generate stunning GitHub READMEs, developer bios, and
              job-ready pitches that capture attention.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="shine">
                <Link href="/readme">
                  <Zap className="mr-2" /> Get Started
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <motion.section 
        id="features" 
        className="w-full py-16 md:py-24 lg:py-32 bg-secondary"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container px-4 md:px-6">
          <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
              A Toolkit for Every Developer
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From crafting the perfect project showcase to nailing your job application, our AI tools are here to help you shine.
            </motion.p>
          </motion.div>
          <motion.div 
            className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={itemVariants}>
              <FeatureCard
                href="/readme"
                icon={<FileText className="h-8 w-8" />}
                title="README Generator"
                description="Turn project details into a clean, engaging, emoji-rich README. Make your GitHub profile stand out."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                href="/bio"
                icon={<User className="h-8 w-8" />}
                title="Developer Bio Generator"
                description="Generate professional, funny, or minimalist bios for Twitter, LinkedIn, and your portfolio from a single sentence."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <FeatureCard
                href="/pitch"
                icon={<PenSquare className="h-8 w-8" />}
                title="Pitch Writer"
                description="Paste your resume and a job description to get a compelling pitch or cover letter opener that gets you noticed."
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="w-full py-16 md:py-24 lg:py-32 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container px-4 md:px-6">
           <motion.div 
            className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
           >
            <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
             🖼️ Live Demos / Previews
            </motion.h2>
            <motion.p variants={itemVariants} className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
             Visual = Viral. See how DevElevate AI transforms your input into polished, professional content.
            </motion.p>
          </motion.div>
          <motion.div 
            className="grid lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <motion.div variants={itemVariants} className="lg:col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>README Preview</CardTitle>
                        <CardDescription>Side-by-side comparison of a generated README.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-4">
                        <div className="prose prose-sm dark:prose-invert rounded-md border p-4 bg-muted/50">
                            <h4>Before</h4>
                            <p>Just a basic README file with some notes.</p>
                        </div>
                        <div className="prose prose-sm dark:prose-invert rounded-md border p-4">
                           <h4>✨ After</h4>
                           <p>A beautifully formatted, emoji-rich README with badges, features, and installation instructions.</p>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle>Bio Output</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                      <p><strong>Twitter:</strong> Full-stack dev & coffee lover. Building cool things with Next.js 🚀</p>
                  </CardContent>
              </Card>
            </motion.div>
             <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle>LinkedIn Bio</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                      <p>A passionate full-stack developer with experience in creating robust and scalable web applications using modern technologies like Next.js and TypeScript...</p>
                  </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle>Pitch Sample</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                      <p>With my experience in <span className="bg-yellow-200/50 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300 rounded-md px-1">Next.js</span> and <span className="bg-yellow-200/50 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300 rounded-md px-1">full-stack development</span>, I am confident I can help your team build exceptional user experiences...</p>
                  </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="w-full py-16 md:py-24 lg:py-32 bg-secondary"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">💡 How It Works</motion.h2>
              <motion.p variants={itemVariants} className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Get from idea to professional content in just three simple steps.
              </motion.p>
            </motion.div>
            <motion.div 
              className="mx-auto w-full max-w-4xl"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                  <div className="text-6xl">1️⃣</div>
                  <h3 className="text-xl font-bold font-headline">Paste Your Info</h3>
                  <p className="text-muted-foreground">Provide a repo link, a few lines about yourself, or a job description.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                   <div className="text-6xl">2️⃣</div>
                  <h3 className="text-xl font-bold font-headline">Generate with AI</h3>
                  <p className="text-muted-foreground">Our AI gets to work, crafting the perfect content based on your input.</p>
                </motion.div>
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-4">
                   <div className="text-6xl">3️⃣</div>
                  <h3 className="text-xl font-bold font-headline">Copy or Export</h3>
                  <p className="text-muted-foreground">Instantly copy the generated markdown or text to use anywhere.</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="w-full py-16 md:py-24 lg:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <motion.div 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">🌟 Why DevElevate AI?</motion.h2>
              <motion.p variants={itemVariants} className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We're different from other AI tools because we're built by a developer, for developers.
              </motion.p>
            </motion.div>
            <motion.div 
              className="mx-auto w-full max-w-md"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <ul className="grid gap-4 text-left">
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Built for Developers</h3>
                    <p className="text-sm text-muted-foreground">Outputs are tailored for GitHub, LinkedIn, and portfolios.</p>
                  </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <div>
                    <h3 className="font-semibold">Smart, Concise & Sharable</h3>
                    <p className="text-sm text-muted-foreground">No fluff. Just clean, professional content ready to go.</p>
                  </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                  <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                   <div>
                    <h3 className="font-semibold">No Login Required</h3>
                    <p className="text-sm text-muted-foreground">Get started right away without any friction.</p>
                  </div>
                </motion.li>
                <motion.li variants={itemVariants} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                    <div>
                        <h3 className="font-semibold">Completely Free (MVP)</h3>
                        <p className="text-sm text-muted-foreground">All tools are free to use while we're in the early stages.</p>
                    </div>
                </motion.li>
              </ul>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="w-full py-16 md:py-24 lg:py-32 bg-secondary"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
             <motion.div 
                className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.h2 variants={itemVariants} className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                    📦 Frequently Asked Questions
                </motion.h2>
            </motion.div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it free?</AccordionTrigger>
                <AccordionContent>
                  Yes, DevElevate AI is 100% free to use during our initial launch. Enjoy all the features without any cost.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Do I need to log in?</AccordionTrigger>
                <AccordionContent>
                  No login is required to generate content. You can start using the tools immediately.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I save my output?</AccordionTrigger>
                <AccordionContent>
                  Currently, you can copy the output to your clipboard or download it as a file. We are working on a feature to save templates for logged-in users.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </motion.section>

        <motion.section 
          className="w-full py-16 md:py-24 lg:py-32 text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
            <motion.div 
              className="container px-4 md:px-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
                <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold font-headline mb-4">🚀 Ready to Boost Your Dev Presence?</motion.h2>
                <motion.div variants={itemVariants}>
                  <Button asChild size="lg" className="shine">
                      <Link href="/readme">Start Now &rarr;</Link>
                  </Button>
                </motion.div>
            </motion.div>
        </motion.section>
    </div>
  );
}

function FeatureCard({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string; }) {
  return (
    <Link href={href} className="group">
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <Card className="h-full hover:border-primary/50 hover:shadow-lg transition-all bg-background">
          <CardHeader className="flex flex-col items-center text-center">
            <motion.div 
              className="rounded-full bg-primary/10 p-4 text-primary mb-4"
              whileHover={{ scale: 1.1, rotate: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              {icon}
            </motion.div>
            <CardTitle className="font-headline text-2xl">{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            {description}
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
