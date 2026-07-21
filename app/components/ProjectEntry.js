export default function ProjectEntry({ project, index }) {
  const ongoing = project.period.toLowerCase().includes("ongoing");

  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <span className="t-label text-fg2">{index}</span>
        <span className="t-meta flex items-center gap-2 uppercase text-fg2">
          {project.period}
          {ongoing ? (
            <span
              aria-hidden="true"
              className="inline-block size-1.5 shrink-0 bg-accent"
            />
          ) : null}
        </span>
      </div>

      <h3 className="t-h3 mt-2 text-fg0">{project.title}</h3>
      <p className="t-meta mt-1 text-fg2">{project.context}</p>

      {project.stats ? (
        <dl className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-6">
          {/* column-reverse so each figure sits above its label without
              breaking the required dt-then-dd source order */}
          {project.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1">
              <dt className="t-label text-fg2">{stat.label}</dt>
              <dd className="text-[1.0625rem] font-semibold text-fg0">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-6 space-y-3">
        {project.points.map((point) => (
          <p key={point} className="t-body text-fg1">
            {point}
          </p>
        ))}
      </div>

      <p className="t-meta mt-6 uppercase text-fg2">
        {project.tech.join(" · ")}
      </p>
    </article>
  );
}
