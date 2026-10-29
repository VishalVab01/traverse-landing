import type { Metadata } from "next";
import SiteHeader from "../site-header";
import BlogFeed from "./blog-feed";
import BlogMotion from "./blog-motion";

export const metadata: Metadata = {
  title: "Traverse Journal — Travel, Privacy & VPN Guides",
  description: "Practical guides to safer browsing, public Wi-Fi, and staying connected wherever you travel.",
};

export default function BlogPage() {
  return <main className="blog-page">
    <SiteHeader />
    <BlogMotion />
    <section className="blog-hero" aria-labelledby="blog-title">
      <div className="blog-hero-orbit" aria-hidden="true" />
      <div className="blog-hero-content">
        <p className="blog-eyebrow"><span /> TRAVERSE JOURNAL <span className="blog-eyebrow-slash">/</span> IDEAS FOR THE OPEN INTERNET</p>
        <h1 id="blog-title">Go further.<br /><span>Browse safer.</span></h1>
        <p className="blog-hero-copy">Field notes for a more confident internet: useful privacy advice, travel-ready tips, and a clearer view of how VPNs work.</p>
        <a className="blog-scroll-link" href="#stories">Explore the journal <span aria-hidden="true">↓</span></a>
      </div>
      <div className="blog-hero-index" aria-hidden="true">01 — 06 <i /></div>
    </section>
    <BlogFeed />
    <section className="blog-newsletter" id="newsletter">
      <div className="blog-newsletter-mark" aria-hidden="true">T<span>.</span></div>
      <div><p className="blog-eyebrow"><span /> THE TRAVERSE DISPATCH</p><h2>Good internet habits,<br />delivered occasionally.</h2><p>Get practical privacy tips and thoughtful reads for wherever you connect.</p></div>
      <a href="https://links.traversevpn.com/s/Ugp0lRJV">Explore Traverse <span aria-hidden="true">↗</span></a>
    </section>
    <footer className="blog-footer"><a href="/#home" className="blog-footer-brand"><span className="vpn-brand-icon" aria-hidden="true">T</span> Traverse</a><span>Browse with confidence, wherever you go.</span><a href="/#home">Back to Traverse <span aria-hidden="true">↗</span></a></footer>
  </main>;
}
