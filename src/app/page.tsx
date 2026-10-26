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
    images: ["/images/vpn/photos/cafe-laptop.jpg", "/images/vpn/photos/night-phone.jpg"], alt: ["Traveler using a laptop in a café", "Person using a phone in a city at night"]
  },
  {
    number: "002.", title: "Fast Global Server Access",
    description: "Choose from 50+ fast servers to reach content around the world. Enjoy unlimited bandwidth and a connection built for everyday browsing.",
    price: "50+ servers", tags: ["Global locations", "Unlimited bandwidth", "Up to 1 Gbps", "No throttling", "Streaming", "Low latency"],
    images: ["/images/vpn/photos/airport-work.jpg", "/images/vpn/photos/city-phone.jpg"], alt: ["Traveler working at an airport gate", "Traveler using a phone on a city street"]
  },
  {
    number: "003.", title: "Safer Public Wi-Fi",
    description: "Connect with more confidence at airports, cafés, hotels, and other shared networks. Automatic protection helps keep your data private when you connect.",
    price: "Every network", tags: ["Auto-connect", "Wi-Fi protection", "Encrypted traffic", "Hide your IP", "Private browsing", "Travel ready"],
    images: ["/images/vpn/photos/cafe-collaboration.jpg", "/images/vpn/photos/cafe-phone.jpg"], alt: ["People using laptops in a café", "Phone in use in a public indoor space"]
  },
  {
    number: "004.", title: "No-Logs Privacy",
    description: "Traverse VPN says it does not collect or share your browsing activity. Open-source protocols and a published no-logs policy help make its approach easier to review.",
    price: "Privacy first", tags: ["No-logs policy", "OpenVPN", "WireGuard", "Independent audits", "No data sharing", "Zero knowledge"],
    images: ["/images/vpn/photos/night-phone.jpg", "/images/vpn/photos/travel-desk.jpg"], alt: ["Phone in a city at night", "Travel workspace with a laptop and passport"]
  },
];

function GridLines() {
  return <div className="grid-lines" aria-hidden="true"><i/><i/><i/><i/></div>;
}

function SectionLabel({ children }: { children: string }) {
  return <div className="section-label"><span className="label-mark" aria-hidden="true"><i/><i/><i/><i/></span><span>[</span><b>VPN</b><i>—</i><b>{children}</b><span>]</span></div>;
}

function Plus() { return <span className="plus" aria-hidden="true">+</span>; }

function ScrollRevealWords({ text }: { text: string }) {
  return <>{text.split(/(\s+)/).map((part, index) => part.trim()
    ? <span className="about-reveal-word" key={index}>{part}</span>
    : part)}</>;
}

