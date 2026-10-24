import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Traverse VPN — Private by Design",
  description: "Protect your connection with Traverse VPN. Browse more privately with AES-256 encryption, IP masking, and fast global servers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
