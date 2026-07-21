"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade-up on first viewport entry, once. The hidden initial state lives in CSS
 * behind `.js` (set before paint in layout.js), so this component renders its
 * children in normal flow on the server and for no-JS visitors.
 */
export default function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // Fires once the element's top clears the lower 15% of the viewport.
      // A plain `threshold: 0.15` would never fire for a block taller than
      // ~6.6 viewports, leaving it permanently hidden on short screens.
      { rootMargin: "0px 0px -15% 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}`}
      style={delay ? { "--reveal-delay": `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
