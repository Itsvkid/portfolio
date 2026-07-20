import {
  profile,
  skills,
  projects,
  experience,
  education,
  certifications,
} from "./data";
import ContactForm from "./ContactForm";

const NAV = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

function SectionHeading({ index, title, kicker }) {
  return (
    <div className="mb-10 border-b border-line pb-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs tracking-widest text-accent">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          {title}
        </h2>
      </div>
      {kicker ? (
        <p className="mt-2 text-sm text-muted">{kicker}</p>
      ) : null}
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-line bg-wash px-3 py-1 text-xs font-medium text-ink-2">
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-line bg-paper/85 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm font-semibold tracking-tight">
            VK<span className="text-accent">.</span>
          </a>
          <div className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </div>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-paper transition-opacity hover:opacity-85"
          >
            Download CV
          </a>
        </nav>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="grid-bg border-b border-line">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {profile.role}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">
              {profile.tagline}
            </p>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
              {profile.seeking}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span>📍 {profile.location}</span>
              <span className="hidden sm:inline text-line">|</span>
              <span>{profile.workAuth}</span>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-85"
              >
                View projects
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:bg-wash"
              >
                Get in touch
              </a>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
          <SectionHeading
            index="01"
            title="Key Projects"
            kicker="Research and simulation work in propulsion aerodynamics."
          />
          <div className="space-y-10">
            {projects.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-line p-6 transition-shadow hover:shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{p.context}</p>
                  </div>
                  <span className="font-mono text-xs text-muted">
                    {p.period}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>

                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li
                      key={pt}
                      className="flex gap-3 text-sm leading-relaxed text-ink-2"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 border-t border-line pt-4">
                  <p className="font-mono text-xs text-muted">
                    {p.tech.join(" · ")}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="border-t border-line bg-wash">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <SectionHeading
              index="02"
              title="Experience"
              kicker="Industry exposure in aircraft maintenance and overhaul."
            />
            <div className="space-y-8">
              {experience.map((e) => (
                <article
                  key={e.org}
                  className="rounded-2xl border border-line bg-paper p-6 sm:p-8"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight">
                        {e.org}
                      </h3>
                      <p className="mt-0.5 text-sm text-muted">{e.sub}</p>
                      <p className="mt-2 text-sm font-medium text-ink-2">
                        {e.role}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-muted">{e.period}</p>
                      <p className="mt-1 text-xs text-muted">{e.location}</p>
                    </div>
                  </div>
                  <ul className="mt-6 space-y-3">
                    {e.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-3 text-sm leading-relaxed text-ink-2"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="mx-auto max-w-5xl px-6 py-20">
          <SectionHeading
            index="03"
            title="Education"
            kicker="Postgraduate propulsion research and aeronautical engineering foundations."
          />
          <div className="space-y-8">
            {education.map((ed) => (
              <article
                key={ed.school}
                className="rounded-2xl border border-line p-6 sm:p-8"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {ed.school}
                    </h3>
                    <p className="mt-1 text-sm text-ink-2">{ed.degree}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-muted">{ed.period}</p>
                    <p className="mt-1 text-xs text-muted">{ed.location}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted">
                    Core modules
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {ed.modules.map((m) => (
                      <Tag key={m}>{m}</Tag>
                    ))}
                  </div>
                </div>

                {ed.note ? (
                  <p className="mt-6 border-l-2 border-accent pl-4 text-sm text-ink-2">
                    {ed.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-t border-line bg-wash">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <SectionHeading
              index="04"
              title="Technical Skills"
              kicker="Simulation, CAD, and analysis toolchain."
            />
            <div className="grid gap-6 sm:grid-cols-2">
              {skills.map((s) => (
                <div
                  key={s.group}
                  className="rounded-2xl border border-line bg-paper p-6"
                >
                  <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                    {s.group}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.items.map((i) => (
                      <Tag key={i}>{i}</Tag>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14">
              <h3 className="text-lg font-semibold tracking-tight">
                Certifications &amp; Achievements
              </h3>
              <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper">
                {certifications.map((c) => (
                  <li
                    key={c.title}
                    className="flex flex-wrap items-baseline justify-between gap-2 px-6 py-4"
                  >
                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="mt-0.5 text-xs text-muted">{c.detail}</p>
                    </div>
                    <span className="font-mono text-xs text-muted">
                      {c.year}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
          <SectionHeading
            index="05"
            title="Contact"
            kicker="Open to entry-level propulsion, CFD, and aircraft design roles."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              { label: "LinkedIn", value: "vinaykumar-venkateshkumar", href: profile.linkedin },
              { label: "GitHub", value: "Itsvkid", href: profile.github },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group rounded-2xl border border-line p-6 transition-colors hover:border-ink"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-muted">
                  {c.label}
                </p>
                <p className="mt-2 text-sm font-medium break-all group-hover:text-accent">
                  {c.value}
                </p>
              </a>
            ))}
          </div>

          <div className="mt-10">
            <h3 className="mb-5 font-mono text-xs uppercase tracking-widest text-accent">
              Send a message
            </h3>
            <ContactForm email={profile.email} />
          </div>

          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85"
          >
            Download full CV (PDF)
          </a>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-6 py-8 text-xs text-muted">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p className="font-mono">Propulsion · CFD · Parametric CAD</p>
        </div>
      </footer>
    </div>
  );
}
