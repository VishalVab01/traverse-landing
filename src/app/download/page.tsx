import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlatformDownloadContent from "./platform-download-content";
import { client } from "../../../tina/__generated__/client";
import fallback from "../../../content/download/download.json";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Download Traverse VPN Apps for Any Device", description: "Explore Traverse VPN apps for desktop, mobile, and Linux devices." };

export default async function DownloadPage() {
  let content: typeof fallback = fallback;
  if (process.env.NODE_ENV === "development" || (process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN)) {
    const result = await client.queries.downloadPage({ relativePath: "download.json" }, { fetchOptions: { cache: "no-store" } });
    content = result.data.downloadPage as typeof fallback;
  }
  return <main className="platform-download-page"><SiteHeader/><PlatformDownloadContent platform={null} content={content}/></main>;
}
