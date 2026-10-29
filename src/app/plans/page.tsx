import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlansContent from "./plans-content";

export const metadata: Metadata = {
  title: "VPN Plans & Pricing — Traverse VPN",
  description: "Choose a Traverse VPN plan with strong encryption, high-speed servers, split tunneling, and a strict no-logs policy.",
};

export default function PlansPage() {
  return <main className="product-plans"><SiteHeader /><PlansContent /></main>;
}