function ScrollRevealParagraph({ text }: { text: string }) {
  return <p><ScrollRevealWords text={text}/></p>;
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
    audience: "Quick protection for a short trip", name: "Weekly", monthly: "1.49", yearly: "1.49", plan: "Weekly", seats: "All devices", image: "/images/vpn/photos/city-phone.jpg", save: "One week of protection",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
  {
    audience: "Flexible month-to-month privacy", name: "Monthly", monthly: "3.99", yearly: "1.99", plan: "Monthly", seats: "All devices", image: "/images/vpn/photos/cafe-laptop.jpg", save: "Cancel anytime",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
  {
    audience: "Best value for year-round security", name: "Yearly", monthly: "3.99", yearly: "1.99", plan: "Annual", seats: "All devices", image: "/images/vpn/photos/airport-work.jpg", save: "Save 67% with annual billing",
    features: ["AES-256 encryption", "IP masking", "DNS leak protection", "No WebRTC leaks", "Public Wi-Fi protection", "Kill Switch", "Unlimited bandwidth"],
  },
];

const journeySteps = [
  { year: "STEP 01", title: "Choose your\nTraverse plan", description: "Pick weekly, monthly, or annual protection for the way you use the internet.", image: "/images/vpn/photos/cafe-laptop.jpg" },
  { year: "STEP 02", title: "Connect to a\nfast server", description: "Choose a location from 50+ fast servers and connect with one tap.", image: "/images/vpn/photos/airport-work.jpg" },
  { year: "STEP 03", title: "Browse with\nmore privacy", description: "Your IP is masked and your internet traffic is protected with encryption.", image: "/images/vpn/photos/city-phone.jpg" },
  { year: "STAY PROTECTED", title: "Carry privacy\nwith you", description: "Use Traverse VPN across your devices at home, at work, and on the go.", image: "/images/vpn/photos/cafe-collaboration.jpg" },
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
      <div className="journey-left"><div className="journey-intro"><SectionLabel>GETTING STARTED</SectionLabel><h2>Your<br/>Journey</h2><p>From choosing a plan to browsing with greater privacy, Traverse keeps getting started simple.</p></div><div className="journey-quote"><div className="journey-quote-mark" aria-hidden="true">“</div><blockquote>Connect in a tap, protect your<br className="journey-desktop-break"/> traffic with strong encryption, and<br className="journey-desktop-break"/> take a more private connection<br className="journey-desktop-break"/> wherever you go.</blockquote><div className="journey-person"><img src="/images/journey/erik.png" alt=""/><div><strong>Traverse VPN</strong><span>Privacy for<br/><b>Every connection</b></span></div></div></div></div>
      <div className="journey-visual" aria-hidden="true"><div className="journey-image-frame">{journeySteps.map((step,index)=><img key={step.year} className={activeStep===index?"active":""} src={step.image} alt=""/>)}</div></div>
      <div className="journey-timeline" style={{"--journey-progress":progress} as CSSProperties}><ol>{journeySteps.map((step,index)=><li className={`journey-step${activeStep===index?" active":""}`} key={step.year}><span className="journey-node" aria-hidden="true"/><img className="journey-mobile-image" src={step.image} alt=""/><span className="journey-year">{step.year}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></div>
    </div>
  </section>;
}

const clientTestimonials = [
  { number:"01", type:"PUBLIC WI-FI", quote:"Sample customer feedback: Traverse helps protect my connection when I’m using Wi-Fi at cafés, airports, and hotels.", role:"VPN user", accent:"rose" },
  { number:"02", type:"GLOBAL ACCESS", quote:"Sample customer feedback: Switching server locations is simple, and I can browse while travelling with more peace of mind.", role:"Frequent traveller", accent:"ink" },
  { number:"03", type:"ONLINE PRIVACY", quote:"Sample customer feedback: I wanted an easy way to mask my IP and add encryption to my everyday internet connection.", role:"Privacy minded user", accent:"silver" },
];

function ProjectStories() {
  return <section className="project-stories section" id="stories"><GridLines/><div className="stories-inner"><div className="stories-heading"><div><SectionLabel>VPN USER STORIES</SectionLabel><h2>Privacy in<br/>their words.</h2></div><div className="stories-deck"><p>Hear how a VPN can help people feel more private on public Wi-Fi, while travelling, and in everyday browsing. These are sample stories; replace them with approved customer feedback.</p><span>SAMPLE TESTIMONIALS · REPLACE BEFORE PUBLISHING</span></div></div>
    <div className="story-cards">{clientTestimonials.map(story=><article className={`story-card testimonial-${story.accent}`} key={story.number}><div className="story-meta"><span>{story.number} / {story.type}</span><span>SAMPLE</span></div><span className="testimonial-mark" aria-hidden="true">“</span><blockquote>{story.quote}</blockquote><div className="story-attribution"><span className="story-avatar" aria-hidden="true">{story.number}</span><span><b>Sample VPN user</b><small>{story.role} · Sample story</small></span><i>PREVIEW</i></div></article>)}</div><div className="stories-foot"><span>HAVE A STORY TO SHARE?</span><a href="https://traversevpn.com/">Explore Traverse VPN <b aria-hidden="true">↗</b></a></div>
  </div></section>;
}

const projectAnswers = [
  { question:"What does a VPN do?", answer:"A VPN creates an encrypted connection between your device and a VPN server. It can help protect your traffic on shared networks and mask your IP address from the sites you visit." },
  { question:"Can I use Traverse on public Wi-Fi?", answer:"Yes. A VPN can add encryption when you connect through shared Wi-Fi in places such as cafés, hotels, and airports. Keep your device and apps updated as well." },
  { question:"Which devices can I use?", answer:"Traverse VPN supports the devices and platforms listed on its official website and app listings. Check those listings for current compatibility and setup instructions." },
  { question:"Does Traverse VPN keep activity logs?", answer:"Traverse describes its service as no-logs. Review the current privacy policy for details about what data is collected to operate the service." },
  { question:"How much does Traverse VPN cost?", answer:"Plans include weekly, monthly, and annual options. The current listed prices are $1.49 per week, $3.99 per month, or $1.99 per month with annual billing; confirm the price in the official checkout before subscribing." },
];

function ProjectAnswers() {
  return <section className="project-answers section" id="faqs"><GridLines/><div className="answers-layout"><div className="answers-aside"><SectionLabel>VPN FAQS</SectionLabel><h2>Good to<br/>know.</h2><p>Quick answers about VPN privacy, connections, devices, and Traverse plans.</p><div className="answers-contact"><span>MORE ABOUT TRAVERSE?</span><a href="https://traversevpn.com/">Visit Traverse VPN <b aria-hidden="true">↗</b></a></div></div><div className="answers-list">{projectAnswers.map((item,index)=><details className="answer-item" key={item.question} open={index===0}><summary><span className="answer-number">{String(index+1).padStart(2,"0")}</span><span className="answer-question">{item.question}</span><i aria-hidden="true"/></summary><p>{item.answer}</p></details>)}</div></div></section>;
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
      const paragraphWords = section.querySelectorAll<HTMLElement>(".about-quote .about-reveal-word");

      if (headingWords.length) gsap.to(headingWords, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45,
        stagger: { each: 0.14 }, ease: "none",
        scrollTrigger: {
          trigger: section.querySelector(".about-heading h2"),
          start: "top 85%", end: "bottom 38%", scrub: 0.5, invalidateOnRefresh: true,
        },
      });

      if (paragraphWords.length) gsap.to(paragraphWords, {
        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.5,
        stagger: { each: 0.018 }, ease: "none",
        scrollTrigger: {
          trigger: section.querySelector(".about-quote"),
          start: "top 92%", end: "bottom 18%", scrub: 0.8, invalidateOnRefresh: true,
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
        const intro = hero.querySelectorAll(".ref-hint, .ref-announcement, .ref-copy h1, .ref-copy > p, .ref-actions > *");
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
        const items = about.querySelectorAll<HTMLElement>(".about-projects, .about-heading .section-label, .about-meta");
        gsap.fromTo(items, { autoAlpha: 0, y: 22, filter: "blur(6px)" }, {
          autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.9,
          stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: about, start: "top 72%", once: true },
        });
        gsap.fromTo(about.querySelectorAll<HTMLElement>(".about-left, .about-right"), { autoAlpha: 0, filter: "blur(8px)" }, {
          autoAlpha: 1, filter: "blur(0px)", duration: 1.2, stagger: 0.16, ease: "power2.out",
          scrollTrigger: { trigger: about, start: "top 72%", once: true },
        });
      }

      const services = main.querySelector(".services");
      if (services) {
        const asideItems = services.querySelectorAll<HTMLElement>(".services-aside .section-label, .services-intro h2 span, .services-intro p, .scope-cta > *");
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
        gsap.fromTo(services.querySelectorAll<HTMLElement>(".availability > *"), { autoAlpha: 0, y: 14 }, {
          autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power2.out",
          scrollTrigger: { trigger: services, start: "bottom 80%", once: true },
        });
      }

      const reveals = [
        [".features", ".features-intro .section-label, .features-intro p, .features-heading > h2, .feature-copy-bottom > *, .feature-visual > *, .feature-expertise > *, .feature-bottom-cards > *"],
        [".n-pricing", ".n-pricing-intro > *, .n-pricing-toolbar > *, .n-plan-card"],
        [".journey-section", ".journey-intro > *, .journey-quote > *, .journey-visual, .journey-step"],
        [".project-stories", ".stories-heading .section-label, .stories-heading h2, .stories-deck > *, .story-card, .stories-foot > *"],
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
        const intro = faqs.querySelectorAll<HTMLElement>(".answers-aside .section-label, .answers-aside h2, .answers-aside > p, .answers-contact > *");
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
      <p className="ref-hint"><i aria-hidden="true"/> VPN PROTECTION · EVERYWHERE YOU CONNECT</p>
      <div className="ref-announcement"><i aria-hidden="true"/> PROTECT EVERY CONNECTION <span>·</span> ONE TAP TO CONNECT</div>
      <div className="ref-copy">
        <h1>Browse freely<br/>on any <mark>network.</mark></h1>
        <p>Traverse VPN adds a layer of protection on public Wi-Fi, masks your IP, and helps keep your browsing private at home, while travelling, and wherever you connect.</p>
        <div className="ref-actions"><a className="ref-button ref-button-primary" href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span aria-hidden="true">↗</span></a><a className="ref-button ref-button-secondary" href="#services">Explore protection <span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
    <div className="bottom-glass-bar" aria-hidden="true"><div className="bottom-glass-layers">{bottomBlurLayers.map((layer) => <div key={layer.blur} style={{ backdropFilter: `blur(${layer.blur}) saturate(120%)`, WebkitBackdropFilter: `blur(${layer.blur}) saturate(120%)`, maskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)`, WebkitMaskImage: `linear-gradient(to bottom, transparent 0%, transparent ${layer.from}, black ${layer.to}, black 100%)` }} />)}</div></div>

    <section className="about section" id="about" ref={aboutRef}>
      <GridLines/>
      <div className="about-projects">1M+ USERS</div>
      <div className="about-images"><img className="about-left" src="/images/vpn/photos/airport-work.jpg" alt="Traveler working on a laptop at the airport"/><img className="about-right" src="/images/vpn/photos/city-phone.jpg" alt="Traveler using a phone in the city at night"/></div>
      <div className="about-heading">
        <SectionLabel>WHY TRAVERSE</SectionLabel>
        <h2><ScrollRevealWords text="Private connections"/><br className="desktop-break"/> <ScrollRevealWords text="for everyday browsing,"/><br className="desktop-break"/> <ScrollRevealWords text="wherever life takes you."/></h2>
      </div>
      <div className="about-meta">VPN PROTECTION</div>
      <div className="about-quote"><ScrollRevealParagraph text="Traverse VPN helps keep your connection private wherever you browse. Strong encryption and IP masking add protection on public Wi-Fi, at home, and while travelling. Connect with one tap and choose from fast servers around the world."/></div>
    </section>

    <section className="services section" id="services" ref={servicesRef}>
      <GridLines/>
      <aside className="services-aside"><SectionLabel>VPN FEATURES</SectionLabel><div className="services-intro"><h2><span>VPN</span><br/><span>Protection</span></h2><p>Encryption, privacy, and fast global access for the connections you use every day.</p></div><div className="scope-cta"><b>50+ FAST SERVERS WORLDWIDE</b><p>Private browsing, wherever you connect.</p><a className="project-button" href="https://links.traversevpn.com/s/Ugp0lRJV"><span>GET TRAVERSE VPN</span><Plus/></a></div></aside>
      <div className="service-list">{services.map((service) => <article className="service" key={service.number}>
        <div className="service-head"><span>{service.number}</span><h3>{service.title}</h3></div>
        <div className="service-images">{service.images.map((image, index) => <img key={image} src={image} alt={service.alt[index]}/>)}</div>
        <div className="service-body"><div><p>{service.description}</p><div className="service-price">STARTING FROM <b>{service.price}</b></div></div><div className="tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
      </article>)}</div>
      <div className="availability"><span>STRONG <b>AES-256</b></span><span>BUILT FOR <b>YOUR PRIVACY</b></span></div>
    </section>

    <section className="features section" id="how-we-work">
      <GridLines />
      <div className="features-heading">
        <div className="features-intro"><SectionLabel>VPN PROTECTION</SectionLabel><p>A closer look at how Traverse helps protect your connection, mask your IP, and browse with more privacy.</p></div>
        <h2>How Traverse Protects You</h2>
      </div>
      <div className="features-cards">
        <article className="feature-copy">
          <div className="feature-copy-bottom"><h3>Privacy made practical</h3><p>Encrypt your traffic, mask your IP address, and connect with greater confidence on networks you don’t control.</p><ul><li><span>✓</span>AES-256 encrypted connection</li><li><span>✓</span><details><summary>Protection for public Wi-Fi <i>ⓘ</i></summary><p>Encryption can help protect your internet traffic when you use shared networks in cafés, hotels, airports, and other public places.</p></details></li><li><span>✓</span>Fast servers around the world</li></ul></div>
        </article>
        <article className="feature-visual" aria-label="Traverse VPN privacy features"><img className="feature-phone" src="/images/vpn/photos/cafe-phone.jpg" alt="Phone in use in a public indoor space"/>
          <div className="metric metric-retention"><span className="metric-icon red"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 19v-1a6 6 0 0 1 12 0v1zM16 5a3 3 0 0 1 0 6M18 14a4 4 0 0 1 3 4v1h-3"/></svg></span><span><b>1M+</b><small>Users worldwide</small></span></div>
          <div className="metric metric-response"><span className="metric-icon dark"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 20 6v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span><b>Fast Servers <i></i></b><small>50+ locations</small></span></div>
          <div className="metric metric-conversion"><span className="metric-icon black"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 17 6-6 4 3 7-8M14 6h6v6"/></svg></span><span><b>AES-256</b><small>Encryption</small></span></div>
        </article>
        <article className="feature-expertise"><div className="expertise-top"><b>[ PRIVACY ]</b></div><div className="expertise-copy"><strong>50+</strong><span>Fast<br/>Server<br/>Locations</span></div></article>
      </div>
      <div className="feature-bottom-cards">
        <article className="bottom-feature simplicity-card">
          <header><h3>Encryption</h3></header>
          <img className="bottom-feature-art" src="/images/vpn/photos/cafe-laptop.jpg" alt="Person browsing on a laptop in a café"/>
          <div className="bottom-feature-copy"><h4>Private by default.</h4><p>AES-256 encryption helps protect your internet traffic as it travels between your device and the VPN server.</p></div>
        </article>
        <article className="bottom-feature growth-card">
          <header><h3>Global Access</h3></header>
          <img className="bottom-feature-art" src="/images/vpn/photos/city-phone.jpg" alt="Traveler using a phone while out in the city"/>
          <div className="growth-stat"><span>↗ &nbsp; GLOBAL NETWORK</span><strong>50+</strong><p>Fast server locations for your connection</p></div>
        </article>
        <article className="bottom-feature execution-card">
          <header><b>Traverse VPN <i className="mini-mark"><i/><i/><i/><i/></i></b><span className="launch-pill"><i><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></i><span><strong>One tap</strong><small>Connect</small></span></span></header>
          <img className="bottom-feature-art" src="/images/vpn/photos/airport-work.jpg" alt="Traveler using a laptop while waiting at an airport"/>
          <div className="bottom-feature-copy"><h4>Easy to Connect</h4><p>Choose a server. Tap connect.<br/>Browse with more privacy.</p></div>
        </article>
      </div>
    </section>

    <ProjectStories />

    <section className="pricing section n-pricing" id="pricing">
      <GridLines />
      <div className="n-pricing-inner">
        <div className="n-pricing-intro"><SectionLabel>PRICING</SectionLabel><p>Simple protection plans for your devices, wherever life takes you.</p></div>
        <div className="n-pricing-toolbar"><h2>Packages</h2><div className="n-billing-control" aria-label="Billing period"><button type="button" className={!annualBilling ? "active" : ""} aria-pressed={!annualBilling} onClick={() => setAnnualBilling(false)}>Monthly</button><button type="button" className={annualBilling ? "active" : ""} aria-pressed={annualBilling} onClick={() => setAnnualBilling(true)}>Annual</button><span>Save up to 50%</span></div></div>
        <div className="n-plan-grid">{pricingPlans.map((plan, index) => {
          const price = annualBilling ? plan.yearly : plan.monthly;
          const interval = plan.name === "Weekly" ? "week" : "month";
          return <article className={`n-plan-card${index === 1 ? " n-plan-card-featured" : ""}`} key={plan.name}>
            <div className="n-plan-main">
              <div className="n-plan-kicker"><span>00{index + 1}. /</span><span>PRIVATE CONNECTION</span></div>
              <div className="n-plan-title-row"><h3>{plan.name === "Yearly" ? "Annual" : plan.name} Plan</h3>{index === 1 && <span className="n-popular">Popular</span>}</div>
              <p className="n-plan-description">{plan.audience}.</p>
              <div className="n-plan-price"><span>$</span><strong>{price}</strong><small>/{interval}{annualBilling && interval === "month" ? ", billed annually" : ""}</small></div>
            </div>
            <div className="n-plan-details"><span className="n-list-label">What's included</span><ul>{plan.features.slice(0, 4).map(feature => <li key={feature}>{feature}</li>)}</ul><span className="n-list-label n-extras-label">Extras</span><ul>{plan.features.slice(4).map(feature => <li key={feature}>{feature}</li>)}</ul></div>
            <div className="n-plan-footer"><a href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN <span aria-hidden="true">↗</span></a><p>{plan.save}</p></div>
          </article>;
        })}</div>
      </div>
    </section>

    <JourneySection />
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
