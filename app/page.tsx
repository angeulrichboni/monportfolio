import Link from "next/link";
import { CTAButtons } from "../components/CTAButtons";
import { Section } from "../components/Section";
import { About } from "../components/sections/About";
import { Skills } from "../components/sections/Skills";
import { Projects } from "../components/sections/Projects";
import { Experience } from "../components/sections/Experience";
import { Certifications } from "../components/sections/Certifications";
import { Contact } from "../components/sections/Contact";
import { Reveal } from "../components/Reveal";
import { HeroCopy } from "../components/HeroCopy";

export default function Home() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <header id="accueil" className="relative overflow-hidden bg-sky-50 dark:bg-sky-950/20">
        {/* Background image and overlay */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-center bg-cover blur-sm"
          style={{ backgroundImage: "url('/hero-bg.jfif')" }}
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 to-white/20 dark:from-[#0b1220]/75 dark:to-[#0b1220]/20"
        />
        <div className="container mx-auto px-6 py-16 sm:py-20 md:py-24 grid gap-8 items-center md:grid-cols-2">
          <Reveal>
            <div className="order-2 md:order-1">
              <HeroCopy />
              <div className="mt-8">
                <CTAButtons />
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="relative order-1 md:order-2">
              <img
                src="https://res.cloudinary.com/ddivqszbt/image/upload/v1746353953/Me_d48ibg.jpg"
                alt="Photo de BONI Acobe Ange Ulrich"
                className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-2xl shadow-xl ring-1 ring-black/5"
                loading="eager"
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Sections */}
      <Reveal>
        <Section id="a-propos" titleKey="section.about.title" subtitleKey="section.about.subtitle" className="scroll-mt-20">
          <About />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="competences" titleKey="section.skills.title" subtitleKey="section.skills.subtitle" className="scroll-mt-20">
          <Skills />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="projets" titleKey="section.projects.title" subtitleKey="section.projects.subtitle" className="scroll-mt-20">
          <Projects />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="experiences" titleKey="section.experience.title" subtitleKey="section.experience.subtitle" className="scroll-mt-20">
          <Experience />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="certifications" titleKey="section.certifications.title" subtitleKey="section.certifications.subtitle" className="scroll-mt-20">
          <Certifications />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="contact" titleKey="section.contact.title" subtitleKey="section.contact.subtitle" className="scroll-mt-20">
          <Contact />
        </Section>
      </Reveal>
    </main>
  );
}
