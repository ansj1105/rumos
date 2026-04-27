"use client";

type StoryHighlightCardProps = {
  iconKey: "vision" | "goal";
  label: string;
  title: string;
  body: string;
};

export function StoryHighlightCard({
  label,
  title,
  body,
}: StoryHighlightCardProps) {
  return (
    <article className="storyHighlightCard">
      <div className="storyHighlightCardInner">
        <div className="storyHighlightCopy">
          <span className="storyHighlightLabel">{label}</span>
          <strong className="storyHighlightTitle">{title}</strong>
          {body ? <p className="storyHighlightBody">{body}</p> : null}
        </div>
      </div>
    </article>
  );
}
