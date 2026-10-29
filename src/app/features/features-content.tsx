"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fallback from "../../../content/features/features.json";

gsap.registerPlugin(ScrollTrigger);

type FeaturesPageData = typeof fallback;

export default function FeaturesContent({ content = fallback }: { content?: FeaturesPageData }) {
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".feature-page-hero .feature-page-eyebrow, .feature-page-hero h1, .feature-page-hero-copy, .feature-page-hero .feature-page-cta",
        { autoAlpha: 0, y: 25, filter: "blur(7px)" },
        { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.11, ease: "power3.out", delay: 0.12 },
      );
      gsap.fromTo(".feature-highlight", { autoAlpha: 0, y: 28 }, {
        autoAlpha: 1, y: 0, duration: 0.75, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-highlights", start: "top 82%", once: true },
      });
      gsap.utils.toArray<HTMLElement>(".feature-story").forEach((story) => {
        gsap.fromTo(story.querySelectorAll(".feature-story-media, .feature-story-copy > *"),
          { autoAlpha: 0, y: 32, filter: "blur(5px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out", scrollTrigger: { trigger: story, start: "top 78%", once: true } },
        );
      });
      gsap.fromTo(".feature-safeguard", { autoAlpha: 0, y: 22 }, {
        autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power2.out",
        scrollTrigger: { trigger: ".feature-safeguards", start: "top 78%", once: true },
      });
      gsap.fromTo(".feature-support > *", { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".feature-support", start: "top 82%", once: true },
      });
    }, page);
    return () => context.revert();
  }, []);

  return <section ref={pageRef} className="feature-page-content">
    <header className="feature-page-hero">
      <div className="feature-page-glow" aria-hidden="true" />
      <div className="feature-page-hero-copy">
        <p className="blog-eyebrow feature-page-eyebrow"><span /> TRAVERSE VPN <i>/</i> FEATURES</p>
        <h1>Browse privately<br /><span>and securely</span></h1>
        <p className="feature-page-copy">Traverse VPN creates an encrypted tunnel between your device and the internet, so your traffic can’t be easily read or intercepted by others on the network.</p>
        <p className="feature-page-copy feature-page-copy-secondary">Whether you are at home, on mobile data, or connected to public WiFi, Traverse VPN keeps your browsing, messages, and online activity much harder to snoop on or profile.</p>
        <ul className="feature-hero-points"><li>Browse privately and securely, even on public WiFi</li><li>Make it harder for advertisers and trackers to follow you around the internet</li><li>Reduce how much of your data can be turned into a product for ad networks and data brokers</li></ul>
        <p className="feature-page-copy feature-page-close">With Traverse VPN, you can also secure risky networks, minimize common IP and DNS leaks, and enjoy smoother, safer browsing wherever you go.</p>
        <a className="feature-page-cta" href="https://links.traversevpn.com/s/Ugp0lRJV">Explore Traverse <span aria-hidden="true">↗</span></a>
      </div>
      <div className="feature-hero-note"><span>01</span><i /> BUILT FOR EVERYDAY CONNECTIONS</div>
    </header>

    <section className="feature-highlights" aria-labelledby="feature-highlights-title">
      <div className="feature-section-heading"><p className="blog-eyebrow"><span /> AT A GLANCE</p><h2 id="feature-highlights-title">Do more with<br />Traverse VPN</h2></div>
      <div className="feature-highlight-grid">{content.highlights.map((item) => <article className="feature-highlight" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className="feature-stories" aria-label="Traverse VPN feature details">
      <div className="feature-stories-heading"><p className="blog-eyebrow"><span /> TRAVERSE VPN</p><h2>Built for long days.<br />And random late‑night scrolls.</h2><div><h3>Traverse VPN</h3><p>Your privacy hub — IP masking, encryption, and leak protection in one place.</p></div></div>
      {content.features.map((feature, index) => <article className={`feature-story${index % 2 ? " feature-story-reverse" : ""}`} key={feature.number}>
        <div className="feature-story-media"><Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span className="feature-story-image-label">{feature.imageLabel}</span><span className="feature-story-index">{feature.number} / 09</span></div>
        <div className="feature-story-copy"><p className="blog-eyebrow"><span /> {feature.tag}</p><h2>{feature.title}</h2><p className="feature-story-description">{feature.copy}</p><ul>{feature.points.map((point) => <li key={point}><span aria-hidden="true">↗</span>{point}</li>)}</ul></div>
      </article>)}
    </section>

    <section className="feature-safeguards" aria-labelledby="safeguards-title">
      <div className="feature-safeguards-heading"><p className="blog-eyebrow"><span /> THE DETAILS</p><h2 id="safeguards-title">Protection, with<br />room to make it yours.</h2><p>Traverse VPN Pro brings everyday connection protections and controls into one app.</p></div>
      <div className="feature-safeguard-grid">{content.safeguards.map((item, index) => <article className="feature-safeguard" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className="feature-support">
      <div><p className="blog-eyebrow"><span /> HERE WHEN YOU NEED US</p><h2>Support when<br />you need it</h2></div>
      <div className="feature-support-copy"><p>If something doesn’t work the way you expect, Traverse VPN provides clear, in‑app and store‑listed support channels so you can get help with setup, billing, or troubleshooting. You don’t have to guess what’s wrong or fix complex issues alone.</p><ul><li>Access to help guides and support from inside the app</li><li>Assistance with configuration, connectivity, or account questions</li><li>A smoother path from “something’s wrong” to “back to protected”</li></ul></div>
      <a href="https://traversevpn.com/support">Visit support <span aria-hidden="true">↗</span></a>
    </section>

    <section className="feature-summary"><div><p className="blog-eyebrow"><span /> ONE APP, MULTIPLE LAYERS</p><h2>Protect your internet<br />with Traverse VPN</h2></div><div className="feature-summary-list"><p>Bring everything together in one app:</p><ul><li>IP masking + strong, modern encryption</li><li>DNS and WebRTC leak protection, plus digital fingerprint defenses</li><li>Kill Switch, WiFi Protection, Auto-connect, and Split Tunneling</li><li>Unlimited bandwidth on high-speed, premium servers</li><li>A privacy-centric design with no premium data-sharing and chat that isn’t used for model training</li></ul><p>Your internet stays yours — whether you’re on your home router, campus WiFi, or that random café hotspot your friend picked.</p></div><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span aria-hidden="true">↗</span></a></section>

    <footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>One app for a more private connection—at home, at work, and along the way.</p><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get protected <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
