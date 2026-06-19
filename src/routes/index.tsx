import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/portfolio/LoadingScreen";
import { BackgroundFX, CursorGlow, ScrollProgress } from "@/components/portfolio/BackgroundFX";
import { Navbar } from "@/components/portfolio/Navbar";
import {
  HeroSection, AboutSection, SkillsSection, ProjectsSection,
  AchievementsSection, ExperienceSection, ResumeSection, ContactSection,
} from "@/components/portfolio/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shivanand Ray — AI/ML Engineer & Full-Stack Developer" },
      { name: "description", content: "Portfolio of Shivanand Ray — AI/ML engineer, full-stack developer & startup builder building intelligent healthcare, fintech and SaaS products." },
      { property: "og:title", content: "Shivanand Ray — AI/ML Engineer & Full-Stack Developer" },
      { property: "og:description", content: "Portfolio of Shivanand Ray — AI/ML engineer, full-stack developer & startup builder." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      <ScrollProgress />
      <BackgroundFX />
      <CursorGlow />
      {loaded && (
        <>
          <Navbar />
          <main className="relative">
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <AchievementsSection />
            <ExperienceSection />
            <ResumeSection />
            <ContactSection />
          </main>
        </>
      )}
    </>
  );
}
