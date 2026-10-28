"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SiteHeader from "./site-header";
import GlobeStudy from "./globe-study";
import FooterHands from "./footer-hands";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "001.", title: "Private Connection & Encryption",
    description: "Protect your connection with AES-256 encryption. Traverse VPN helps shield your data on public Wi-Fi and keeps your browsing more private.",
    price: "Included", tags: ["AES-256", "IP masking", "DNS leak protection", "Kill Switch", "No WebRTC leaks", "Split tunneling"],
    images: ["/images/vpn/photos/cafe-laptop.webp", "/images/vpn/photos/night-phone.webp"], alt: ["Traveler using a laptop in a café", "Person using a phone in a city at night"]
  },
  {
    number: "002.", title: "Fast Global Server Access",
    description: "Choose from 50+ fast servers to reach content around the world. Enjoy unlimited bandwidth and a connection built for everyday browsing.",
    price: "50+ servers", tags: ["Global locations", "Unlimited bandwidth", "Up to 1 Gbps", "No throttling", "Streaming", "Low latency"],
    images: ["/images/vpn/photos/airport-work.webp", "/images/vpn/photos/city-phone.webp"], alt: ["Traveler working at an airport gate", "Traveler using a phone on a city street"]
  },
  {
    number: "003.", title: "Safer Public Wi-Fi",
    description: "Connect with more confidence at airports, cafés, hotels, and other shared networks. Automatic protection helps keep your data private when you connect.",
    price: "Every network", tags: ["Auto-connect", "Wi-Fi protection", "Encrypted traffic", "Hide your IP", "Private browsing", "Travel ready"],
    images: ["/images/vpn/photos/cafe-collaboration.webp", "/images/vpn/photos/cafe-phone.webp"], alt: ["People using laptops in a café", "Phone in use in a public indoor space"]
  },
  {
    number: "004.", title: "No-Logs Privacy",
    description: "Traverse VPN says it does not collect or share your browsing activity. Open-source protocols and a published no-logs policy help make its approach easier to review.",
    price: "Privacy first", tags: ["No-logs policy", "OpenVPN", "WireGuard", "Independent audits", "No data sharing", "Zero knowledge"],
    images: ["/images/vpn/photos/night-phone.webp", "/images/vpn/photos/travel-desk.webp"], alt: ["Phone in a city at night", "Travel workspace with a laptop and passport"]
  },
];

function GridLines() {
  return <div className="grid-lines" aria-hidden="true"><i/><i/><i/></div>;
}

function Plus() { return <span className="plus" aria-hidden="true">+</span>; }

