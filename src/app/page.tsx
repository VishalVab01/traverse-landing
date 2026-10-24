"use client";

import { useState } from "react";
import SiteHeader from "./site-header";

const services = [
  {
    number: "001.", japanese: "物語と個性", title: "Brand Positioning & Identity",
    description: "We define how your brand looks, speaks, and is remembered. From positioning and visual identity to scalable design systems, every element is built to create recognition and consistency.",
    price: "$4500", tags: ["Visual identity", "Typography", "Branding", "Logo design", "Packaging design", "Rebranding"],
    images: ["/images/service-1a.png", "/images/service-1b.png"], alt: ["The Neiden digital clock design", "A hand holding a phone for a product interface"]
  },
  {
    number: "002.", japanese: "体験と設計", title: "Product Experience Design",
    description: "We design websites, platforms, and digital products that balance usability, performance, and visual clarity. Every interaction is shaped to help users move faster and make better decisions.",
    price: "$3500", tags: ["UX Design", "UI Systems", "Product Strategy", "Wireframing", "Prototyping", "Design Audits"],
    images: ["/images/service-2a.png", "/images/service-2b.png"], alt: ["Editorial campaign visual", "Digital product brand image"]
  },
  {
    number: "003.", japanese: "影響と発信", title: "Social Presence & Content",
    description: "We create content systems that keep brands active, consistent, and recognizable across social platforms. From strategy to execution, every touchpoint supports long-term brand growth.",
    price: "$2500", tags: ["Content Strategy", "Creative Campaigns", "Art Direction", "Community Building", "Brand Content", "Social Media"],
    images: ["/images/service-3a.png", "/images/service-3b.png"], alt: ["Creative content campaign", "Social media content campaign"]
  },
  {
    number: "004.", japanese: "検索と成長", title: "Organic Growth & Visibility",
    description: "We increase visibility where it matters most. Through SEO, content strategy, and technical improvements, we help brands attract the right audience and create lasting growth.",
    price: "$6000", tags: ["SEO Strategy", "Technical SEO", "Content Strategy", "Keyword Research", "Site Performance", "Search Analytics"],
    images: ["/images/service-4a.png", "/images/service-4b.png"], alt: ["Organic search visibility report", "Search growth overview"]
  },
];

function GridLines() {
  return <div className="grid-lines" aria-hidden="true"><i/><i/><i/><i/></div>;
}

function SectionLabel({ children, japanese }: { children: string; japanese: string }) {
  return <div className="section-label"><span className="label-mark" aria-hidden="true"><i/><i/><i/><i/></span><span>[</span><b>ND®</b><i>—</i><b>{children} /</b><span className="jp">{japanese}</span><span>]</span></div>;
}

function Plus() { return <span className="plus" aria-hidden="true">+</span>; }

const bottomBlurLayers = [
  { blur: "0.3px", from: "0%", to: "8.75%" },
  { blur: "1.3px", from: "8.75%", to: "17.5%" },
  { blur: "2.8px", from: "17.5%", to: "26.25%" },
  { blur: "5px", from: "26.25%", to: "35%" },
  { blur: "7.8px", from: "35%", to: "43.75%" },
  { blur: "11.3px", from: "43.75%", to: "52.5%" },
  { blur: "15.3px", from: "52.5%", to: "61.25%" },
  { blur: "20px", from: "61.25%", to: "70%" },
];

const pricingPlans = [
  {
    audience: "For growing teams", name: "Studio", monthly: "49", yearly: "41", plan: "Basic", seats: "2", image: "/images/pricing/studio.png",
    features: ["Smart Deployment", "Basic Monitoring", "Core Security", "Email Support", "5 team seats", "Basic Analytics", "Standard API"],
  },
  {
    audience: "For scaling businesses", name: "Scale", monthly: "89", yearly: "75", plan: "Advanced", seats: "6", image: "/images/pricing/scale.png",
    features: ["All Studio features", "AI optimization", "Advanced monitoring", "Enhanced security", "24/7 support", "Auto-scaling", "Full analytics", "Priority API"],
  },
  {
    audience: "For large organizations", name: "Supreme", monthly: "249", yearly: "209", plan: "Enterprise", seats: "100", image: "/images/pricing/supreme.png",
    features: ["All Scale features", "Dedicated support", "Private hosting", "Custom security", "Training included", "Priority features", "Custom reporting", "Enterprise SLA"],
  },
];

