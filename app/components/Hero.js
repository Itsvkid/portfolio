import Image from "next/image";

export default function Hero({ profile }) {
  const nameLines = profile.name.split(" ");

  return (
    <section className="mx-auto max-w-[70rem] px-6 pt-32 pb-18 md:px-10 lg:pt-48 lg:pb-28">
      {/* On mobile this is one ordered flex column (portrait first); at lg the
          `contents` wrappers become real grid columns. */}
      <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-8">
        <div className="contents lg:col-span-8 lg:col-start-1 lg:row-start-1 lg:block">
          <div className="order-2 mt-6 lg:mt-0">
            <p className="t-label text-accent">{profile.kicker}</p>

            {/* break-words only engages below ~375px, where "Venkateshkumar"
                at the clamp floor is wider than the content box. */}
            <h1 className="t-display mt-3 break-words text-fg0">
              {nameLines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-5 max-w-[34rem] text-[1.0625rem] leading-[1.6] text-fg1">
              {profile.tagline}
            </p>

            <p className="t-meta mt-6 uppercase text-fg2">
              {profile.location} · {profile.workAuth}
            </p>
          </div>

          <div className="order-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#projects"
              className="rounded-[2px] bg-accent px-5 py-3 text-sm font-medium text-bg0 transition-colors duration-[var(--dur-fast)] hover:bg-accent-hover active:bg-accent-active"
            >
              View projects <span aria-hidden="true">→</span>
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="link font-mono text-sm text-fg0"
            >
              {profile.email}
            </a>
          </div>
        </div>

        <div className="contents lg:col-span-3 lg:col-start-10 lg:row-start-1 lg:block">
          <div className="order-1">
            <Image
              src="/headshot.jpg"
              alt={`${profile.name}, black-and-white studio portrait`}
              width={640}
              height={640}
              priority
              sizes="(min-width: 64rem) 240px, 80px"
              className="size-20 border border-line object-cover grayscale lg:size-60"
            />
          </div>

          {/* On mobile this reads as a continuation of the status line above
              it; at lg it becomes its own block under the portrait. */}
          <div className="order-3 mt-1.5 lg:mt-8">
            <p className="t-label flex items-center gap-2 text-accent">
              <span aria-hidden="true" className="inline-block size-1.5 bg-accent" />
              {profile.availability}
            </p>
            <p className="t-label mt-2 text-fg2">{profile.seeking}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
