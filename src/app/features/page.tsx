import type { Metadata } from "next";
import SiteHeader from "../site-header";
import FeaturesContent from "./features-content";

export const metadata: Metadata = {
  title: "VPN Features — Traverse VPN",
  description: "Explore how Traverse VPN helps protect your connection, mask your IP, and browse more confidently on the networks you use every day.",
};

export default function FeaturesPage() {
  return <main className="product-features">
    <SiteHeader />
    <FeaturesContent />
  </main>;
}
