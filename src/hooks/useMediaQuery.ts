import { useEffect, useState } from "react";

export const BP = {
  mobile: 640,   // < 640 = phone
  tablet: 1024,  // 640-1023 = tablet
} as const;

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMatches(mql.matches);
    handler();
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

/** True for phone-sized viewports (< 640px). */
export const useIsMobile = () => useMediaQuery(`(max-width: ${BP.mobile - 1}px)`);
/** True for tablet-and-below viewports (< 1024px). */
export const useIsTablet = () => useMediaQuery(`(max-width: ${BP.tablet - 1}px)`);
