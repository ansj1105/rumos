"use client";

import { useEffect, useRef } from "react";

type StoryHighlightCardProps = {
  iconKey: "light" | "precision" | "mission";
  label: string;
  title: string;
  body: string;
};

function StoryHighlightSvg({ iconKey }: { iconKey: StoryHighlightCardProps["iconKey"] }) {
  if (iconKey === "light") {
    return (
      <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
        <circle cx="32" cy="32" r="11" className="storyHighlightSvgCore" />
        <path
          d="M32 8v9M32 47v9M8 32h9M47 32h9M15 15l6.5 6.5M42.5 42.5L49 49M49 15l-6.5 6.5M15 49l6.5-6.5"
          className="storyHighlightSvgLine"
        />
      </svg>
    );
  }

  if (iconKey === "precision") {
    return (
      <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
        <circle cx="32" cy="32" r="18" className="storyHighlightSvgLine" />
        <circle cx="32" cy="32" r="8" className="storyHighlightSvgLine" />
        <circle cx="32" cy="32" r="2.5" className="storyHighlightSvgCore" />
        <path d="M32 10v8M32 46v8M10 32h8M46 32h8" className="storyHighlightSvgLine" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
      <path d="M32 12v40" className="storyHighlightSvgLine" />
      <path d="M22 22h20" className="storyHighlightSvgLine" />
      <path d="M18 48h28" className="storyHighlightSvgLine" />
      <path d="M32 12l11 11-11 11-11-11 11-11Z" className="storyHighlightSvgLine" />
      <circle cx="32" cy="48" r="4" className="storyHighlightSvgCore" />
    </svg>
  );
}

export function StoryHighlightCard({
  iconKey,
  label,
  title,
  body,
}: StoryHighlightCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;

    if (!container || !overlay) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 12;
      const rotateX = (0.5 - (y / rect.height)) * 10;
      const backgroundX = (x / rect.width) * 100;
      const backgroundY = (y / rect.height) * 100;

      container.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      overlay.style.opacity = "1";
      overlay.style.backgroundPosition = `${backgroundX}% ${backgroundY}%`;
    };

    const handleMouseLeave = () => {
      container.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
      overlay.style.opacity = "0";
      overlay.style.backgroundPosition = "100% 100%";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <article
      ref={containerRef}
      className="storyHighlightCard"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div ref={overlayRef} className="storyHighlightGlow" aria-hidden="true" />
      <div className={`storyHighlightCardInner ${iconKey === "mission" ? "isTextOnly" : ""}`}>
        {iconKey !== "mission" ? (
          <div className={`storyHighlightIcon is-${iconKey}`} aria-hidden="true">
            <StoryHighlightSvg iconKey={iconKey} />
          </div>
        ) : null}
        <span className="storyHighlightLabel">{label}</span>
        <strong className="storyHighlightTitle">{title}</strong>
        <p className="storyHighlightBody">{body}</p>
      </div>
    </article>
  );
}
