import type { JournalEntry } from "@/content/types";
import { Frame } from "./Frame";
import { formatDate } from "@/lib/frame";

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <article className="glass group h-full p-3">
      <div className="relative overflow-hidden rounded-[0.9rem]">
        <Frame media={entry.media} className="aspect-[16/10] w-full" sizes="(min-width:768px) 50vw, 100vw" />
        <span className="on-dark label absolute top-3 left-3 rounded-full border border-line-strong bg-bg/60 px-3 py-1 text-accent backdrop-blur">{entry.tag}</span>
      </div>
      <p className="label mt-4 px-2 text-muted">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        {entry.demo && <span> · Entrada de ejemplo</span>}
      </p>
      <h3 className="display mt-2 px-2 text-2xl leading-none transition-colors group-hover:text-accent md:text-3xl">{entry.title}</h3>
      <p className="mt-3 px-2 pb-2 text-muted">{entry.excerpt}</p>
    </article>
  );
}
