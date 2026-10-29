"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const categories = ["All stories", "Privacy basics", "Travel", "VPN guides"];
const stories = [
  { title: "Public Wi-Fi, explained: a calmer way to connect", excerpt: "A simple guide to what can happen on shared networks, and a few ways to make your next café session safer.", category: "Privacy basics", date: "OCT 22, 2026", read: "5 MIN READ", author: "Traverse team", image: "/images/vpn/photos/cafe-laptop.webp", alt: "Traveler working on a laptop at a café", number: "01" },
  { title: "A more private connection starts with encryption", excerpt: "What encryption does when you use a VPN, explained without the jargon.", category: "VPN guides", date: "OCT 14, 2026", read: "4 MIN READ", author: "Traverse team", image: "/images/vpn/photos/airport-work.webp", alt: "Laptop open beside an airport window", number: "02" },
  { title: "Your travel connectivity checklist", excerpt: "A few easy checks to do before you leave home, plus habits to keep while you are on the move.", category: "Travel", date: "OCT 06, 2026", read: "6 MIN READ", author: "Traverse team", image: "/images/vpn/photos/travel-desk.webp", alt: "Laptop and travel items on a hotel desk", number: "03" },
  { title: "What does a VPN actually hide?", excerpt: "Learn what a VPN can help protect, what it cannot, and how to set realistic expectations.", category: "VPN guides", date: "SEP 28, 2026", read: "5 MIN READ", author: "Traverse team", image: "/images/vpn/photos/night-phone.webp", alt: "Person checking a phone in a public place", number: "04" },
  { title: "Small privacy habits for everyday browsing", excerpt: "Practical settings and routines that help you feel more in control of your online life.", category: "Privacy basics", date: "SEP 19, 2026", read: "3 MIN READ", author: "Traverse team", image: "/images/vpn/photos/city-phone.webp", alt: "Phone user on a city street at night", number: "05" },
  { title: "Choosing a VPN server while you travel", excerpt: "A quick look at location, connection quality, and choosing a server that fits what you are doing.", category: "Travel", date: "SEP 08, 2026", read: "4 MIN READ", author: "Traverse team", image: "/images/vpn/photos/cafe-phone.webp", alt: "Phone in a bright public indoor space", number: "06" },
];

export default function BlogFeed() {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const filteredStories = useMemo(() => stories.filter((story) => {
    const matchesCategory = category === "All stories" || story.category === category;
    const searchText = `${story.title} ${story.excerpt} ${story.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query]);

  return <section className="blog-stories" id="stories" aria-labelledby="stories-title">
    <div className="blog-stories-heading">
      <div><p className="blog-eyebrow"><span /> NOTES FROM THE JOURNEY</p><h2 id="stories-title">The journal<span>.</span></h2></div>
      <p>Thoughtful reads for a safer, more open internet.</p>
    </div>
    <div className="blog-controls">
      <div className="blog-categories" role="group" aria-label="Filter stories by category">
        {categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
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
