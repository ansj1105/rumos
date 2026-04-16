"use client";

import { useEffect, useRef } from "react";

type StoryHighlightCardProps = {
  iconKey: "vision" | "goal";
  label: string;
  title: string;
  body: string;
};

function StoryHighlightSvg({ iconKey }: { iconKey: StoryHighlightCardProps["iconKey"] }) {
  if (iconKey === "vision") {
    return (
      <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
        <path
          d="M22 36c-2.6-2.4-4-5.8-4-9.6 0-7.7 6.3-14 14-14s14 6.3 14 14c0 3.8-1.4 7.2-4 9.6-1.8 1.7-2.8 3.2-3.2 4.8H25.2c-.4-1.6-1.4-3.1-3.2-4.8Z"
          className="storyHighlightSvgLine"
        />
        <path d="M26 45h12M27.5 50h9" className="storyHighlightSvgLine" />
        <path d="M28 23.5c1.1-1.7 2.8-2.7 5-3" className="storyHighlightSvgLine" />
        <circle cx="32" cy="42" r="2.4" className="storyHighlightSvgCore" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
      <circle cx="32" cy="32" r="18" className="storyHighlightSvgLine" />
      <circle cx="32" cy="32" r="10" className="storyHighlightSvgLine" />
      <circle cx="32" cy="32" r="3.5" className="storyHighlightSvgCore" />
      <path d="M15 49l15-15" className="storyHighlightSvgLine" />
      <path d="M28 22l12-2-2 12" className="storyHighlightSvgLine" />
      <path d="M34 26l11-11" className="storyHighlightSvgLine" />
      <path d="M45 15l4 4" className="storyHighlightSvgLine" />
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
      const rotateY = ((x / rect.width) - 0.5) * 8;
      const rotateX = (0.5 - (y / rect.height)) * 6;
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
      <div className="storyHighlightCardInner">
        <div className={`storyHighlightIcon is-${iconKey}`} aria-hidden="true">
          <StoryHighlightSvg iconKey={iconKey} />
        </div>
        <div className="storyHighlightCopy">
          <span className="storyHighlightLabel">{label}</span>
          <strong className="storyHighlightTitle">{title}</strong>
          <p className="storyHighlightBody">{body}</p>
        </div>
      </div>
    </article>
  );
}
