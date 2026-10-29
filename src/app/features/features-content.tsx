"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const highlights = [
  { number: "01", title: "Stay private on public WiFi.", text: "" },
  { number: "02", title: "Make tracking harder across apps and sites.", text: "" },
  { number: "03", title: "Cut down on IP and DNS leaks.", text: "" },
  { number: "04", title: "Browse smoother and safer", text: "" },
];

const features = [
  {
    number: "01", tag: "SCAM LINK SCANNER", title: "Link scam scan", image: "/images/vpn/photos/cafe-phone.webp", alt: "Phone held in a public indoor space", imageLabel: "LINK SCAM SCAN",
    copy: "Quickly check sus links before you tap.",
    points: ["Check a suspicious link before opening it", "Look for patterns associated with scams", "Add a simple safety check to everyday browsing"],
  },
  {
    number: "02", tag: "IP PRIVACY", title: "Mask your IP", image: "/images/vpn/photos/city-phone.webp", alt: "Person using a phone in a city at night", imageLabel: "IP MASKING",
    copy: "Traverse VPN hides your real IP address and routes your traffic through secure VPN servers, so websites and apps see the VPN location instead of your home or mobile IP. This makes it much harder for advertisers, data brokers, or bad actors to tie your browsing directly to your real device or physical location.",
    points: ["Replace your real IP with a Traverse VPN server IP", "Add a layer of distance between your identity and the sites you visit", "Make basic IP‑based tracking and targeting less effective"],
  },
  {
    number: "03", tag: "LEAK SAFEGUARDS", title: "Protection against common leaks", image: "/images/vpn/photos/night-phone.webp", alt: "Phone in use in a public space", imageLabel: "DNS · IP · CONNECTION",
    copy: "Beyond basic encryption, Traverse VPN adds extra layers to reduce common ways your identity can slip through. These protections work together so your IP, DNS requests, and communication channels are harder to correlate and track in everyday use.",
    points: ["Reduce common ways your identity can slip through", "Help keep IP and DNS requests private", "Make communication channels harder to correlate and track"],
  },
  {
    number: "04", tag: "SMARTER BROWSING", title: "Smart protection for everyday browsing", image: "/images/vpn/photos/cafe-phone.webp", alt: "Phone held in a public indoor space", imageLabel: "SMART BROWSING",
    copy: "Traverse VPN includes extra tools tailored to how people actually use the internet every day, not just raw tunneling. Link scam scanning – Check suspicious links for scam patterns and risky behavior before you open them, adding a buffer between you and phishing pages. These features complement the VPN tunnel to keep you safer against common traps like phishing, scam links, and confusing security settings.",
    points: ["Check suspicious links before opening them", "Add a buffer between you and phishing pages", "Complement the VPN tunnel with practical safety tools"],
  },
  {
    number: "05", tag: "NO DATA METER", title: "Unlimited bandwidth", image: "/images/vpn/photos/airport-work.webp", alt: "Traveler working on a laptop at an airport", imageLabel: "UNLIMITED BANDWIDTH",
    copy: "Traverse VPN Pro offers unlimited bandwidth, so you don’t have to keep one eye on a data meter while you browse, stream, or download. Within normal usage limits, you’re free to stay connected as long as you like without worrying about pre-set caps.",
    points: ["No artificial data caps on premium plans", "Stream, download, and browse without constantly checking usage", "One less limit to think about when staying protected"],
  },
  {
    number: "06", tag: "YOUR DEVICES", title: "Multi-device protection", image: "/images/vpn/photos/travel-desk.webp", alt: "Laptop and travel essentials on a desk", imageLabel: "MULTI-DEVICE USE",
    copy: "Traverse VPN is available for iPhone, iPad, and other Apple platforms, so you can protect more than one device with the same service. You can keep your phone protected on mobile data while your tablet or laptop stays secure on WiFi, using the same familiar interface across your Apple ecosystem.",
    points: ["Consistent experience across Apple devices", "Protect multiple devices under the same subscription", "Secure both mobile and WiFi usage in parallel"],
  },
  {
    number: "07", tag: "TRAVEL READY", title: "Streaming and travel-friendly", image: "/images/vpn/photos/cafe-collaboration.webp", alt: "People working together on laptops in a café", imageLabel: "AT HOME · ON THE GO",
    copy: "When you’re traveling or using unfamiliar networks, Traverse VPN can help keep your streaming and browsing more private and consistent. Connect to a high-speed server in a suitable region, secure the hotel or airport WiFi, and stream or browse knowing your traffic is encrypted instead of exposed.",
    points: ["Extra privacy on hotel, airport, and café networks", "More consistent streaming and browsing experience while abroad", "Protection that travels with you instead of staying at home"],
  },
  {
    number: "08", tag: "TRAVEL READY", title: "Streaming and travel-friendly", image: "/images/vpn/photos/cafe-laptop.webp", alt: "Laptop connected in a café", imageLabel: "AT HOME · ON THE GO",
    copy: "When you’re traveling or using unfamiliar networks, Traverse VPN can help keep your streaming and browsing more private and consistent. Connect to a high-speed server in a suitable region, secure the hotel or airport WiFi, and stream or browse knowing your traffic is encrypted instead of exposed. (Availability with specific streaming platforms can vary by region and service, but the encrypted tunnel keeps your connection protected either way.)",
    points: ["Extra privacy on hotel, airport, and café networks", "More consistent streaming and browsing experience while abroad", "Protection that travels with you instead of staying at home"],
  },
  {
    number: "09", tag: "PUBLIC WI-FI", title: "Secure VPN for Public WiFi", image: "/images/vpn/photos/airport-work.webp", alt: "Traveler working on a laptop at an airport", imageLabel: "AUTO-PROTECT",
    copy: "Auto-protect activates the moment you join any public network, cafes, airports, hotels, anywhere. You do not have to remember to turn it on. Traverse VPN does it for you.",
    points: ["Protection on cafés, airports, and hotel WiFi", "Automatic protection when joining public networks", "A simpler way to stay protected on the go"],
  },
];

