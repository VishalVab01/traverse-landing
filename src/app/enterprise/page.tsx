import type { Metadata } from "next";
import SiteHeader from "../site-header";
import EnterpriseContent from "./enterprise-content";

export const metadata: Metadata = { title: "Business VPN for Secure Remote Teams — Traverse VPN", description: "Explore enterprise VPN planning for secure remote teams, centralized access, and multi-site connectivity." };

export default function EnterprisePage() {
  return <main className="product-enterprise"><SiteHeader /><EnterpriseContent /></main>;
}
