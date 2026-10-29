"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  ["IT Directors and Infrastructure Managers", "Responsible for deploying and maintaining secure access across teams and locations. Centralized provisioning reduces per-device overhead and simplifies lifecycle management."],
  ["CISOs and Security Architects", "Responsible for organizational access policies and security posture alignment. Role-based access control and encrypted routing support enforceable access boundaries."],
  ["CTOs and Technical Decision Makers", "Responsible for infrastructure investment decisions and long-term architecture alignment. Traverse VPN integrates into existing environments without requiring structural redesign."],
  ["Procurement and Compliance Stakeholders", "Responsible for validating vendor alignment with governance requirements. Enterprise deployment provides documented access controls and structured implementation planning."],
];
const expectations = [
  ["Centralized Provisioning and Access Management", "Administrators create users, assign permissions, and revoke access from a single interface instead of configuring individual endpoints."],
  ["Role-Based Access Control", "Users access only the systems required for their role. This supports security segmentation and regulatory alignment."],
  ["Multi-Site Connectivity", "Physical locations operate as a connected infrastructure layer rather than isolated networks requiring individual routing configuration."],
  ["Stable Performance Under Concurrent Load", "Enterprise VPN must support distributed access across device types and geographies without degrading application responsiveness."],
  ["Custom Deployment Planning", "Enterprise environments vary widely across cloud models, hybrid infrastructure structures, and regulatory conditions. Traverse VPN supports deployment planning aligned to organization-specific infrastructure requirements rather than requiring adaptation to rigid templates."],
  ["Scalable Corporate VPN Deployment", "Enterprise scalability includes the ability to add users, offices, and infrastructure environments without redesigning access architecture. New users are provisioned centrally. Locations integrate through persistent routing structure. Environments extend through existing deployment configuration."],
  ["High-Performance Infrastructure", "Enterprise VPN infrastructure must sustain stable performance under concurrency. Traverse VPN routing architecture supports distributed teams accessing business-critical applications without introducing workflow disruption that encourages bypass behavior."],
];
const support = [
  ["Technical Onboarding Support", "Technical assistance is available during the initial deployment to help the VPN integrate with existing infrastructure. This covers configuration, integration, and validation before the organization moves to full operational use."],
  ["Technical Consultation", "Before deployment begins, organizations can schedule a technical consultation to discuss infrastructure requirements, deployment scenarios, and configurations that suit their environment."],
  ["Enterprise Pricing Consultation", "Custom pricing is developed around organizational requirements. The consultation covers seat requirements, deployment scope, and custom configuration needs."],
  ["Deployment Support", "Support is available throughout rollout to address integration challenges, resolve configuration issues, and help ensure deployment meets operational requirements."],
];
const questions = [
  ["Who should choose the enterprise plan?", "Organizations needing centralized provisioning, role-based permissions, or multi-location connectivity may benefit from enterprise deployment architecture."],
  ["What does centralized management include?", "It brings user provisioning and access management into a single administrator workflow, rather than requiring configuration on each endpoint."],
  ["Can Traverse VPN connect multiple office locations?", "Multi-site connectivity can be discussed during a technical consultation, based on your infrastructure and deployment requirements."],
  ["How is contractor access handled?", "Access policies can be planned around roles and permissions, so people receive access aligned with their responsibilities."],
  ["Can Traverse VPN support migration from an existing VPN?", "A consultation can review your current setup and determine a deployment plan that fits your environment."],
  ["What support level do enterprise customers receive?", "Support options include technical onboarding, technical consultation, custom pricing consultation, and help throughout deployment."],
  ["Is annual billing required?", "Enterprise pricing is tailored to seat requirements, deployment scope, and configuration needs. Discuss billing during your sales consultation."],
  ["How does Traverse VPN support compliance workflows?", "Role-based access control and documented access planning can support governance workflows. Requirements vary, so review them with your security and compliance teams."],
];

