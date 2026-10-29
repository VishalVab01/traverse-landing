import type { Metadata } from "next";
import SiteHeader from "../../site-header";
import PlatformDownloadContent from "../platform-download-content";
import { platformKeys, platformPages, type PlatformKey } from "../platform-data";

export function generateStaticParams() {
  return platformKeys.map((platform) => ({ platform }));
}

export async function generateMetadata({ params }: { params: Promise<{ platform: string }> }): Promise<Metadata> {
  const { platform } = await params;
  const data = platformPages[platform as PlatformKey];
  if (!data) return { title: "Download Traverse VPN" };
  return { title: `Traverse VPN for ${data.name} — Download`, description: data.lead };
}

export default async function PlatformPage({ params }: { params: Promise<{ platform: string }> }) {
  const { platform } = await params;
  const data = platformPages[platform as PlatformKey];
  if (!data) return <main className="platform-download-page"><SiteHeader/><PlatformDownloadContent platform={null}/></main>;
  return <main className="platform-download-page"><SiteHeader/><PlatformDownloadContent platform={data}/></main>;
}
