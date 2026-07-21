"use client";

import { useEffect, useState } from "react";

export default function Nav({ items, cvHref, wordmark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="border-b border-line bg-bg0/94 backdrop-blur-sm">
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-[70rem] items-center justify-between px-6 md:px-10"
        >
          <a
            href="#top"
            className="t-label text-fg0 tracking-[0.08em] text-[0.75rem]"
          >
            {wordmark}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="t-body-sm text-fg1 transition-colors duration-[var(--dur-fast)] hover:text-fg0"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={cvHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[2px] bg-accent px-4 py-2 font-mono text-[0.75rem] font-medium uppercase tracking-[0.06em] text-bg0 transition-colors duration-[var(--dur-fast)] hover:bg-accent-hover active:bg-accent-active"
            >
              <span className="hidden md:inline">CV — PDF</span>
              <span className="md:hidden">CV</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="t-label py-4 text-[0.75rem] text-fg1 transition-colors duration-[var(--dur-fast)] hover:text-fg0 md:hidden"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </div>

      {/* always rendered so aria-controls never dangles */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-b border-line bg-bg0 md:hidden"
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="flex h-14 items-center border-b border-line px-6 text-base text-fg0 last:border-b-0"
          >
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}
