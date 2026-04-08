"use client";

import { useEffect, useRef } from "react";

type StoryHighlightCardProps = {
  iconKey: "light" | "precision" | "mission";
  label: string;
  title: string;
  body: string;
};

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
      <div className="storyHighlightCardInner">
        <div className={`storyHighlightIcon is-${iconKey}`} aria-hidden="true">
          <span className="storyHighlightGlyph" />
        </div>
        <span className="storyHighlightLabel">{label}</span>
        <strong className="storyHighlightTitle">{title}</strong>
        <p className="storyHighlightBody">{body}</p>
      </div>
    </article>
  );
}