const safeguards = [
  { title: "Strong, Modern Encryption", text: "Your connection is protected with strong, modern VPN encryption designed to keep your traffic private on any network. Even when you’re on unsecured WiFi in cafés, airports, or hotels, Traverse VPN keeps your data inside an encrypted tunnel instead of letting it travel in readable form.", points: ["Encrypted tunnel between your device and Traverse VPN servers", "Protection against casual snooping on open or shared WiFi", "Extra peace of mind when handling logins, messages, and payments"] },
  { title: "DNS Leak Protection", text: "Even with a VPN, DNS leaks can reveal which sites you visit to your internet provider or other third-party resolvers. Traverse VPN includes DNS Leak Protection so that your DNS lookups stay inside the encrypted tunnel instead of leaking out to the network.", points: ["Keep website lookups away from your ISP as much as possible", "Make your browsing history and search activity harder to link back to you", "Reduce one of the most common ways VPN setups accidentally expose data"] },
  { title: "Kill Switch & Auto Connect", text: "If your VPN connection is interrupted, you don’t want your real IP address suddenly exposed in the middle of a session. Traverse VPN offers a Kill Switch that can block traffic whenever the VPN tunnel drops, helping to prevent accidental leaks while the app reconnects. Turn on Auto-connect and Traverse VPN will automatically secure your connection again so you stay protected with minimal effort.", points: ["Kill Switch to block traffic when the VPN disconnects", "Auto-connect to restore protection automatically", "Fewer gaps where your real IP could be exposed without you noticing"] },
  { title: "Split Tunneling for more control", text: "Sometimes you want some apps to use the VPN and others to connect normally. Traverse VPN’s Split Tunneling feature lets you route selected apps through the encrypted tunnel while leaving others on your regular connection. This gives you more fine-grained control over how and where your traffic is protected.", points: ["Secure your browser and messaging apps with Traverse VPN", "Keep certain local services or banking apps outside the tunnel if they require a local IP", "Balance privacy, performance, and compatibility based on your own workflow"] },
  { title: "Privacy Centric Design", text: "Traverse VPN Pro is built with a privacy-first mindset, not an ad-tech mindset. The premium experience is designed so that your VPN usage and browsing behavior are not turned into an advertising profile or packaged for third-party marketing. Traverse VPN’s in-app AI Chat is also described as not using your conversations to train the model, helping keep your questions and everyday chats from becoming training data.", points: ["No premium data-sharing promises for advertising", "AI chat that isn’t used to build ad profiles or train external models", "A VPN experience focused on protection, not monetizing your behavior"] },
  { title: "High Speed Premium Servers", text: "Premium users can connect to Traverse VPN’s high-speed servers across multiple continents and countries, designed to support up to gigabit-class speeds where available. This gives you enough headroom for HD streaming, large downloads, and video calls when your own connection and device can keep up.", points: ["High-speed servers optimized for performance", "Extra capacity for streaming, gaming, and remote work", "Smarter routing to balance speed and security"] },
  { title: "Easy to Use", text: "Security only works if you actually use it. The Traverse VPN apps are designed around one-tap protection: open the app, tap “Connect”, and your traffic is secured. This way, you get advanced security without needing to dig through complex menus or understand low-level networking.", points: ["One-tap connect to the best available server", "Clear toggles for Kill Switch, WiFi Protection, Auto-connect, DNS Leak Protection, and Split Tunneling", "A simple Premium User screen shows your plan and upgrade options at a glance"] },
  { title: "Auto-connect and always-protected mindset", text: "Turn on Auto-connect and let Traverse VPN handle the routine work for you. The app can automatically secure your connection when you launch it or when you join new networks, so you’re not relying on memory to stay protected each time you go online.", points: ["Automatically secure new or risky networks", "Reduce the chance of forgetting to turn the VPN on", "Maintain a more “always-protected” posture with minimal effort"] },
];

