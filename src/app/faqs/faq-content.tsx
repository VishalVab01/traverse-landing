"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = ["About Traverse", "Basics", "Privacy & Security", "Streaming & Netflix", "Gaming & Speed", "Legal", "Free VPN Vs Paid", "Setup & Devices", "Billing & Support"];
const questions: [string,string,string][] = [
  ["About Traverse", "What is Traverse VPN?", "Traverse VPN is a fast and unlimited VPN app built to protect your privacy with strong encryption, leak protection, and simple one‑tap connection on your devices."],
  ["About Traverse", "How is Traverse VPN different from other VPNs?", "Traverse VPN combines triple‑layer encryption, privacy‑focused AI chat, link‑scam scanning, and VPN leak protection in one app, so you get security, privacy, and usability together instead of just a basic VPN tunnel."],
  ["Privacy & Security", "Does Traverse VPN have a no‑logs policy?", "Traverse VPN is designed as a strict no‑logs VPN, meaning we do not record your VPN browsing activity or VPN traffic content that could be used to build a profile of what you do online. Review the current privacy policy for details."],
  ["Setup & Devices", "Which platforms and devices does Traverse VPN support?", "Traverse VPN is available on iPhone, iPad, Mac with Apple silicon, and other Apple devices running recent versions of iOS, iPadOS, macOS, and visionOS. Check the current app listings for supported devices and versions."],
  ["Basics", "Is there any data cap or bandwidth limit with Traverse VPN?", "Traverse VPN is marketed as Fast & Unlimited, meaning there is no fixed cap on data transfer or bandwidth inside the app's normal usage limits."],
  ["Privacy & Security", "What extra privacy features does Traverse VPN include?", "Traverse VPN includes privacy‑leak protection (DNS, WebRTC, and IP leak safeguards), digital fingerprint protection against trackers, and an AI chat that is designed not to be used for training the model, giving you an extra layer of privacy inside the app."],
  ["Privacy & Security", "Can Traverse VPN help me spot scams and unsafe links?", "Yes. The app can scan links for scams and suspicious content, helping you avoid phishing or malicious pages before you open them."],
  ["Billing & Support", "Does Traverse VPN include 24/7 support?", "For help with setup, billing, or troubleshooting, use the support channels listed in the app or on the official support page."],
  ["Free VPN Vs Paid", "Is Traverse VPN free or paid?", "Traverse VPN can be downloaded for free and offers in‑app purchases for premium plans (weekly, monthly, and yearly) so users can upgrade for full access and features."],
  ["About Traverse", "Who is behind Traverse VPN?", "Traverse VPN is developed and published by WEB 3 TASK PRIVATE LIMITED, as listed on the official app store pages."],
  ["Basics", "What does a VPN do?", "A VPN (Virtual Private Network) creates a secure, encrypted tunnel between your device and the internet. This hides your IP address, helps keep your identity private, and protects your data from eavesdropping."],
  ["Streaming & Netflix", "Can I use Traverse VPN for streaming?", "A VPN can help protect your connection while streaming. Access to specific platforms and catalogues varies by region and service, so check the platform's current terms and availability."],
  ["Gaming & Speed", "Will a VPN slow down my connection?", "Connection speed depends on your network, device, server location, and the service you are using. Connecting to a nearby server may help reduce added latency."],
  ["Legal", "Is it legal to use a VPN?", "VPN rules vary by country and use case. Check local laws and the terms of services you access while travelling or browsing."],
  ["Setup & Devices", "How do I install Traverse VPN?", "Download Traverse VPN from the official app listing for your device, open the app, and follow the on-screen setup steps to connect."],
  ["Billing & Support", "How much does Traverse VPN cost?", "Traverse VPN offers weekly, monthly, and yearly plans. Review the current prices and renewal terms in the app or on the plans page before subscribing."],
];

export default function FaqContent() {
  const rootRef = useRef<HTMLElement>(null);
  const [category, setCategory] = useState("About Traverse");
  const [open, setOpen] = useState(0);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => questions.filter(([group,question,answer]) => (group === category || search.trim()) && `${question} ${answer} ${group}`.toLowerCase().includes(search.trim().toLowerCase())), [category,search]);

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
    <section className="faq-content" aria-label="Frequently asked questions"><aside className="faq-sidebar"><p className="blog-eyebrow"><span/> BROWSE TOPICS</p><div className="faq-category-list">{categories.map((item,index)=><button key={item} className={`faq-category${category===item?" active":""}`} type="button" aria-pressed={category===item} onClick={()=>{setCategory(item);setOpen(0);setSearch("")}}><span>{String(index+1).padStart(2,"0")}</span>{item}<b aria-hidden="true">↗</b></button>)}</div><div className="faq-sidebar-cta"><strong>Still have questions?</strong><p>Our support team can help point you in the right direction.</p><a href="https://traversevpn.com/support">Visit support <span aria-hidden="true">↗</span></a></div></aside>
      <div className="faq-main"><div className="faq-main-heading"><div><p className="blog-eyebrow"><span/> {category.toUpperCase()}</p><h2>{category}</h2></div><label><span className="sr-only">Search questions</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input placeholder="Search questions" value={search} onChange={(event)=>{setSearch(event.target.value);setOpen(0)}}/></label></div><div className="faq-question-list" aria-live="polite">{filtered.map(([,question,answer],index)=><article className={`faq-question-item${open===index?" expanded":""}`} key={question}><button type="button" aria-expanded={open===index} onClick={()=>setOpen(open===index?-1:index)}><span className="faq-question-number">{String(index+1).padStart(2,"0")}</span><span>{question}</span><i aria-hidden="true">+</i></button>{open===index&&<p>{answer}</p>}</article>)}{filtered.length===0&&<p className="faq-no-results">No questions found. Try a different search.</p>}</div></div>
    </section>
    <section className="faq-final"><p className="blog-eyebrow"><span/> READY WHEN YOU ARE</p><h2>Protect your privacy<br/><span>in seconds.</span></h2><p>Fast, secure, and private internet access across your devices.</p><a href="https://links.traversevpn.com/s/Ugp0lRJV">Download now <span aria-hidden="true">↗</span></a></section>
    <footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>Clear answers. More confidence wherever you connect.</p><a href="https://traversevpn.com/support">Visit support <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
