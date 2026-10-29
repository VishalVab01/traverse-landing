"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CoreFeature = {
  index: string;
  title: string;
  description: string;
  detail: string;
  visual: "servers" | "kill-switch" | "devices" | "wifi" | "split";
};

const defaultCoreFeatures: CoreFeature[] = [
  { index: "01", title: "Worldwide servers", description: "Choose a fast route through Traverse’s global network.", detail: "10 HIGH-SPEED SERVERS", visual: "servers" },
  { index: "02", title: "Automatic Kill Switch", description: "Stops traffic if the VPN drops.", detail: "LEAK SAFEGUARD", visual: "kill-switch" },
  { index: "03", title: "Multiple devices", description: "Protect multiple devices with one account.", detail: "MULTI-DEVICE", visual: "devices" },
  { index: "04", title: "Wi-Fi Protection", description: "Add protection on café, airport, and hotel Wi-Fi.", detail: "PUBLIC WI-FI", visual: "wifi" },
  { index: "05", title: "Split Tunneling", description: "Choose which apps use the encrypted VPN tunnel.", detail: "APP LEVEL CONTROL", visual: "split" },
];

function ServerGlobeVisual() {
  return <svg className="core-globe" viewBox="0 0 430 260" fill="none" aria-hidden="true">
    <defs><radialGradient id="globeGlow"><stop stopColor="#F22C59" stopOpacity=".2"/><stop offset="1" stopColor="#F22C59" stopOpacity="0"/></radialGradient></defs>
    <g transform="translate(-72 -39) scale(1.3)">
    <ellipse cx="240" cy="132" rx="176" ry="118" fill="url(#globeGlow)"/>
    <g className="globe-wire" stroke="rgba(255,255,255,.2)" strokeWidth=".8">
      <circle cx="242" cy="130" r="91"/><ellipse cx="242" cy="130" rx="91" ry="32"/><ellipse cx="242" cy="130" rx="91" ry="62"/>
      <ellipse cx="242" cy="130" rx="34" ry="91"/><ellipse cx="242" cy="130" rx="66" ry="91"/>
      <path d="M151 130h182M164 91h156M164 169h156"/>
    </g>
    <g className="globe-routes" stroke="#F22C59" strokeWidth="1.5">
      <path d="M177 151c30-59 82-68 125-24"/><path d="M194 83c20 43 61 61 108 49"/><path d="M174 150c48 14 80 3 115-54"/>
    </g>
    <g fill="#F22C59"><circle className="globe-node" cx="177" cy="151" r="3.5"/><circle className="globe-node globe-node--delay" cx="302" cy="127" r="3.5"/><circle className="globe-node globe-node--delay2" cx="194" cy="83" r="3.5"/></g>
    <g className="globe-city-labels" fill="rgba(255,255,255,.58)" fontFamily="monospace" fontSize="8" letterSpacing="1"><text x="148" y="169">LONDON</text><text x="303" y="119">SINGAPORE</text><text x="169" y="72">NEW YORK</text></g>
    </g>
  </svg>;
}

function KillSwitchVisual() {
  return <div className="kill-visual" aria-hidden="true">
    <div className="kill-visual-top"><span className="visual-live-dot"/> CONNECTION GUARD <span className="kill-toggle">ON</span></div>
    <div className="kill-route"><span className="route-endpoint">DEVICE</span><i/><span className="route-shield"><svg viewBox="0 0 24 24"><path d="M12 2 20 5v6c0 5-3.3 8.5-8 11-4.7-2.5-8-6-8-11V5l8-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg></span><i className="route-break"/><span className="route-endpoint route-endpoint--muted">NETWORK</span></div>
    <div className="kill-visual-bottom"><span>IF THE TUNNEL DROPS</span><b>TRAFFIC PAUSED</b></div>
  </div>;
}

function DevicesVisual() {
  return <div className="devices-visual" aria-hidden="true">
    <div className="device-orbit device-orbit--outer"/><div className="device-orbit device-orbit--inner"/>
    <span className="device-chip device-chip--phone"><svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2"/><path d="M10 18.5h4"/></svg>PHONE</span>
    <span className="device-chip device-chip--laptop"><svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="12" rx="1.5"/><path d="M2 19h20l-2-3H4l-2 3Z"/></svg>LAPTOP</span>
    <span className="device-chip device-chip--tablet"><svg viewBox="0 0 24 24"><rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M11 18.5h2"/></svg>TABLET</span>
    <span className="device-chip device-chip--tv"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="13" rx="1.5"/><path d="m9 21 3-3 3 3"/></svg>TV</span>
    <span className="device-hub"><span/></span>
  </div>;
}

