"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeatureSection } from "./core-features";

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { name: "Weekly Plan", price: "$1.49", interval: "/week", summary: "Perfect for short trips & quick security", savings: "", features: ["Costs $6 monthly", "Billed every week", "All premium features included"], cta: "Get Weekly" },
  { name: "Monthly Plan", price: "$3.99", interval: "/month", summary: "Flexible, month to month privacy", savings: "Save 33%", features: ["Save 33% compared to weekly billing", "Billed every month", "All premium features included"], cta: "Get Monthly" },
  { name: "Yearly Plan", price: "$1.99", interval: "/month", summary: "Maximum savings for year-round security", savings: "Save 67%", features: ["Billed $23.88 Upfront", "Save 50% vs the monthly plan", "Save 67% vs the weekly plan"], cta: "Get Yearly", popular: true },
];

const addOns = [
  ["Military Grade Encryption", "AES-256 bit encryption ensures your private data is unreadable to hackers and ISPs"],
  ["Strict No-Logs Policy", "What you do online is your business. We do not track, collect, or share your browsing history."],
  ["Unlimited Bandwidth", "No data caps. Stream, game, and browse as much as you want without any speed throttling"],
  ["Ad & Tracker Blocker", "Browse cleanly. Traverse VPN automatically blocks annoying ads and malicious trackers before they load"],
  ["Anti Malware Protection", "Automatically blocks access to known malicious websites and phishing links."],
];
const testimonials = [
  ["@TraverseVPN is completely ad-free, has a strict no-logs policy, and delivers amazing speeds. Highly recommending it to anyone looking for an extremely secure and private VPN.", "@Liam_TechSec (London, UK)"],
  ["Traverse VPN has genuinely earned my trust. It has never been more important to freely, privately, and securely access the internet than now. Set up was an absolute breeze.", "@SarahJ_88 (Toronto, Canada)"],
  ["Wanted to thank you for the outstanding service. I have used many VPN services over the years, but the speed and reliability of the Traverse VPN app surprised me instantly. It's World Class.", "@Mark_DevOps (Austin, USA)"],
];
const faqItems = [
  ["Can I try Traverse VPN for free?", "Traverse VPN is a 100% premium service, so we do not offer a free plan. Free VPNs often sell your data or restrict your speeds. Instead, we invest in high-speed servers and military-grade encryption to guarantee your privacy."],
  ["How much does Traverse VPN cost?", "Weekly access is $1.49 per week, monthly access is $3.99 per month, and the yearly plan is $1.99 per month billed at $23.88 upfront."],
  ["Can I get a VPN for just a month?", "Yes. The Monthly Plan gives you flexible month-to-month privacy without a long-term commitment."],
  ["Which Traverse VPN plan has the best value for money?", "The Yearly Plan offers the maximum savings for year-round security, while the Weekly Plan is designed for short trips and quick protection."],
  ["Why should I pay for a Traverse VPN subscription instead of using a free app?", "Free VPNs often sell browsing data or restrict speed. A premium plan supports high-speed servers, strong encryption, and a more reliable private connection."],
  ["How do I buy a Traverse VPN subscription?", "Choose a plan above and follow the secure checkout flow to get started."],
  ["What payment methods do you accept?", "Payment options are shown during checkout and may vary by platform or region."],
  ["Can I switch or upgrade my plan whenever I want to?", "Plan changes depend on where your subscription was purchased. Use the account or store controls available on your device."],
  ["What if I change my mind and want to cancel?", "You can manage cancellation through the store or account where you subscribed. Review the current refund policy for details."],
];