export default function FeaturesContent() {
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
      <div className="feature-highlight-grid">{highlights.map((item) => <article className="feature-highlight" key={item.number}><span>{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
    </section>

    <section className="feature-stories" aria-label="Traverse VPN feature details">
      <div className="feature-stories-heading"><p className="blog-eyebrow"><span /> TRAVERSE VPN</p><h2>Built for long days.<br />And random late‑night scrolls.</h2><div><h3>Traverse VPN</h3><p>Your privacy hub — IP masking, encryption, and leak protection in one place.</p></div></div>
      {features.map((feature, index) => <article className={`feature-story${index % 2 ? " feature-story-reverse" : ""}`} key={feature.number}>
        <div className="feature-story-media"><Image src={feature.image} alt={feature.alt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span className="feature-story-image-label">{feature.imageLabel}</span><span className="feature-story-index">{feature.number} / 09</span></div>
        <div className="feature-story-copy"><p className="blog-eyebrow"><span /> {feature.tag}</p><h2>{feature.title}</h2><p className="feature-story-description">{feature.copy}</p><ul>{feature.points.map((point) => <li key={point}><span aria-hidden="true">↗</span>{point}</li>)}</ul></div>
      </article>)}
    </section>

    <section className="feature-safeguards" aria-labelledby="safeguards-title">
      <div className="feature-safeguards-heading"><p className="blog-eyebrow"><span /> THE DETAILS</p><h2 id="safeguards-title">Protection, with<br />room to make it yours.</h2><p>Traverse VPN Pro brings everyday connection protections and controls into one app.</p></div>
      <div className="feature-safeguard-grid">{safeguards.map((item, index) => <article className="feature-safeguard" key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
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