function WifiVisual() {
  return <div className="wifi-visual" aria-hidden="true">
    <span className="wifi-ring wifi-ring--one"/><span className="wifi-ring wifi-ring--two"/><span className="wifi-ring wifi-ring--three"/>
    <span className="wifi-shield"><svg viewBox="0 0 32 32"><path d="M16 3 27 7v8c0 7-4.5 11.6-11 15-6.5-3.4-11-8-11-15V7l11-4Z"/><path d="m11 16 3.2 3.2 6.8-7"/></svg></span>
    <span className="wifi-status"><i/> UNSECURED <b>→</b> PROTECTED</span>
  </div>;
}

function SplitTunnelVisual() {
  return <div className="split-visual" aria-hidden="true">
    <div className="split-apps">
      <span className="split-app split-app--browser"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="12" rx="2"/><path d="M3 7h14M6 5.5h.1M8 5.5h.1"/></svg></span>
      <span className="split-app split-app--mail"><svg viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2"/><path d="m4 7 6 4 6-4"/></svg></span>
      <span className="split-app split-app--map"><svg viewBox="0 0 20 20"><path d="M10 17s5-5.2 5-9a5 5 0 1 0-10 0c0 3.8 5 9 5 9Z"/><circle cx="10" cy="8" r="1.6"/></svg></span>
    </div>
    <div className="split-routes"><div className="split-route split-route--vpn"><span>VPN TUNNEL</span><i/><b/></div><div className="split-route split-route--direct"><span>DIRECT</span><i/><b/></div></div>
    <div className="split-destinations"><span/><span/></div>
  </div>;
}

function FeatureVisual({ kind }: { kind: CoreFeature["visual"] }) {
  switch (kind) {
    case "servers": return <ServerGlobeVisual/>;
    case "kill-switch": return <KillSwitchVisual/>;
    case "devices": return <DevicesVisual/>;
    case "wifi": return <WifiVisual/>;
    case "split": return <SplitTunnelVisual/>;
  }
}

function FeatureCard({ feature }: { feature: CoreFeature }) {
  const cardRef = useRef<HTMLElement>(null);
  return <article
    ref={cardRef}
    className={`core-card core-card--${feature.visual}`}
    onPointerMove={(event) => {
      if (event.pointerType !== "mouse") return;
      const bounds = event.currentTarget.getBoundingClientRect();
      event.currentTarget.style.setProperty("--spot-x", `${event.clientX - bounds.left}px`);
      event.currentTarget.style.setProperty("--spot-y", `${event.clientY - bounds.top}px`);
    }}
  >
    <div className="core-card-content">
      <span className="core-card-index">{feature.index} <i/> TRAVERSE VPN</span>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      <span className="core-card-detail">{feature.detail}</span>
    </div>
    <div className="core-card-visual"><FeatureVisual kind={feature.visual}/></div>
  </article>;
}

export function FeatureSection({ features = defaultCoreFeatures }: { features?: CoreFeature[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = [...section.querySelectorAll<HTMLElement>(".core-card")];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-in-view", entry.isIntersecting);
        if (entry.isIntersecting) entry.target.classList.add("has-revealed");
      });
    }, { rootMargin: "80px 0px", threshold: 0.12 });
    cards.forEach((card) => observer.observe(card));

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".core-heading-line > span", { yPercent: 110 }, { yPercent: 0, duration: .9, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 72%", once: true } });
        gsap.fromTo(cards, { autoAlpha: 0, y: 24, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .8, stagger: .07, ease: "power3.out", scrollTrigger: { trigger: ".core-bento", start: "top 76%", once: true } });
      }, section);
      return () => { observer.disconnect(); ctx.revert(); };
    }
    cards.forEach((card) => card.classList.add("has-revealed"));
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} className="core-features-section" aria-labelledby="core-features-title">
    <div className="core-features-layout">
      <header className="core-features-intro">
        <p className="core-eyebrow"><span/> INCLUDED WITH EVERY PLAN</p>
        <h2 id="core-features-title"><span className="core-heading-line"><span>Core</span></span><span className="core-heading-line"><span>features.</span></span></h2>
        <p className="core-intro-copy">Everything you need for complete online freedom.</p>
        <span className="core-intro-index">PROTECTION / 01—05</span>
      </header>
      <div className="core-bento">{features.map((feature) => <FeatureCard key={feature.index} feature={feature}/>)}</div>
    </div>
  </section>;
}
