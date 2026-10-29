"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PlatformPageData } from "./platform-data";
import fallback from "../../../content/download/download.json";

gsap.registerPlugin(ScrollTrigger);

export default function PlatformDownloadContent({ platform, content = fallback }: { platform: PlatformPageData | null; content?: typeof fallback }) {
  const rootRef = useRef<HTMLElement>(null);
  const isAllApps = !platform;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".platform-hero .blog-eyebrow,.platform-hero h1,.platform-hero-copy,.platform-hero-actions,.platform-hero-art", { autoAlpha: 0, y: 25, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .85, stagger: .1, ease: "power3.out" });
      [".platform-highlights", ".platform-how", ".platform-details", ".platform-compat", ".platform-all-grid"].forEach((selector) => {
        const section = root.querySelector(selector);
        const items = section?.querySelectorAll(".platform-reveal");
        if (!section || !items?.length) return;
        gsap.fromTo(items, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .68, stagger: .07, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  if (isAllApps) return <section className="platform-page-content" ref={rootRef}>
    <header className="platform-hero platform-all-hero"><div className="platform-hero-glow" aria-hidden="true"/><div className="platform-hero-copy"><p className="blog-eyebrow"><span/> TRAVERSE VPN <i>/</i> DOWNLOAD</p><h1>One account.<br/><span>Everywhere you connect.</span></h1><p>Traverse VPN is built for everyday users who want straightforward privacy online. Pick your platform, install the app, and use the same account across your supported devices.</p><div className="platform-hero-actions"><a className="platform-primary-cta" href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse <span aria-hidden="true">↗</span></a><a className="platform-secondary-cta" href="/plans">View plans</a></div></div><div className="platform-hero-art platform-all-art"><div className="platform-art-top"><span>TRAVERSE VPN</span><i>CONNECTED</i></div><div className="platform-art-orbit"><div className="platform-art-shield">T<span>✓</span></div><b>Protected</b><small>Choose a device to get started</small></div><div className="platform-art-bottom"><span>PRIVATE CONNECTION</span><b>● &nbsp; ACTIVE</b></div></div><div className="platform-hero-index"><span>01</span><i/> AVAILABLE ACROSS YOUR DEVICES</div></header>
    <section className="platform-all-grid" aria-labelledby="platform-all-title"><div className="platform-section-heading platform-reveal"><p className="blog-eyebrow"><span/> FIND YOUR APP</p><h2 id="platform-all-title">Download Traverse<br/>for your device.</h2><p>Choose a platform to see the app details, setup steps, and compatibility information.</p></div><div className="platform-app-grid">{content.platforms.map((item,index)=><a className="platform-app-card platform-reveal" href={item.href} key={item.key}><span className="platform-app-number">0{index+1} / {item.family.toUpperCase()}</span><div className={`platform-app-icon icon-${item.key}`} aria-hidden="true">{item.key === "windows" ? "⊞" : item.key === "macos" ? "●" : item.key === "linux" ? "◈" : item.key === "android" ? "●" : ""}</div><h3>{item.name}</h3><p>{item.note}</p><span className="platform-app-arrow" aria-hidden="true">↗</span></a>)}</div></section>
    <section className="platform-how platform-all-how"><div className="platform-section-heading platform-reveal"><p className="blog-eyebrow"><span/> GET CONNECTED</p><h2>Three quick steps.<br/>A better routine.</h2></div><div className="platform-steps">{content.steps.map((step,index)=><article className="platform-step platform-reveal" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>
    <section className="platform-final"><p className="blog-eyebrow"><span/> YOUR CONNECTION, YOUR CHOICE</p><h2>Privacy that fits<br/><span>your everyday.</span></h2><p>Find the right app, choose your plan, and connect with confidence.</p><a href="/plans">Explore plans <span aria-hidden="true">↗</span></a></section><footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>Find the right app for the way you connect.</p><a href="/faqs">Visit FAQs <span aria-hidden="true">↗</span></a></footer>
  </section>;

  return <section className="platform-page-content" ref={rootRef}>
    <header className="platform-hero"><div className="platform-hero-glow" aria-hidden="true"/><div className="platform-hero-copy"><p className="blog-eyebrow"><span/> TRAVERSE VPN <i>/</i> {platform.name.toUpperCase()}</p><h1>{platform.title}</h1><p>{platform.lead}</p><div className="platform-hero-actions"><a className="platform-primary-cta" href="https://links.traversevpn.com/s/Ugp0lRJV">Download for {platform.name} <span aria-hidden="true">↗</span></a><a className="platform-secondary-cta" href="/plans">View plans</a></div></div><div className="platform-hero-art"><Image src={platform.image} alt={platform.imageAlt} fill priority sizes="(max-width: 800px) 90vw, 40vw"/><div className="platform-connection-card"><span className="platform-connection-dot"/><span><b>Traverse VPN</b><small>Connection protected</small></span><i aria-hidden="true">✓</i></div><span className="platform-art-caption">{platform.name.toUpperCase()} / PRIVATE CONNECTION</span></div><div className="platform-hero-index"><span>01</span><i/> {platform.family.toUpperCase()} APP</div></header>

    <section className="platform-intro"><p className="blog-eyebrow platform-reveal"><span/> A VPN, IN EVERYDAY TERMS</p><h2 className="platform-reveal">What is a VPN for<br/>{platform.name}?</h2><p className="platform-intro-copy platform-reveal">{platform.description}</p><div className="platform-highlight-list">{platform.highlights.map((item,index)=><article className="platform-highlight platform-reveal" key={item.title}><span>0{index+1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div><b aria-hidden="true">↗</b></article>)}</div></section>

    <section className="platform-how"><div className="platform-section-heading platform-reveal"><p className="blog-eyebrow"><span/> GETTING STARTED</p><h2>Three steps to<br/>get connected.</h2><p>Getting set up on {platform.name} is straightforward.</p></div><div className="platform-steps">{platform.steps.map((step,index)=><article className="platform-step platform-reveal" key={step.title}><span>0{index+1}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section>

    <section className="platform-details"><div className="platform-section-heading platform-reveal"><p className="blog-eyebrow"><span/> WHY TRAVERSE</p><h2>{platform.detailsTitle}</h2><p>{platform.name} tools for everyday privacy, with room to adjust your connection.</p></div><div className="platform-detail-grid">{platform.details.map((item,index)=><article className="platform-detail platform-reveal" key={item.title}><span>0{index+1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>

    <section className="platform-compat"><div className="platform-section-heading platform-reveal"><p className="blog-eyebrow"><span/> CHECK YOUR SETUP</p><h2>Compatibility<br/>and details.</h2><p>{platform.note}</p></div><ul className="platform-compat-list">{platform.compatibility.map((item,index)=><li className="platform-reveal" key={item}><span>0{index+1}</span>{item}<b aria-hidden="true">✓</b></li>)}</ul></section>

    <section className="platform-final"><p className="blog-eyebrow"><span/> READY WHEN YOU ARE</p><h2>Connect with<br/><span>more confidence.</span></h2><p>Choose your plan, install Traverse VPN for {platform.name}, and get connected.</p><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span aria-hidden="true">↗</span></a></section><footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>{platform.name} app · {platform.note}</p><a href="/download">All apps <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
