"use client";

import { useEffect, useRef } from "react";

import { StoryHighlightCard } from "@/components/story-highlight-card";

export type StoryHighlightItem = {
  key: "vision" | "goal";
  label: string;
  title: string;
  body: string;
};

export function HomeStorySection({
  brandOriginTitle,
  storyDisplayLines,
  storyParagraphs,
  storyFontSize,
  storyMilestone,
  storyHighlights,
}: {
  brandOriginTitle: string;
  storyDisplayLines: [string, string] | string[];
  storyParagraphs: string[];
  storyFontSize?: number | null;
  storyMilestone: string;
  storyHighlights: StoryHighlightItem[];
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
      return;
    }

    const revealTargets = Array.from(sectionElement.querySelectorAll<HTMLElement>(".storyReveal"));

    if (revealTargets.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("isRevealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealTargets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="storySection" className="storySection">
      <div className="container storyInner">
        <div className="storyLeadBlock storyReveal" style={{ ["--story-reveal-delay" as string]: "0ms" }}>
          <h2 className="storyDisplayTitle">
            <span className="storyDisplayTitleLine">{storyDisplayLines[0]}</span>
            <span className="storyDisplayTitleLine storyDisplayTitleLineAccent">
              {storyDisplayLines[1]}
            </span>
          </h2>
        </div>
        <div className="storyContent storyReveal" style={{ ["--story-reveal-delay" as string]: "120ms" }}>
          <span className="storyEyebrow">{brandOriginTitle}</span>
          <div className="storyParagraphs">
            {storyParagraphs.map((paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="storyParagraph"
                style={storyFontSize ? { fontSize: `${storyFontSize * 0.7}px` } : undefined}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className="storyBand storyReveal" style={{ ["--story-reveal-delay" as string]: "220ms" }}>
          <div className="storyMilestone">
            <span>{storyMilestone}</span>
          </div>
          <div className="storyHighlightGrid">
            {storyHighlights.map((item) => (
              <StoryHighlightCard
                key={item.key}
                iconKey={item.key}
                label={item.label}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
