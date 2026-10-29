"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/faqs/faqs.json";

gsap.registerPlugin(ScrollTrigger);

export default function FaqContent({ content = fallback }: { content?: typeof fallback }) {
  const rootRef = useRef<HTMLElement>(null);
  const [category, setCategory] = useState(content.categories[0] ?? "About Traverse");
  const [open, setOpen] = useState(0);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => content.questions.filter(({category: group,question,answer}) => (group === category || search.trim()) && `${question} ${answer} ${group}`.toLowerCase().includes(search.trim().toLowerCase())), [category,search,content]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".faq-hero .blog-eyebrow,.faq-hero h1,.faq-hero-copy,.faq-hero>a", { autoAlpha: 0, y: 22, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .8, stagger: .1, ease: "power3.out" });
      gsap.fromTo(".faq-category,.faq-question-item", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .55, stagger: .04, ease: "power2.out", scrollTrigger: { trigger: ".faq-content", start: "top 84%", once: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return <section className="faq-page-content" ref={rootRef}>
    <header className="faq-hero"><div className="faq-hero-orbit" aria-hidden="true"/><p className="blog-eyebrow"><span/> TRAVERSE VPN <i>/</i> FAQS</p><h1>Everything about VPN privacy,<br/><span>security, streaming &amp; speed.</span></h1><p className="faq-hero-copy">Learn about online privacy, streaming, internet security, and safe browsing with Traverse VPN. Find answers about Netflix, gaming, public WiFi, VPN speed, encryption, and more.</p><a href="/plans">Get protected with Traverse <span aria-hidden="true">↗</span></a></header>
    <section className="faq-content" aria-label="Frequently asked questions"><aside className="faq-sidebar"><p className="blog-eyebrow"><span/> BROWSE TOPICS</p><div className="faq-category-list">{content.categories.map((item,index)=><button key={item} className={`faq-category${category===item?" active":""}`} type="button" aria-pressed={category===item} onClick={()=>{setCategory(item);setOpen(0);setSearch("")}}><span>{String(index+1).padStart(2,"0")}</span>{item}<b aria-hidden="true">↗</b></button>)}</div><div className="faq-sidebar-cta"><strong>Still have questions?</strong><p>Our support team can help point you in the right direction.</p><a href="https://traversevpn.com/support">Visit support <span aria-hidden="true">↗</span></a></div></aside>
      <div className="faq-main"><div className="faq-main-heading"><div><p className="blog-eyebrow"><span/> {category.toUpperCase()}</p><h2>{category}</h2></div><label><span className="sr-only">Search questions</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input placeholder="Search questions" value={search} onChange={(event)=>{setSearch(event.target.value);setOpen(0)}}/></label></div><div className="faq-question-list" aria-live="polite">{filtered.map(({question,answer},index)=><article className={`faq-question-item${open===index?" expanded":""}`} key={question}><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?-1:index)}><span className="faq-question-number">{String(index+1).padStart(2,"0")}</span><span>{question}</span><i aria-hidden="true">+</i></button>{open===index&&<p>{answer}</p>}</article>)}{filtered.length===0&&<p className="faq-no-results">No questions found. Try a different search.</p>}</div></div>
    </section>
    <section className="faq-final"><p className="blog-eyebrow"><span/> READY WHEN YOU ARE</p><h2>Protect your privacy<br/><span>in seconds.</span></h2><p>Fast, secure, and private internet access across your devices.</p><a href="https://links.traversevpn.com/s/Ugp0lRJV">Download now <span aria-hidden="true">↗</span></a></section>
    <footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>Clear answers. More confidence wherever you connect.</p><a href="https://traversevpn.com/support">Visit support <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
