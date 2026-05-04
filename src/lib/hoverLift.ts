// Shared hover-lift interaction. Spread {...hoverLift} onto any clickable
// element (card, pill, CTA) to get the standard translateY(-3px) + shadow
// transition. Pair with `style={{ transition: HOVER_LIFT_TRANSITION }}` (or
// add the transition to your own inline style) for the smooth ease.
//
// Resting shadow matches the social-cluster button shadow so every clickable
// surface has the same baseline depth across the site.

import type { MouseEvent } from "react";

export const HOVER_LIFT_REST_SHADOW = "0 1px 6px rgba(0,0,0,0.10)";
export const HOVER_LIFT_HOVER_SHADOW = "0 8px 24px rgba(0,0,0,0.10)";
export const HOVER_LIFT_TRANSITION = "transform 0.18s ease, box-shadow 0.18s ease";

export const hoverLift = {
  onMouseEnter: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = HOVER_LIFT_HOVER_SHADOW;
  },
  onMouseLeave: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = HOVER_LIFT_REST_SHADOW;
  },
};

// Variant for elements that should LIFT on hover but keep no resting shadow
// (e.g. transparent pills). Reverts to "none" on leave.
export const hoverLiftNoRest = {
  onMouseEnter: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(-3px)";
    e.currentTarget.style.boxShadow = HOVER_LIFT_HOVER_SHADOW;
  },
  onMouseLeave: (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "none";
  },
};
