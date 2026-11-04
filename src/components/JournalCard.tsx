import type { JournalEntry } from "@/content/types";
import { Frame } from "./Frame";
import { formatDate } from "@/lib/frame";

export function JournalCard({ entry }: { entry: JournalEntry }) {
  return (
    <article className="group">
      <div className="relative overflow-hidden">
        <Frame media={entry.media} className="aspect-[16/10] w-full" sizes="(min-width:768px) 50vw, 100vw" />
        <span className="label absolute top-3 left-3 bg-bg/70 px-2 py-1 text-accent backdrop-blur">{entry.tag}</span>
      </div>
      <p className="label mt-4 text-muted">
        <time dateTime={entry.date}>{formatDate(entry.date)}</time>
        {entry.demo && <span> · Entrada de ejemplo</span>}
      </p>
      <h3 className="display mt-2 text-2xl leading-none transition-colors group-hover:text-accent md:text-3xl">{entry.title}</h3>
      <p className="mt-3 text-muted">{entry.excerpt}</p>
    </article>
  );
}
