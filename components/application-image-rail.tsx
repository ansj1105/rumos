"use client";

import Image from "next/image";
import { useState } from "react";

import type { ApplicationGalleryImage } from "@/lib/application-gallery";

const visibleCount = 4;

export function ApplicationImageRail({
  images,
  title,
}: {
  images: ApplicationGalleryImage[];
  title: string;
}) {
  const [startIndex, setStartIndex] = useState(0);
  const maxStartIndex = Math.max(0, images.length - visibleCount);
  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;
  const visibleImages = images.slice(startIndex, startIndex + visibleCount);

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
          {visibleImages.map((image) => (
            <div key={image.src} className="applicationImageRailItem">
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={420}
                sizes="(max-width: 720px) 50vw, 25vw"
                className="applicationImageRailImage"
              />
            </div>
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
