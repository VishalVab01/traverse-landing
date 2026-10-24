"use client";

import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return <header className={`site-header${scrolled ? " scrolled" : ""}`}>
    <div className="brand-group"><a className="brand" href="#home" aria-label="Neiden home"><svg className="brand-mark" viewBox="0 0 44 30" aria-hidden="true"><path d="M0 2h17v8h10v8H17v10H0V2Zm27 0h17v16H27V2Z"/></svg><span>ñeiden<sup>®</sup></span></a>
    <a className="purpose" href="#about">Built With Purpose</a></div>
    <nav className="desktop-nav" aria-label="Main navigation"><a href="#about">WHO WE ARE</a><a href="#services">PROJECTS <sup>35</sup></a><a href="#services">ARTICLES</a><a href="mailto:hello@neiden.project">JOIN US</a><a href="mailto:hello@neiden.project">START A PROJECT</a></nav>
    <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><i/><i/></button>
    {open && <nav className="mobile-nav" aria-label="Navigation"><a onClick={() => setOpen(false)} href="#about">Who we are</a><a onClick={() => setOpen(false)} href="#services">Projects</a><a onClick={() => setOpen(false)} href="#services">Articles</a><a onClick={() => setOpen(false)} href="mailto:hello@neiden.project">Start a project ↗</a></nav>}
  </header>;
}
