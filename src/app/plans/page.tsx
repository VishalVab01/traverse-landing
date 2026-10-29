import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlansContent from "./plans-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/plans/plans.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "VPN Plans & Pricing — Traverse VPN",
  description: "Choose a Traverse VPN plan with strong encryption, high-speed servers, split tunneling, and a strict no-logs policy.",
};

export default async function PlansPage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="product-plans"><SiteHeader /><PlansContent content={fallback} /></main>;
  }
  const result = await client.queries.plansPage({ relativePath: "plans.json" }, { fetchOptions: { cache: "no-store" } });
  return <main className="product-plans"><SiteHeader /><PlansContent content={result.data.plansPage as typeof fallback} /></main>;
}
