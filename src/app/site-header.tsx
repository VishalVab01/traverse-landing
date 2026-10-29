"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function PlatformIcon({ platform }: { platform: string }) {
  if (platform === "windows") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M2 6.4 14 4.7v10.6H2V6.4Zm14-2 14-2v12.9H16V4.4ZM2 17h12v10.5L2 25.8V17Zm14 0h14v13l-14-2V17Z"/></svg>;
  if (platform === "android") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m8 7-2.4-3.6M24 7l2.4-3.6M5 13a11 11 0 0 1 22 0H5Zm3 2h16v9a3 3 0 0 1-3 3h-1v4h-3v-4h-2v4h-3v-4h-1a3 3 0 0 1-3-3v-9Z"/><circle cx="11" cy="10" r="1" fill="#111"/><circle cx="21" cy="10" r="1" fill="#111"/></svg>;
  if (platform === "apple") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M23.2 17.1c0-3.5 2.9-5.2 3-5.3-1.7-2.5-4.3-2.8-5.2-2.8-2.2-.2-4.3 1.3-5.4 1.3s-2.8-1.3-4.6-1.2c-2.4 0-4.6 1.4-5.8 3.5-2.5 4.3-.6 10.6 1.8 14.1 1.2 1.7 2.6 3.6 4.4 3.5 1.8-.1 2.5-1.1 4.7-1.1 2.2 0 2.8 1.1 4.7 1 2 0 3.2-1.7 4.4-3.4a15 15 0 0 0 2-4c-.1 0-4-1.6-4-5.6ZM19.7 6.8A7 7 0 0 0 21.3 2a7.2 7.2 0 0 0-4.5 2.3 6.7 6.7 0 0 0-1.7 4.6 6 6 0 0 0 4.6-2.1Z"/></svg>;
  if (platform === "mac") return <span className="platform-macos" aria-hidden="true">mac<br/><b>OS</b></span>;
  if (platform === "linux") return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3c-4 0-6 4-6 9v5l-4 7c-1 2 1 4 3 3l4-3 3 2 3-2 4 3c2 1 4-1 3-3l-4-7v-5c0-5-2-9-6-9Z" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="13.5" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><path d="m14 16 2 1 2-1" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>;
  return <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 5 5 12l7 7M20 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const homeHref = pathname === "/" ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);

  const downloadGroups = [
      { title: "Desktop", items: [
      { label: "Windows", href: "/download/windows", icon: "windows" },
      { label: "macOS", href: "/download/macos", icon: "mac" },
      { label: "Linux", href: "/download/linux", icon: "linux" },
    ] },
    { title: "Mobile", items: [
      { label: "Android", href: "/download/android", icon: "android" },
      { label: "iOS", href: "/download/ios", icon: "apple" },
      { label: "All Apps", href: "/download", icon: "all" },
    ] },
  ];

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 70);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    setOpen(false);
    setDownloadOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return <header className={`site-header${scrolled ? " scrolled" : ""}`}>
    <div className="brand-group"><a className="brand" href={`${homeHref}#home`} aria-label="Traverse VPN home"><span className="vpn-brand-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2.5 20 6v5.4c0 5-3.2 8.4-8 10.1-4.8-1.7-8-5.1-8-10.1V6z"/><path d="m9 12 2 2 4-4"/></svg></span><span>Traverse</span></a></div>
    <nav className="desktop-nav" aria-label="Main navigation">
      <a href="/features" aria-current={pathname === "/features" ? "page" : undefined}>Features</a>
      <a href="/plans" aria-current={pathname === "/plans" ? "page" : undefined}>Plans</a>
      <a href="/enterprise" aria-current={pathname === "/enterprise" ? "page" : undefined}>Enterprise</a>
      <a href="/blog" aria-current={pathname === "/blog" ? "page" : undefined}>Blog</a>
      <div className="nav-download" onMouseEnter={() => setDownloadOpen(true)} onMouseLeave={() => setDownloadOpen(false)} onFocus={() => setDownloadOpen(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDownloadOpen(false); }}>
        <button type="button" aria-expanded={downloadOpen} aria-controls="desktop-download-menu" onClick={() => setDownloadOpen((value) => !value)}>
          Download <svg viewBox="0 0 12 12" aria-hidden="true"><path d="m2 4 4 4 4-4"/></svg>
        </button>
        {downloadOpen && <div className="download-menu" id="desktop-download-menu">{downloadGroups.map((group) => <section key={group.title}><h2>{group.title}</h2>{group.items.map((item) => <a href={item.href} key={item.label}><i className={`platform-${item.icon}`}><PlatformIcon platform={item.icon}/></i><span>{item.label}</span></a>)}</section>)}</div>}
      </div>
      <a href="/faqs" aria-current={pathname === "/faqs" ? "page" : undefined}>FAQs</a>
    </nav>
    <a className="header-cta" href="https://links.traversevpn.com/s/Ugp0lRJV">Get protected <span aria-hidden="true">↗</span></a>
    <button className="menu-button" type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><i/><i/></button>
    <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation" hidden={!open}>
      <a onClick={() => setOpen(false)} href="/features" aria-current={pathname === "/features" ? "page" : undefined}>Features</a>
      <a onClick={() => setOpen(false)} href="/plans" aria-current={pathname === "/plans" ? "page" : undefined}>Plans</a>
      <a onClick={() => setOpen(false)} href="/enterprise" aria-current={pathname === "/enterprise" ? "page" : undefined}>Enterprise</a>
      <a onClick={() => setOpen(false)} href="/blog" aria-current={pathname === "/blog" ? "page" : undefined}>Blog</a>
      <details className="mobile-download">
        <summary>Download <span aria-hidden="true">⌄</span></summary>
        <div>{downloadGroups.flatMap((group) => group.items).map((item) => <a onClick={() => setOpen(false)} href={item.href} key={item.label}>{item.label}</a>)}</div>
      </details>
      <a onClick={() => setOpen(false)} href="/faqs" aria-current={pathname === "/faqs" ? "page" : undefined}>FAQs</a>
    </nav>
  </header>;
}
