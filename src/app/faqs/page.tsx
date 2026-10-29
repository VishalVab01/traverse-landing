import type { Metadata } from "next";
import SiteHeader from "../site-header";
import FaqContent from "./faq-content";

export const metadata: Metadata = { title: "Frequently Asked Questions — Traverse VPN", description: "Answers about Traverse VPN privacy, security, streaming, speed, supported devices, and plans." };

export default function FaqsPage() {
  return <main className="product-faqs"><SiteHeader /><FaqContent /></main>;
}