export default function EnterpriseContent() {
  const rootRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".enterprise-hero .blog-eyebrow,.enterprise-hero h1,.enterprise-hero-copy > *, .enterprise-hero-cta", { autoAlpha: 0, y: 25, filter: "blur(6px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .8, stagger: .1, ease: "power3.out" });
      root.querySelectorAll<HTMLElement>(".enterprise-reveal").forEach((section) => {
        gsap.fromTo(section.querySelectorAll(".enterprise-item, h2, .enterprise-section-head > p, .enterprise-audience-copy > p, .enterprise-table-card, .enterprise-support-item, .enterprise-faq-item"), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: .65, stagger: .055, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return <section ref={rootRef} className="enterprise-content">
    <header className="enterprise-hero"><div className="enterprise-orbit" aria-hidden="true"/><p className="blog-eyebrow"><span/> TRAVERSE VPN <i>/</i> ENTERPRISE</p><h1>Built for the teams<br/>that own <span>infrastructure risk.</span></h1><div className="enterprise-hero-copy"><p>Traverse VPN provides IT teams and security leaders with a secure, scalable foundation for remote access, multi-site connectivity, and centralized network control. Whether your workforce operates across cities or continents, enterprise infrastructure requires more than consumer-grade VPN subscriptions repackaged for teams.</p><p>Traverse VPN's enterprise architecture supports distributed teams, multiple access environments, and compliance-driven security expectations that require documented and auditable access control rather than best-effort connectivity.</p><a className="enterprise-hero-cta" href="https://traversevpn.com/contact-us">Contact Sales <span aria-hidden="true">↗</span></a></div><span className="enterprise-hero-caption">01 / SECURE ACCESS AT ORGANIZATIONAL SCALE</span></header>

    <section className="enterprise-audience enterprise-reveal"><div><p className="blog-eyebrow"><span/> WHO IT'S FOR</p><h2>Built for the teams<br/>that own infrastructure risk.</h2></div><div className="enterprise-audience-copy"><p>Enterprise VPN is not a bulk license extension of a consumer product category. It is a separate infrastructure layer designed for centralized deployment, policy-based access control, and operational scalability.</p><p className="enterprise-overline">Traverse VPN Enterprise is designed for:</p></div><div className="enterprise-audience-grid">{audiences.map(([title, text], index)=><article className="enterprise-item" key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="enterprise-problem enterprise-reveal"><div className="enterprise-section-head"><p className="blog-eyebrow"><span/> THE CHALLENGE</p><h2>The organizational VPN problem most vendors don't explain clearly.</h2><p>Many organizations already operate VPN infrastructure. The challenge is not whether a VPN exists. The challenge is whether the architecture still matches the organization using it.</p></div><div className="enterprise-problem-grid"><article className="enterprise-table-card"><span>01 / PROBLEM</span><h3>Growing complexity</h3><p>Teams, applications, and locations multiply while access remains difficult to manage consistently.</p></article><article className="enterprise-table-card"><span>02 / OPERATIONAL REALITY</span><h3>Disconnected systems</h3><p>Manual per-device work and fragmented permissions make everyday administration harder.</p></article><article className="enterprise-table-card"><span>03 / ORGANIZATIONAL IMPACT</span><h3>Access gaps</h3><p>Unclear ownership and inconsistent controls can create operational and security risk.</p></article></div></section>

    <section className="enterprise-expectations enterprise-reveal"><div><p className="blog-eyebrow"><span/> THE INFRASTRUCTURE</p><h2>What enterprise VPN infrastructure is expected to provide today.</h2></div><div className="enterprise-expectation-list">{expectations.map(([title,text],index)=><article className="enterprise-item" key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div><b aria-hidden="true">↗</b></article>)}</div></section>

    <section className="enterprise-security enterprise-reveal"><div><p className="blog-eyebrow"><span/> LAYERED PROTECTION</p><h2>Enterprise security model</h2><p>Enterprise VPN security operates as a layered system rather than a single mechanism.</p></div><div className="enterprise-security-grid"><article className="enterprise-table-card"><span>SECURITY LAYER</span><h3>Encrypted connections</h3><p>Protect data in transit as teams connect to business resources.</p></article><article className="enterprise-table-card"><span>PROTECTION PROVIDED</span><h3>Access boundaries</h3><p>Use roles and permissions to align access with organizational responsibilities.</p></article><article className="enterprise-table-card"><span>RISK REDUCED</span><h3>Exposure and gaps</h3><p>Plan consistent access across people, devices, and locations.</p></article></div></section>

    <section className="enterprise-support enterprise-reveal"><div><p className="blog-eyebrow"><span/> IMPLEMENTATION SUPPORT</p><h2>Support available to Traverse VPN Enterprise customers.</h2></div><div className="enterprise-support-list">{support.map(([title,text],index)=><article className="enterprise-support-item" key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <section className="enterprise-faq enterprise-reveal"><div><p className="blog-eyebrow"><span/> YOUR QUESTIONS, COVERED</p><h2>Good to<br/>know.</h2></div><div className="enterprise-faq-list">{questions.map(([question,answer],index)=><details className="enterprise-faq-item" key={question}><summary><span>{question}</span><i>{String(index+1).padStart(2,"0")}</i></summary><p>{answer}</p></details>)}</div></section>

    <section className="enterprise-final"><p className="blog-eyebrow"><span/> START WITH A CONVERSATION</p><h2>Take the next step toward a secure organizational access layer.</h2><p>Enterprise VPN deployment begins with a structured consultation covering infrastructure requirements, deployment scope, and access architecture planning.</p><a href="https://traversevpn.com/contact-us">Contact Sales <span aria-hidden="true">↗</span></a></section>
    <footer className="feature-page-footer"><a className="feature-footer-brand" href="/#home"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><p>Secure access planned around the way your organization works.</p><a href="https://traversevpn.com/contact-us">Contact sales <span aria-hidden="true">↗</span></a></footer>
  </section>;
}
