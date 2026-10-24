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
    <div className="brand-group"><a className="brand" href="#home" aria-label="Traverse VPN home"><span className="vpn-brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.5 20 6v5.4c0 5-3.2 8.4-8 10.1-4.8-1.7-8-5.1-8-10.1V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span>Traverse</span></a></div>
    <nav className="desktop-nav" aria-label="Main navigation"><a href="#services">Features</a><a href="#how-we-work">Protection</a><a href="#pricing">Plans</a><a href="#about">About</a><a href="#faqs">FAQs</a></nav>
    <a className="header-cta" href="https://links.traversevpn.com/s/Ugp0lRJV">Get protected <span aria-hidden="true">↗</span></a>
    <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen(!open)}><i/><i/></button>
    {open && <nav className="mobile-nav" aria-label="Navigation"><a onClick={() => setOpen(false)} href="#about">Why Traverse</a><a onClick={() => setOpen(false)} href="#services">VPN features</a><a onClick={() => setOpen(false)} href="#pricing">Plans and pricing</a><a onClick={() => setOpen(false)} href="https://links.traversevpn.com/s/Ugp0lRJV">Get Traverse VPN ↗</a></nav>}
  </header>;
}
