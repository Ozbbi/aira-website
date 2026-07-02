"use client";
/* ShinyText — a shimmering gradient sweep across text, in the style of
   reactbits.dev's ShinyText (CSS background-clip technique). Pure CSS, no deps. */
import type { CSSProperties } from "react";

type ShinyTextProps = {
  text: string;
  speed?: number; // seconds per sweep
  className?: string;
  style?: CSSProperties;
  base?: string; // resting text color
  shine?: string; // moving highlight color
};

export default function ShinyText({ text, speed = 4, className, style, base = "rgba(255,255,255,0.55)", shine = "#ffffff" }: ShinyTextProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        color: base,
        backgroundImage: `linear-gradient(110deg, transparent 35%, ${shine} 50%, transparent 65%)`,
        backgroundSize: "220% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shinyMove ${speed}s linear infinite`,
        ...style,
      }}
    >
      {text}
    </span>
  );
}
