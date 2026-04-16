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
        <path d="M10 32s8-14 22-14 22 14 22 14-8 14-22 14S10 32 10 32Z" className="storyHighlightSvgLine" />
        <circle cx="32" cy="32" r="8" className="storyHighlightSvgLine" />
        <circle cx="32" cy="32" r="3" className="storyHighlightSvgCore" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 64 64" className="storyHighlightSvg" aria-hidden="true">
      <circle cx="32" cy="32" r="18" className="storyHighlightSvgLine" />
      <circle cx="32" cy="32" r="10" className="storyHighlightSvgLine" />
      <path d="M32 14v8M32 42v8M14 32h8M42 32h8" className="storyHighlightSvgLine" />
      <path
        d="M32 27.5a4.5 4.5 0 1 1 0 9a4.5 4.5 0 0 1 0-9Z"
        className="storyHighlightSvgCore"
      />
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
