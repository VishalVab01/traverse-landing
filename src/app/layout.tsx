import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ñeiden® — Built with purpose",
  description: "An independent design studio helping ambitious brands move forward with confidence.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
