"use client";

import Image from "next/image";
import { Fragment } from "react";
import { useState } from "react";

import type { ApplicationGalleryItem } from "@/lib/application-gallery";

const visibleCount = 4;

export function ApplicationImageRail({
  images,
  title,
}: {
  images: ApplicationGalleryItem[];
  title: string;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const maxStartIndex = Math.max(0, images.length - visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;
  const visibleItems = images.slice(startIndex, startIndex + visibleCount);

  if (images.length === 0) {
    return null;
  }

  function goPrev() {
    setStartIndex((index) => Math.max(0, index - visibleCount));
  }

  function goNext() {
    setStartIndex((index) => Math.min(maxStartIndex, index + visibleCount));
  }

  return (
    <div className="applicationImageRail" aria-label={`${title} application images`}>
      {canGoPrev ? (
        <button
          type="button"
          className="applicationImageRailButton isPrev"
          onClick={goPrev}
          aria-label="Previous application images"
        >
          <span aria-hidden="true">‹</span>
        </button>
      ) : null}

      <div className="applicationImageRailViewport">
        <div className="applicationImageRailTrack">
          {visibleItems.map((item) => (
            <article key={item.title} className="applicationImageRailItem">
              <div className="applicationImageRailCopy">
                <h3 className="applicationImageRailTitle">{item.title}</h3>
                <p className="applicationImageRailDescription">{item.description}</p>
              </div>
              <div
                className={
                  item.images.length > 1
                    ? "applicationImageRailImageGroup hasMultiple"
                    : "applicationImageRailImageGroup"
                }
              >
                {item.images.map((image, index) => (
                  <Fragment key={image.src}>
                    {index > 0 ? (
                      <span
                        className="applicationImageRailArrow"
                        aria-hidden="true"
                      >
                        →
                      </span>
                    ) : null}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={420}
                      height={280}
                      sizes="(max-width: 720px) 42vw, 13vw"
                      className="applicationImageRailImage"
                    />
                  </Fragment>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      {canGoNext ? (
        <button
          type="button"
          className="applicationImageRailButton isNext"
          onClick={goNext}
          aria-label="Next application images"
        >
          <span aria-hidden="true">›</span>
        </button>
      ) : null}
    </div>
  );
}