export default function PlansContent() {
  const pageRef = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const page = pageRef.current;
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      gsap.fromTo(".plans-hero .blog-eyebrow, .plans-hero h1, .plans-hero > p, .plans-hero .plans-hero-subcopy", { autoAlpha: 0, y: 24, filter: "blur(7px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .85, stagger: .1, ease: "power3.out" });
      gsap.fromTo(".plan-card", { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: .8, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: ".plans-grid", start: "top 80%", once: true } });
      [".plans-core", ".plans-addons", ".plans-enterprise", ".plans-testimonials", ".plans-faq", ".plans-final-cta"].forEach((selector) => {
        const section = page.querySelector(selector);
        const items = section?.querySelectorAll(".plans-reveal");
        if (!section || !items?.length) return;
        gsap.fromTo(items, { autoAlpha: 0, y: 25, filter: "blur(5px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .75, stagger: .08, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 80%", once: true } });
      });
    }, page);
    return () => context.revert();
  }, []);

  return <section ref={pageRef} className="plans-page-content">
    <header className="plans-hero">
      <div className="plans-hero-orbit" aria-hidden="true" />
      <p className="blog-eyebrow"><span /> TRAVERSE VPN <i>/</i> PLANS</p>
      <h1>Premium security.<br /><span>Unbeatable speeds.</span><br />Choose your plan.</h1>
      <p className="plans-hero-subcopy">Choose the best Traverse VPN plan. Get military-grade encryption, 10 global high-speed servers, split tunnelling, and a strict no-logs policy. No hidden fees</p>
      <p className="plans-hero-note">Whether you need privacy for a month or year-round, we have a plan designed for you. No data caps, no ads—just pure, secure internet.</p>
    </header>

    <section className="plans-pricing" aria-labelledby="pricing-title">
      <div className="plans-section-label"><span>01</span><i /> CHOOSE YOUR COVERAGE</div>
      <div className="plans-grid">{plans.map((plan) => <article className={`plan-card${plan.popular ? " plan-card-popular" : ""}`} key={plan.name}>{plan.savings && <span className="plan-savings">{plan.savings}</span>}{plan.popular && <span className="plan-popular">Most Popular</span>}<p className="plan-name">{plan.name}</p><div className="plan-price"><strong>{plan.price}</strong><span>{plan.interval}</span></div><p className="plan-summary">{plan.summary}</p><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a href="https://links.traversevpn.com/s/Ugp0lRJV">{plan.cta}<span aria-hidden="true">↗</span></a></article>)}</div>
    </section>

    <FeatureSection />

    <section className="plans-addons" aria-labelledby="addons-title"><div className="plans-addons-heading plans-reveal"><p className="blog-eyebrow"><span /> INCLUDED IN ALL PLANS</p><h2 id="addons-title">Premium security<br />add-ons</h2><p>We don't compromise on your safety.</p></div><div className="addons-list">{addOns.map(([title, text], index) => <article className="addon plans-reveal" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></article>)}</div></section>

    <section className="plans-enterprise"><div className="plans-enterprise-copy plans-reveal"><p className="blog-eyebrow"><span /> FOR TEAMS</p><h2>Enterprise &amp;<br />business</h2><p>We don't compromise on your safety.</p></div><div className="enterprise-list plans-reveal"><p>Dedicated IP Addresses available for your team.</p><p>Centralized Admin Dashboard for easy account management.</p><p>Custom Deployments across our 10 global server locations.</p><p>Priority 24/7 Technical Support.</p><a href="https://traversevpn.com/contact-us">Contact Sales <span aria-hidden="true">↗</span></a></div></section>

    <section className="plans-testimonials" aria-labelledby="testimonials-title"><div className="plans-reveal"><p className="blog-eyebrow"><span /> TESTIMONIALS</p><h2 id="testimonials-title">What our customers<br />are saying</h2></div><div className="plans-testimonial-grid">{testimonials.map(([quote, author]) => <article className="plans-testimonial plans-reveal" key={author}><span className="quote-mark">“</span><p>“{quote}”</p><small>{author}</small></article>)}</div></section>

    <section className="plans-faq" aria-labelledby="plans-faq-title"><div className="plans-faq-heading plans-reveal"><p className="blog-eyebrow"><span /> YOUR QUESTIONS, COVERED</p><h2 id="plans-faq-title">Good to<br />know.</h2></div><div className="plans-faq-list">{faqItems.map(([question, answer], index) => <div className={`plans-faq-item plans-reveal${openFaq === index ? " open" : ""}`} key={question}><button type="button" aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? -1 : index)}><span>{question}</span><i aria-hidden="true">+</i></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></section>

    <section className="plans-final-cta"><p className="blog-eyebrow plans-reveal"><span /> READY TO CONNECT?</p><h2 className="plans-reveal">Take back your<br /><span>online privacy.</span></h2><p className="plans-reveal">Join thousands of secure users today.</p><a className="plans-reveal" href="https://links.traversevpn.com/s/Ugp0lRJV">Download Traverse VPN <span aria-hidden="true">↗</span></a></section>
    <footer className="plans-footer"><a href="/#home" className="feature-footer-brand"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><span>Take control of your digital identity.</span><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get protected <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
