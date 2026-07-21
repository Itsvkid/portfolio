import {
  profile,
  skills,
  projects,
  experience,
  education,
  certifications,
} from "./data";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Section from "./components/Section";
import ProjectEntry from "./components/ProjectEntry";
import ExperienceEntry from "./components/ExperienceEntry";
import EducationEntry from "./components/EducationEntry";
import ToolchainList from "./components/ToolchainList";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#toolchain", label: "Toolchain" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-[2px] focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg0"
      >
        Skip to content
      </a>

      <Nav items={NAV} cvHref={profile.cv} wordmark="Vinaykumar V." />

      <main id="top">
        <Hero profile={profile} />

        <Section index="01" title="Projects" id="projects">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="border-line not-first:mt-12 not-first:border-t not-first:pt-12"
            >
              <ProjectEntry
                project={project}
                index={`01·${String.fromCharCode(65 + i)}`}
              />
            </div>
          ))}
        </Section>

        <Section index="02" title="Experience" id="experience">
          {experience.map((entry) => (
            <ExperienceEntry key={entry.org} entry={entry} />
          ))}
        </Section>

        <Section index="03" title="Education" id="education">
          {education.map((entry) => (
            <div
              key={entry.school}
              className="border-line not-first:mt-10 not-first:border-t not-first:pt-10"
            >
              <EducationEntry entry={entry} />
            </div>
          ))}
        </Section>

        <Section index="04" title="Toolchain" id="toolchain">
          <ToolchainList skills={skills} certifications={certifications} />
        </Section>

        <Section index="05" title="Contact" id="contact">
          <ContactSection profile={profile} />
        </Section>
      </main>

      <Footer profile={profile} />
    </>
  );
}
