import type { Metadata } from "next";
import SiteHeader from "../site-header";
import EnterpriseContent from "./enterprise-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/enterprise/enterprise.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Business VPN for Secure Remote Teams — Traverse VPN", description: "Explore enterprise VPN planning for secure remote teams, centralized access, and multi-site connectivity." };

export default async function EnterprisePage() {
  if (process.env.NODE_ENV !== "development" && !(process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    return <main className="product-enterprise"><SiteHeader /><EnterpriseContent content={fallback} /></main>;
  }
  let content = fallback;
  try {
    const result = await client.queries.enterprisePage({ relativePath: "enterprise.json" }, { fetchOptions: { cache: "no-store" } });
    content = result.data.enterprisePage as typeof fallback;
  } catch {
    // Keep the bundled copy available when Tina Cloud content is unavailable.
  }
  return <main className="product-enterprise"><SiteHeader /><EnterpriseContent content={content} /></main>;
}
