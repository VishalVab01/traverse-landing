"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import fallback from "../../../content/blog/blog.json";

export default function BlogFeed({ content = fallback }: { content?: typeof fallback }) {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const filteredStories = useMemo(() => content.stories.filter((story) => {
    const matchesCategory = category === "All stories" || story.category === category;
    const searchText = `${story.title} ${story.excerpt} ${story.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query, content]);

  return <section className="blog-stories" id="stories" aria-labelledby="stories-title">
    <div className="blog-stories-heading">
      <div><p className="blog-eyebrow"><span /> NOTES FROM THE JOURNEY</p><h2 id="stories-title">The journal<span>.</span></h2></div>
      <p>Thoughtful reads for a safer, more open internet.</p>
    </div>
    <div className="blog-controls">
      <div className="blog-categories" role="group" aria-label="Filter stories by category">
        {content.categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className="blog-search"><span className="sr-only">Search stories</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" /></label>
    </div>
    <div className="blog-card-grid" aria-live="polite">
      {filteredStories.map((story) => <article className="blog-card" key={story.number}>
        <div className="blog-card-image"><Image src={story.image} alt={story.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" /><span>{story.number}</span><span className="blog-card-image-arrow" aria-hidden="true">↗</span></div>
        <div className="blog-card-meta"><span>{story.date}</span><span>{story.read}</span></div>
        <p className="blog-card-category">{story.category}</p>
        <h3>{story.title}</h3>
        <p className="blog-card-excerpt">{story.excerpt}</p>
        <div className="blog-card-author"><span className="blog-author-avatar">T</span><span>{story.author}</span><span className="blog-card-read">Read story <b aria-hidden="true">↗</b></span></div>
      </article>)}
      {filteredStories.length === 0 && <p className="blog-empty">No stories match that search. Try another phrase or category.</p>}
    </div>
  </section>;
}
