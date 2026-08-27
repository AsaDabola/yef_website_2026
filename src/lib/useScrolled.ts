"use client";

import { useEffect, useState } from "react";

/**
 * Whether the page has scrolled past the top.
 *
 * Both headers sit over a photograph in white, so once one is over the page's
 * own content it needs a ground of its own to stay readable. This reports
 * when that moment has come.
 */
export function useScrolled(threshold = 24): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const read = () => setScrolled(window.scrollY > threshold);
    read();
    window.addEventListener("scroll", read, { passive: true });
    return () => window.removeEventListener("scroll", read);
  }, [threshold]);

  return scrolled;
}