export default function Home() {
  const [yearlyPlans, setYearlyPlans] = useState<string[]>([]);
  return <main>
    <SiteHeader />
    <section className="hero" id="home">
      <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true"><source src="/videos/hero-background.mp4" type="video/mp4"/></video>
      <div className="hero-shade" aria-hidden="true"/><GridLines/>
      <div className="hero-top"><span>2019–26©</span><div>PROJECTS FOR <b>MAY</b> <i>▮▮▮▮</i> <span>3 LEFT</span></div></div>
      <div className="hero-inner">
        <div className="offer-grid">
          <div><span>01.</span><b>WEB DESIGN & BRANDING</b></div>
          <div><span>02.</span><b>SOCIAL PRESENCE & CONTENT</b></div>
          <div><span>03.</span><b>ORGANIC GROWTH & VISIBILITY</b></div>
        </div>
        <div className="hero-title-wrap"><h1>ñeiden</h1><p className="scribble">less noise. more direction.</p></div>
        <div className="hero-bottom">
          <div className="hero-action"><p>We help brands make better decisions, build stronger products, and move forward with confidence.</p><a className="project-button" href="mailto:hello@neiden.project"><span>START A PROJECT</span><Plus/></a></div>
          <div className="proof-row"><div className="avatar-stack"><img src="/images/client-1.png" alt="Client"/><img src="/images/client-2.png" alt="Client"/><img src="/images/client-3.png" alt="Client"/><img src="/images/client-4.png" alt="Client"/><span>80+</span></div><div className="rating"><div className="stars">•••••</div><div><b>4.9/5</b><small>BASED ON <strong>361 REVIEWS</strong></small></div></div></div>
        </div>
      </div>
      <div className="social-links"><span>𝕏</span><span>◎</span><span>◉</span><span>Bē</span><small>STAY<br/><b>CONNECTED</b></small></div>
      <div className="client-logos" aria-label="Selected clients"><span>Clandestine</span><span>◉ Ephemeral</span><span>◈ Frequencii</span><span>G Goodwell</span><span>◉ Perception</span></div>
    </section>
    <div className="bottom-glass-bar" aria-hidden="true"><div className="bottom-glass-layers">{bottomBlurLayers.map((layer) => <div key={layer.blur} style={{ backdropFilter: `blur(${layer.blur}) saturate(120%)`, WebkitBackdropFilter: `blur(${layer.blur}) saturate(120%)`, maskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)` }} />)}</div></div>
    <a className="template-tag" href="#services">GET NEIDEN® <span>FROM $99</span></a>

    <section className="about section" id="about">
      <GridLines/>
      <div className="about-projects">18+ PROJECTS</div>
      <div className="about-images"><img className="about-left" src="/images/about-left.png" alt="Black and white editorial portrait"/><img className="about-right" src="/images/about-right.png" alt="Colorful fashion editorial portrait"/></div>
      <div className="about-heading">
        <SectionLabel japanese="原点と理念">WHO WE ARE</SectionLabel>
        <h2>We are an international studio<br className="desktop-break"/> collective — that helps brands craft<br className="desktop-break"/> unique digital experiences.</h2>
      </div>
      <div className="about-meta">EST. 2019</div>
      <div className="about-quote"><p>Great design is rarely about adding more. It’s about understanding what matters, removing what doesn’t, and creating experiences that feel effortless for the people who use them.</p><div className="person"><img src="/images/lars.png" alt="Lars Nyström"/><div><strong>Lars Nyström</strong><span>Head of Strategy at<br/><b>Neiden®</b></span></div></div></div>
    </section>

    <section className="services section" id="services">
      <GridLines/>
      <aside className="services-aside"><SectionLabel japanese="思想と実行">SERVICES</SectionLabel><div className="services-intro"><h2>What<br/>We Build</h2><p>Four core disciplines. One goal: helping brands communicate, grow, and stay memorable.</p></div><div className="scope-cta"><b>BEYOND STANDARD PROJECT SCOPE</b><p>Made for different. Built together.</p><a className="project-button" href="mailto:hello@neiden.project"><span>DISCUSS YOUR PROJECT</span><Plus/></a></div></aside>
      <div className="service-list">{services.map((service) => <article className="service" key={service.number}>
        <div className="service-head"><span>{service.number} / <i>{service.japanese}</i></span><h3>{service.title}</h3></div>
        <div className="service-images">{service.images.map((image, index) => <img key={image} src={image} alt={service.alt[index]}/>)}</div>
        <div className="service-body"><div><p>{service.description}</p><div className="service-price">STARTING FROM <b>{service.price}</b></div></div><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
      <div className="availability"><span>NOW BOOKING <b>MAY</b></span><span>DELIVERY <b>2–4 WEEKS</b></span></div>
    </section>

    <section className="features section" id="how-we-work">
      <GridLines />
      <div className="features-heading">
        <div className="features-intro"><SectionLabel japanese="特徴と強み">FEATURES</SectionLabel><p>A closer look at the thinking, experience, and processes that shape the work we deliver.</p></div>
        <h2>How We Work</h2>
      </div>
      <div className="features-cards">
        <article className="feature-copy">
          <div className="feature-people"><b>ñeiden<sup>®</sup></b><div>{[1,2,3,4].map(n=><img key={n} src={`/images/features/team-${n}.png`} alt="Neiden team member"/>)}</div></div>
          <div className="feature-copy-bottom"><h3>Turning complexity into quality</h3><p>We simplify difficult decisions, connect fragmented workflows, and turn ambitious ideas into dependable systems.</p><ul><li><span>✓</span>Strategy that guides decisions</li><li><span>✓</span><details><summary>Design that reduces friction <i>ⓘ</i></summary><p>We design systems, interfaces, and workflows that remove unnecessary steps, reduce confusion, and help teams move faster with less effort.</p></details></li><li><span>✓</span>Systems that actually deliver</li></ul></div>
        </article>
        <article className="feature-visual" aria-label="Neiden product metrics"><img className="feature-phone" src="/images/features/phone-card.png" alt="Hand holding a Neiden phone with a rising red graph"/>
          <div className="metric metric-retention"><span className="metric-icon red"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 19v-1a6 6 0 0 1 12 0v1zM16 5a3 3 0 0 1 0 6M18 14a4 4 0 0 1 3 4v1h-3"/></svg></span><span><b>95%</b><small>Client retention</small></span></div>
          <div className="metric metric-response"><span className="metric-icon dark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span><b>Response Time <i></i></b><small>Under 2 hours</small></span></div>
          <div className="metric metric-conversion"><span className="metric-icon black"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 3 7-8M14 6h6v6"/></svg></span><span><b>+68–72%</b><small>Conversion lift</small></span></div>
        </article>
        <article className="feature-expertise"><div className="expertise-top"><b>[ EXPERTISE ]</b><span>実績と信頼</span></div><div className="expertise-copy"><strong>13+</strong><span>Years<br/>Industry<br/>Experience</span></div></article>
      </div>
      <div className="feature-bottom-cards">
        <article className="bottom-feature simplicity-card">
          <header><h3>Simplicity</h3><span>シンプルさと明快さ</span></header>
          <img className="bottom-feature-art" src="/images/features/simplicity-ring.png" alt="Sculptural red glass ring"/>
          <div className="bottom-feature-copy"><h4>Less friction. More focus.</h4><p>We remove unnecessary complexity, streamline workflows, and create systems that help teams focus on what actually matters.</p></div>
        </article>
        <article className="bottom-feature growth-card">
          <header><h3>Client Growth</h3></header>
          <img className="bottom-feature-art" src="/images/features/client-growth.png" alt="A handshake representing a growing client partnership"/>
          <div className="growth-stat"><span>↗ &nbsp; +12% MoM</span><strong>68%</strong><p>Average client growth after implementation</p></div>
        </article>
        <article className="bottom-feature execution-card">
          <header><b>ñeiden<sup>®</sup> <i className="mini-mark"><i/><i/><i/><i/></i></b><span className="launch-pill"><i><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></i><span><strong>Launch Time</strong><small>2–4 Weeks</small></span></span></header>
          <img className="bottom-feature-art" src="/images/features/faster-execution.png" alt="A fast moving performance wheel"/>
          <div className="bottom-feature-copy"><h4>Faster Execution</h4><p>Less waiting. Less complexity.<br/>More progress from day one.</p></div>
        </article>
      </div>
    </section>

    <section className="pricing section platform-pricing" id="pricing">
      <GridLines />
      <div className="pricing-heading platform-pricing-heading">
        <div className="platform-pricing-title"><h2>Pricing</h2><div className="platform-pricing-meta"><div><b>005</b><span>ñeiden®</span></div><p>Flexible, transparent plans. Built for clarity and growth.</p><small>Scale at your own pace – choose only what you need, when you need it. Nothing extra, nothing locked in.</small></div></div>
      </div>
      <div className="platform-pricing-rows">{pricingPlans.map(plan => <article className="platform-price-row" key={plan.name}>
        <div className="platform-plan-visual"><img src={plan.image} alt=""/><div className="platform-plan-visual-shade"/><h3>{plan.name}</h3><span>{plan.audience}</span></div>
        <div className="platform-price-cell"><span className="platform-cell-label">Price</span><strong>${yearlyPlans.includes(plan.name) ? plan.yearly : plan.monthly}</strong><div className="platform-billing"><span className={!yearlyPlans.includes(plan.name) ? "active" : ""}>Monthly</span><button type="button" aria-label={`Switch ${plan.name} to ${yearlyPlans.includes(plan.name) ? "monthly" : "yearly"} billing`} aria-pressed={yearlyPlans.includes(plan.name)} onClick={() => setYearlyPlans(current => current.includes(plan.name) ? current.filter(name => name !== plan.name) : [...current, plan.name])}><i/></button><span className={yearlyPlans.includes(plan.name) ? "active" : ""}>Yearly</span></div><small className="platform-save">You save 16%</small></div>
        <div className="platform-plan-info"><div><span className="platform-cell-label">Plan</span><strong>{plan.plan}</strong></div><div><span className="platform-cell-label">Seats</span><strong>{plan.seats}</strong></div></div>
        <ul className="platform-features">{plan.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
        <div className="platform-plan-action"><a href="mailto:hello@neiden.project">Select Plan <span aria-hidden="true">↗</span></a></div>
      </article>)}</div>
      <a className="platform-enterprise" href="mailto:hello@neiden.project">Contact sales for Enterprise Plan <span aria-hidden="true">↗</span></a>
    </section>
  </main>;
}