function ScrollRevealWords({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((part, index) => part.trim()
    ? <span className="about-reveal-word" key={index}>{part}</span>
    : part)}</>;
}

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
    audience: "Quick protection for a short trip", name: "Weekly", monthly: "1.49", yearly: "1.49", plan: "Weekly", seats: "All devices", image: "/images/vpn/photos/city-phone.webp", save: "One week of protection",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
  {
    audience: "Flexible month-to-month privacy", name: "Monthly", monthly: "3.99", yearly: "1.99", plan: "Monthly", seats: "All devices", image: "/images/vpn/photos/cafe-laptop.webp", save: "Cancel anytime",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
  {
    audience: "Best value for year-round security", name: "Yearly", monthly: "3.99", yearly: "1.99", plan: "Annual", seats: "All devices", image: "/images/vpn/photos/airport-work.webp", save: "Save 67% with annual billing",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
];

const journeySteps = [
  { year: "STEP 01", title: "Choose your\nTraverse plan", description: "Pick weekly, monthly, or annual protection for the way you use the internet.", image: "/images/vpn/photos/cafe-laptop.webp" },
  { year: "STEP 02", title: "Connect to a\nfast server", description: "Choose a location from 50+ fast servers and connect with one tap.", image: "/images/vpn/photos/airport-work.webp" },
  { year: "STEP 03", title: "Browse with\nmore privacy", description: "Your IP is masked and your internet traffic is protected with encryption.", image: "/images/vpn/photos/city-phone.webp" },
  { year: "STAY PROTECTED", title: "Carry privacy\nwith you", description: "Use Traverse VPN across your devices at home, at work, and on the go.", image: "/images/vpn/photos/cafe-collaboration.webp" },
];

function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState("316px");
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const section = sectionRef.current;
        if (!section) return;
        const mobile = window.matchMedia("(max-width: 900px)").matches;
        if (mobile) {
          const steps = [...section.querySelectorAll<HTMLElement>(".journey-step")];
          const center = window.innerHeight * .46;
          let nearest = 0;
          let distance = Number.POSITIVE_INFINITY;
          steps.forEach((step,index) => {
            const rect = step.getBoundingClientRect();
            const nextDistance = Math.abs(rect.top + Math.min(rect.height,260) / 2 - center);
            if (nextDistance < distance) { nearest=index; distance=nextDistance; }
          });
          setActiveStep(nearest);
          setProgress(`${nearest / (journeySteps.length - 1) * 100}%`);
          return;
        }
        const sectionTop = section.getBoundingClientRect().top;
        const distanceFromStart = window.innerHeight * .47 - (sectionTop + 150);
        setActiveStep(Math.max(0,Math.min(journeySteps.length - 1,Math.floor(distanceFromStart / 316))));
        setProgress(`${Math.max(0,Math.min(316 * (journeySteps.length - 1),distanceFromStart + 43))}px`);
      });
    };
    update();
    window.addEventListener("scroll",update,{passive:true});
    window.addEventListener("resize",update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("scroll",update); window.removeEventListener("resize",update); };
  }, []);
  return <section className="journey-section section" id="journey" ref={sectionRef}>
    <GridLines/><div className="journey-grid">
      <div className="journey-left"><div className="journey-intro"><h2>Your<br/>Journey</h2><p>From choosing a plan to browsing with greater privacy, Traverse keeps getting started simple.</p></div><div className="journey-quote"><div className="journey-quote-mark" aria-hidden="true">“</div><blockquote>Connect in a tap, protect your<br className="journey-desktop-break"/> traffic with strong encryption, and<br className="journey-desktop-break"/> take a more private connection<br className="journey-desktop-break"/> wherever you go.</blockquote></div></div>
      <div className="journey-visual" aria-hidden="true"><div className="journey-image-frame">{journeySteps.map((step,index)=><img loading="lazy" decoding="async" key={step.year} className={activeStep===index?"active":""} src={step.image} alt=""/>)}</div></div>
      <div className="journey-timeline" style={{"--journey-progress":progress} as CSSProperties}><ol>{journeySteps.map((step,index)=><li className={`journey-step${activeStep===index?" active":""}`} key={step.year}><span className="journey-node" aria-hidden="true"/><img loading="lazy" decoding="async" className="journey-mobile-image" src={step.image} alt=""/><span className="journey-year">{step.year}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div>
    </div>
  </section>;
}

const clientTestimonials = [
  { quote:"Add protection when you connect at cafés, airports, and hotels.", accent:"rose" },
  { quote:"Switch server locations while travelling and browse with added peace of mind.", accent:"ink" },
  { quote:"Mask your IP and add encryption to everyday internet connections.", accent:"silver" },
];

function ProjectStories() {
  return <section className="project-stories section" id="stories"><GridLines/><div className="stories-inner"><div className="stories-heading"><h2>Privacy in<br/>their words.</h2></div>
    <div className="story-cards">{clientTestimonials.map(story=><article className={`story-card testimonial-${story.accent}`} key={story.accent}><span className="testimonial-mark" aria-hidden="true">“</span><blockquote>{story.quote}</blockquote></article>)}</div>
  </div></section>;
}

const projectAnswers = [
  { question:"What does a VPN do?", answer:"A VPN creates an encrypted connection between your device and a VPN server. It can help protect your traffic on shared networks and mask your IP address from the sites you visit." },
  { question:"Can I use Traverse on public Wi-Fi?", answer:"Yes. A VPN can add encryption when you connect through shared Wi-Fi in places such as cafés, hotels, and airports. Keep your device and apps updated as well." },
  { question:"Which devices can I use?", answer:"Traverse VPN supports the devices and platforms listed on its official website and app listings. Check those listings for current compatibility and setup instructions." },
  { question:"Does Traverse VPN keep activity logs?", answer:"Traverse describes its service as no-logs. Review the current privacy policy for details about what data is collected to operate the service." },
  { question:"How much does Traverse VPN cost?", answer:"Plans include weekly, monthly, and annual options. The current listed prices are $1.49 per week, $3.99 per month, or $1.99 per month with annual billing; confirm the price in the official checkout before subscribing." },
];

function ProjectAnswerItem({ item, index }: { item: (typeof projectAnswers)[number]; index: number }) {
  const [open, setOpen] = useState(index === 0);
  const panelId = `answer-panel-${index + 1}`;

  const toggleAnswer = () => {
    const panel = document.getElementById(panelId);
    if (!panel) return;

    const opening = !open;
    const currentHeight = panel.getBoundingClientRect().height;
    const currentOpacity = Number.parseFloat(window.getComputedStyle(panel).opacity);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.killTweensOf(panel);
    setOpen(opening);

    gsap.fromTo(panel,
      { height: currentHeight, autoAlpha: Number.isFinite(currentOpacity) ? currentOpacity : 0 },
      {
        height: opening ? panel.scrollHeight : 0,
        autoAlpha: opening ? 1 : 0,
        duration: reducedMotion ? 0 : opening ? 0.48 : 0.34,
        ease: opening ? "power3.out" : "power2.inOut",
        onComplete: () => { if (opening) gsap.set(panel, { height: "auto" }); },
      },
    );
  };

  return <article className="answer-item" data-open={open}>
    <button className="answer-trigger" type="button" aria-expanded={open} aria-controls={panelId} onClick={toggleAnswer}>
      <span className="answer-number">{String(index + 1).padStart(2, "0")}</span>
      <span className="answer-question">{item.question}</span>
      <i aria-hidden="true"/>
    </button>
    <div className="answer-panel" id={panelId} aria-hidden={!open} style={{ height: index === 0 ? "auto" : 0, opacity: index === 0 ? 1 : 0 }}>
      <p>{item.answer}</p>
    </div>
  </article>;
}

function ProjectAnswers() {
  return <section className="project-answers section" id="faqs"><GridLines/><div className="answers-layout"><div className="answers-aside"><h2>Good to<br/>know.</h2><p>Quick answers about VPN privacy, connections, devices, and Traverse plans.</p><div className="answers-contact"><span>MORE ABOUT TRAVERSE?</span><a href="https://traversevpn.com/">Visit Traverse VPN <b aria-hidden="true">↗</b></a></div></div><div className="answers-list">{projectAnswers.map((item,index)=><ProjectAnswerItem item={item} index={index} key={item.question}/>)}</div></div></section>;
}

export default function Home() {
  const [annualBilling, setAnnualBilling] = useState(false);
  const mainRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
    const updateScrollTrigger = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", updateScrollTrigger);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.off("scroll", updateScrollTrigger);
      lenis.destroy();
    };
  }, []);
  useEffect(() => {
    const section = aboutRef.current;
    const main = mainRef.current;
    if (!section || !main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    main.classList.add("gsap-about-motion-ready");
    const context = gsap.context(() => {
      const headingWords = section.querySelectorAll<HTMLElement>(".about-heading h2 .about-reveal-word");

      if (headingWords.length) gsap.to(headingWords, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45,
        stagger: { each: 0.14 }, ease: "none",
        scrollTrigger: {
          trigger: section.querySelector(".about-heading h2"),
          start: "top 85%", end: "bottom 38%", scrub: 0.5, invalidateOnRefresh: true,
        },
      });
    }, section);
    return () => { context.revert(); main.classList.remove("gsap-about-motion-ready"); };
  }, []);
  useEffect(() => {
    const main = mainRef.current;
    if (!main || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const header = main.querySelector(".site-header");
      if (header) gsap.fromTo(header.querySelectorAll(".brand, .desktop-nav a, .header-cta, .menu-button"),
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07, ease: "power2.out", delay: 0.1 });
      const hero = main.querySelector(".hero-reference");
      if (hero) {
        const intro = hero.querySelectorAll(".ref-copy h1, .ref-copy > p, .ref-actions > *");
        gsap.fromTo(intro, { autoAlpha: 0, y: 26, filter: "blur(8px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.05,
          stagger: { each: 0.09, from: "start" }, ease: "power3.out", delay: 0.15,
        });
        gsap.fromTo(hero.querySelector(".hero-globe"), { autoAlpha: 0, y: 54, xPercent: -50, scale: 0.94 }, {
          autoAlpha: 1, y: 0, xPercent: -50, scale: 1, duration: 1.5, ease: "power3.out", delay: 0.25,
        });
      }

      const about = main.querySelector(".about");
      if (about) {
        gsap.fromTo(about.querySelectorAll<HTMLElement>(".about-left, .about-right"), { autoAlpha: 0, filter: "blur(8px)" }, {
          autoAlpha: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.16, ease: "power2.out",
          scrollTrigger: { trigger: about, start: "top 72%", once: true },
        });
      }

      const services = main.querySelector(".services");
      if (services) {
        const asideItems = services.querySelectorAll<HTMLElement>(".services-intro h2 span, .services-intro p");
        gsap.fromTo(asideItems, { autoAlpha: 0, y: 28, filter: "blur(6px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: services, start: "top 72%", once: true },
        });
        services.querySelectorAll<HTMLElement>(".service").forEach((service) => {
          const items = service.querySelectorAll<HTMLElement>(".service-head > span, .service-head h3, .service-images img, .service-body > div:first-child, .service-body .tags");
          gsap.fromTo(items, { autoAlpha: 0, y: 24, filter: "blur(5px)", scale: 0.985 }, {
            autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1, duration: 0.8,
            stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: service, start: "top 78%", once: true },
          });
        });
      }

      const reveals = [
        [".features", ".features-intro p, .features-heading > h2, .feature-copy-bottom > *, .feature-visual > *, .feature-expertise > *, .feature-bottom-cards > *"],
        [".n-pricing", ".n-pricing-toolbar > *, .n-plan-card"],
        [".journey-section", ".journey-intro > *, .journey-quote > *, .journey-visual, .journey-step"],
        [".project-stories", ".stories-heading h2, .story-card"],
        [".visuvate-footer", ".visuvate-footer-top > *, .visuvate-social-grid > *, .visuvate-footer-group > *, .visuvate-copyright"],
      ];

      reveals.forEach(([sectionSelector, itemSelector]) => {
        const section = main.querySelector(sectionSelector);
        const items = section?.querySelectorAll<HTMLElement>(itemSelector);
        if (!section || !items?.length) return;
        gsap.fromTo(items, { autoAlpha: 0, y: 30, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: { each: 0.1, from: "start" }, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });

      const faqs = main.querySelector<HTMLElement>(".project-answers");
      if (faqs) {
        const intro = faqs.querySelectorAll<HTMLElement>(".answers-aside h2, .answers-aside > p, .answers-contact > *");
        const rows = faqs.querySelectorAll<HTMLElement>(".answer-item");
        gsap.fromTo(intro, { autoAlpha: 0, y: 24, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.8,
          stagger: 0.1, ease: "power3.out",
          scrollTrigger: { trigger: faqs, start: "top 78%", once: true },
        });
        gsap.fromTo(rows, { autoAlpha: 0, y: 26, filter: "blur(5px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.85,
          stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: faqs, start: "top 72%", once: true },
        });
      }
    }, main);

    return () => context.revert();
  }, []);
  useEffect(() => {
    const main=mainRef.current, about=aboutRef.current;
    if(!main||!about)return;
    let frame=0;
    const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateParallax=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{if(reducedMotion.matches)return;const rect=about.getBoundingClientRect();const progress=Math.max(0,Math.min(1,(window.innerHeight-rect.top)/(window.innerHeight+rect.height)));const centered=progress-.46;const mobile=window.matchMedia("(max-width: 900px)").matches;about.querySelector<HTMLElement>(".about-left")?.style.setProperty("--about-parallax-y",`${-centered*(mobile?30:175)}px`);about.querySelector<HTMLElement>(".about-right")?.style.setProperty("--about-parallax-y",`${-centered*(mobile?60:500)}px`)});};
    updateParallax();window.addEventListener("scroll",updateParallax,{passive:true});window.addEventListener("resize",updateParallax);
    return()=>{cancelAnimationFrame(frame);window.removeEventListener("scroll",updateParallax);window.removeEventListener("resize",updateParallax)};
  },[]);
  useEffect(() => {
    const footer=document.querySelector(".visuvate-footer");
    if(!footer)return;
    const observer=new IntersectionObserver(([entry])=>document.body.classList.toggle("visuvate-footer-in-view",entry.isIntersecting),{threshold:.02});
    observer.observe(footer);
    return()=>{observer.disconnect();document.body.classList.remove("visuvate-footer-in-view")};
  },[]);
  useEffect(() => {
    const hero=document.querySelector(".hero-reference");
    if(!hero)return;
    const observer=new IntersectionObserver(([entry])=>document.body.classList.toggle("hero-in-view",entry.isIntersecting),{threshold:.01});
    observer.observe(hero);
    return()=>{observer.disconnect();document.body.classList.remove("hero-in-view")};
  },[]);
  return <main ref={mainRef}>
    <SiteHeader />
    <section className="hero hero-reference" id="home">
      <div className="hero-globe" aria-hidden="true"><GlobeStudy baseColor="#F22C59" style={{ width: "100%", height: "100%" }} /></div>
      <div className="ref-copy">
        <h1>Browse freely<br/>on any <mark>network.</mark></h1>
        <p>Traverse VPN adds a layer of protection on public Wi-Fi, masks your IP, and helps keep your browsing private at home, while travelling, and wherever you connect.</p>
        <div className="ref-actions"><a className="ref-button ref-button-primary" href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span aria-hidden="true">↗</span></a><a className="ref-button ref-button-secondary" href="#services">Explore protection <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
    <div className="bottom-glass-bar" aria-hidden="true"><div className="bottom-glass-layers">{bottomBlurLayers.map((layer) => <div key={layer.blur} style={{ backdropFilter: `blur(${layer.blur}) saturate(120%)`, WebkitBackdropFilter: `blur(${layer.blur}) saturate(120%)`, maskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)` }} />)}</div></div>

    <section className="about section" id="about" ref={aboutRef}>
      <GridLines/>
      <div className="about-images"><img loading="lazy" decoding="async" className="about-left" src="/images/vpn/photos/airport-work.webp" alt="Traveler working on a laptop at the airport"/><img loading="lazy" decoding="async" className="about-right" src="/images/vpn/photos/city-phone.webp" alt="Traveler using a phone in the city at night"/></div>
      <div className="about-heading">

        <h2><ScrollRevealWords text="Private connections"/><br className="desktop-break"/> <ScrollRevealWords text="for everyday browsing,"/><br className="desktop-break"/> <ScrollRevealWords text="wherever life takes you."/></h2>
      </div>
      <div className="about-quote"><p>Traverse VPN helps keep your connection private wherever you browse. Strong encryption and IP masking add protection on public Wi-Fi, at home, and while travelling. Connect with one tap and choose from fast servers around the world.</p></div>
    </section>

    <section className="services section" id="services" ref={servicesRef}>
      <GridLines/>
      <aside className="services-aside"><div className="services-intro"><h2><span>VPN</span><br/><span>Protection</span></h2><p>Encryption, privacy, and fast global access for the connections you use every day.</p></div></aside>
      <div className="service-list">{services.map((service) => <article className="service" key={service.number}>
        <div className="service-head"><span>{service.number}</span><h3>{service.title}</h3></div>
        <div className="service-images">{service.images.map((image, index) => <img loading="lazy" decoding="async" key={image} src={image} alt={service.alt[index]}/>)}</div>
        <div className="service-body"><div><p>{service.description}</p><div className="service-price">STARTING FROM <b>{service.price}</b></div></div><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
    </section>

    <JourneySection />

    <section className="features section" id="how-we-work">
      <GridLines />
      <div className="features-heading">
        <div className="features-intro"><p>A closer look at how Traverse helps protect your connection, mask your IP, and browse with more privacy.</p></div>
        <h2>How Traverse Protects You</h2>
      </div>
      <div className="features-cards">
        <article className="feature-copy">
          <div className="feature-copy-bottom"><h3>Privacy made practical</h3><p>Encrypt your traffic, mask your IP address, and connect with greater confidence on networks you don’t control.</p><ul><li><span>✓</span>AES-256 encrypted connection</li><li><span>✓</span><details><summary>Protection for public Wi-Fi <i>ⓘ</i></summary><p>Encryption can help protect your internet traffic when you use shared networks in cafés, hotels, airports, and other public places.</p></details></li><li><span>✓</span>Fast servers around the world</li></ul></div>
        </article>
        <article className="feature-visual" aria-label="Traverse VPN privacy features"><img loading="lazy" decoding="async" className="feature-phone" src="/images/vpn/photos/cafe-phone.webp" alt="Phone in use in a public indoor space"/>
          <div className="metric metric-retention"><span className="metric-icon red"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 19v-1a6 6 0 0 1 12 0v1zM16 5a3 3 0 0 1 0 6M18 14a4 4 0 0 1 3 4v1h-3"/></svg></span><span><b>1M+</b><small>Users worldwide</small></span></div>
          <div className="metric metric-response"><span className="metric-icon dark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span><b>Fast Servers <i></i></b><small>50+ locations</small></span></div>
          <div className="metric metric-conversion"><span className="metric-icon black"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 3 7-8M14 6h6v6"/></svg></span><span><b>AES-256</b><small>Encryption</small></span></div>
        </article>
        <article className="feature-expertise"><div className="expertise-top"><b>[ PRIVACY ]</b></div><div className="expertise-copy"><strong>50+</strong><span>Fast<br/>Server<br/>Locations</span></div></article>
      </div>
      <div className="feature-bottom-cards">
        <article className="bottom-feature simplicity-card">
          <img loading="lazy" decoding="async" className="bottom-feature-art" src="/images/vpn/photos/cafe-laptop.webp" alt="Person browsing on a laptop in a café"/>
          <div className="simplicity-copy"><div className="bottom-feature-copy"><h4>Encryption for every connection.</h4><p>AES-256 encryption helps protect your internet traffic as it travels between your device and the VPN server.</p></div></div>
        </article>
        <article className="bottom-feature growth-card">
          <header><h3>Global Access</h3></header>
          <img loading="lazy" decoding="async" className="bottom-feature-art" src="/images/vpn/photos/city-phone.webp" alt="Traveler using a phone while out in the city"/>
          <div className="growth-stat"><span>↗ &nbsp; GLOBAL NETWORK</span><strong>50+</strong><p>Fast server locations for your connection</p></div>
        </article>
        <article className="bottom-feature execution-card">
          <img loading="lazy" decoding="async" className="bottom-feature-art" src="/images/vpn/photos/airport-work.webp" alt="Traveler using a laptop while waiting at an airport"/>
          <div className="execution-copy"><div className="bottom-feature-copy"><h4>Easy to Connect</h4><p>Choose a server. Tap connect.<br/>Browse with more privacy.</p></div></div>
        </article>
      </div>
    </section>

    <ProjectStories />

    <section className="pricing section n-pricing" id="pricing">
      <GridLines />
      <div className="n-pricing-inner">
        <div className="n-pricing-toolbar"><h2>Packages</h2><div className={`n-billing-control${annualBilling ? " annual" : ""}`} role="group" aria-label="Billing period"><span className="n-billing-indicator" aria-hidden="true"/><button type="button" className={!annualBilling ? "active" : ""} aria-pressed={!annualBilling} onClick={() => setAnnualBilling(false)}>Monthly</button><button type="button" className={annualBilling ? "active" : ""} aria-pressed={annualBilling} onClick={() => setAnnualBilling(true)}>Annual</button></div></div>
        <div className="n-plan-grid">{pricingPlans.map((plan, index) => {
          const price = annualBilling ? plan.yearly : plan.monthly;
          const interval = plan.name === "Weekly" ? "week" : "month";
          const annualSavings = Math.max(0, (Number(plan.monthly) - Number(plan.yearly)) * 12);
          return <article className={`n-plan-card${index === 1 ? " n-plan-card-featured" : ""}`} key={plan.name}>
            <div className="n-plan-main">
              <div className="n-plan-kicker"><span>00{index + 1}. /</span><span>PRIVATE CONNECTION</span></div>
              <div className="n-plan-title-row"><h3>{plan.name === "Yearly" ? "Annual" : plan.name} Plan</h3>{index === 1 && <span className="n-popular">Popular</span>}</div>
              <p className="n-plan-description">{plan.audience}.</p>
              <div className="n-plan-price"><span>$</span><strong>{price}</strong><small>/{interval}{annualBilling && interval === "month" ? ", billed annually" : ""}</small></div>
            </div>
            <div className="n-plan-details"><span className="n-list-label">What's included</span><ul>{plan.features.slice(0, 4).map(feature => <li key={feature}>{feature}</li>)}</ul><span className="n-list-label n-extras-label">Extras</span><ul>{plan.features.slice(4).map(feature => <li key={feature}>{feature}</li>)}</ul></div>
            <div className="n-plan-footer"><a href="https://links.traversevpn.com/s/Ugp0lRJV">Buy plan <span aria-hidden="true">↗</span></a><p className={`n-plan-savings${annualSavings ? " has-savings" : ""}`}>{annualSavings ? <><strong>Save ${annualSavings.toFixed(2)}/year</strong><span>with annual billing</span></> : <span>No annual savings on this plan</span>}</p></div>
          </article>;
        })}</div>
      </div>
    </section>

    <ProjectAnswers />
    <footer className="visuvate-footer">
      <div className="visuvate-footer-wordmark" aria-hidden="true">Traverse</div>
      <div className="visuvate-footer-top"><p className="footer-eyebrow">PROTECTION FOR EVERY CONNECTION</p><h2>Connect Securely.<br/>Browse Freely.</h2><div className="visuvate-footer-actions"><a className="footer-pill footer-pill-muted" href="#services">Explore features <span>↗</span></a><a className="footer-pill footer-pill-light" href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span>↗</span></a></div></div>
      <FooterHands />
      <div className="visuvate-footer-content"><div className="visuvate-social-grid"><a href="https://traversevpn.com/" aria-label="Traverse VPN">◎ <span>Traverse VPN</span><i>↗</i></a><a href="https://traversevpn.com/" aria-label="VPN apps">in <span>VPN apps</span><i>↗</i></a><a href="https://traversevpn.com/" aria-label="Privacy features">𝕏 <span>Privacy</span><i>↗</i></a><a href="https://traversevpn.com/" aria-label="VPN support">◉ <span>Support</span><i>↗</i></a></div>
        <div className="visuvate-footer-columns"><div className="visuvate-footer-group"><h3>Traverse VPN</h3><a href="#about">About Traverse</a><a href="#services">VPN features</a><a href="https://traversevpn.com/">Privacy policy</a><a href="https://traversevpn.com/">Terms of service</a></div><div className="visuvate-footer-group"><h3>Protection</h3><a href="#services">AES-256 encryption</a><a href="#services">IP masking</a><a href="#services">Public Wi-Fi</a></div><div className="visuvate-footer-group"><h3>Resources</h3><a href="#faqs">VPN FAQs</a><a href="#pricing">Plans and pricing</a><a href="#journey">Getting started</a></div><div className="visuvate-footer-group visuvate-contact"><h3>Connect</h3><a href="https://traversevpn.com/">Visit traversevpn.com</a><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get the app</a><span>Private connections</span><span>For your everyday devices</span></div></div><div className="visuvate-copyright">© 2026 Traverse VPN. All rights reserved.</div>
      </div>
    </footer>
  </main>;
}
