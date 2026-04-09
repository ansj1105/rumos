"use client";

import { useState } from "react";

type PatentCardItem = {
  type: string;
  title: string;
  summary: string;
  date: string;
  href?: string;
};

type PatentSectionProps = {
  title: string;
  lead: string;
  moreLabel: string;
  moreHref: string;
  cards: PatentCardItem[];
};

export function PatentSection({
  title,
  lead,
  moreLabel,
  moreHref,
  cards,
}: PatentSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="patentSection">
      <div className="container patentInner">
        <div className="patentHead">
          <div>
            <h2 className="sectionTitle patentTitle">{title}</h2>
            <p className="sectionLead patentLead">{lead}</p>
          </div>
          <a className="patentMoreLink" href={moreHref}>
            {moreLabel}
          </a>
        </div>

        <div className="patentGrid">
          {cards.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <a
                key={`${item.type}-${item.title}`}
                href={item.href ?? moreHref}
                className={`patentCard ${isActive ? "isAccent" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
              >
                <span className="patentCardType">{item.type}</span>
                <h3 className="patentCardTitle">{item.title}</h3>
                <p className="patentCardSummary">{item.summary}</p>
                <div className="patentCardFoot">
                  <span className="patentCardDate">{item.date}</span>
                  <span className="patentCardIcon" aria-hidden="true" />
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
