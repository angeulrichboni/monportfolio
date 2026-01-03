import Image from "next/image";
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
    <main className="pt-20">
      
      {/* HERO SECTION */}
      <header id="accueil" className="relative overflow-hidden bg-white">
        {/* Subtle Gradient Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-slate-50 to-white" />
        
        <div className="container mx-auto px-6 py-16 lg:py-28 grid gap-12 lg:gap-8 items-center lg:grid-cols-2">
          
          {/* Text Content */}
          <Reveal className="order-2 lg:order-1">
            <HeroCopy />
            <div className="mt-10">
              <CTAButtons />
            </div>
          </Reveal>

          {/* Image Content */}
          <Reveal className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5] lg:aspect-square">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 -bottom-4 -left-4 bg-slate-100 rounded-3xl -z-10" />
              <div className="absolute -top-4 -right-4 bottom-4 left-4 border-2 border-blue-100 rounded-3xl -z-10" />
              
              <Image
                src="https://res.cloudinary.com/ddivqszbt/image/upload/v1746353953/Me_d48ibg.jpg"
                alt="Photo de BONI Acobe Ange Ulrich"
                fill
                priority
                className="object-cover rounded-2xl shadow-2xl ring-1 ring-slate-900/5"
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* SECTIONS */}
      
      <Reveal>
        <Section id="a-propos" titleKey="section.about.title" subtitleKey="section.about.subtitle" variant="white">
          <About />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="competences" titleKey="section.skills.title" subtitleKey="section.skills.subtitle" variant="gray">
          <Skills />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="projets" titleKey="section.projects.title" subtitleKey="section.projects.subtitle" variant="white">
          <Projects />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="experiences" titleKey="section.experience.title" subtitleKey="section.experience.subtitle" variant="gray">
          <Experience />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="certifications" titleKey="section.certifications.title" subtitleKey="section.certifications.subtitle" variant="white">
          <Certifications />
        </Section>
      </Reveal>

      <Reveal>
        <Section id="contact" titleKey="section.contact.title" subtitleKey="section.contact.subtitle" variant="gray" className="pb-32">
          <Contact />
        </Section>
      </Reveal>

    </main>
  );
}