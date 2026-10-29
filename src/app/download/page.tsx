import type { Metadata } from "next";
import SiteHeader from "../site-header";
import PlatformDownloadContent from "./platform-download-content";

export const metadata: Metadata = { title: "Download Traverse VPN Apps for Any Device", description: "Explore Traverse VPN apps for desktop, mobile, and Linux devices." };

export default function DownloadPage() {
  return <main className="platform-download-page"><SiteHeader/><PlatformDownloadContent platform={null}/></main>;
}
