"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogMotion() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>(".blog-page");
    if (!page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".blog-hero-content > *", { autoAlpha: 0, y: 22, filter: "blur(4px)" }, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: .72, stagger: .08, ease: "power3.out", delay: .08 });
      gsap.fromTo(".blog-hero-orbit", { autoAlpha: 0, scale: .94 }, { autoAlpha: 1, scale: 1, duration: 1, ease: "power2.out", delay: .12 });
      gsap.fromTo(".blog-hero-index", { autoAlpha: 0, x: 12 }, { autoAlpha: 1, x: 0, duration: .55, ease: "power2.out", delay: .42 });
      [".blog-stories-heading", ".blog-controls", ".blog-card", ".blog-newsletter > *", ".blog-footer > *"].forEach((selector) => {
        page.querySelectorAll<HTMLElement>(selector).forEach((item, index) => {
          gsap.fromTo(item, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: .55, delay: Math.min(index * .035, .18), ease: "power2.out", scrollTrigger: { trigger: item, start: "top 92%", once: true } });
        });
      });
    }, page);

    return () => ctx.revert();
  }, []);

  return null;
}
