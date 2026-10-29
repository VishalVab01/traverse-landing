import type { Metadata } from "next";
import SiteHeader from "../site-header";
import FaqContent from "./faq-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/faqs/faqs.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Frequently Asked Questions — Traverse VPN", description: "Answers about Traverse VPN privacy, security, streaming, speed, supported devices, and plans." };

export default async function FaqsPage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="product-faqs"><SiteHeader /><FaqContent content={fallback} /></main>;
  }
  let content = fallback;
  try {
    const result = await client.queries.faqsPage({ relativePath: "faqs.json" }, { fetchOptions: { cache: "no-store" } });
    content = result.data.faqsPage as typeof fallback;
  } catch {
    // Keep the bundled copy available when Tina Cloud content is unavailable.
  }
  return <main className="product-faqs"><SiteHeader /><FaqContent content={content} /></main>;
}
