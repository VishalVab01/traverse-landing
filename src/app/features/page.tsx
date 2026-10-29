import type { Metadata } from "next";
import SiteHeader from "../site-header";
import FeaturesContent from "./features-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/features/features.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VPN Features — Traverse VPN",
  description: "Explore how Traverse VPN helps protect your connection, mask your IP, and browse more confidently on the networks you use every day.",
};

export default async function FeaturesPage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="product-features"><SiteHeader /><FeaturesContent content={fallback} /></main>;
  }
  const result = await client.queries.featuresPage({ relativePath: "features.json" }, { fetchOptions: { cache: "no-store" } });
  return <main className="product-features">
    <SiteHeader />
    <FeaturesContent content={result.data.featuresPage as typeof fallback} />
  </main>;
}
