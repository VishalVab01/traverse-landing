import { client } from "../../tina/__generated__/client";
import homepage from "../../content/pages/home.json";
import HomeContent, { StaticHomeContent } from "./home-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const hasTinaCloudCredentials =
    Boolean(process.env.NEXT_PUBLIC_TINA_CLIENT_ID) && Boolean(process.env.TINA_TOKEN);

  if (process.env.NODE_ENV !== "development" && !hasTinaCloudCredentials) {
    return <StaticHomeContent content={homepage} />;
  }

  const result = await client.queries.homepage(
    { relativePath: "home.json" },
    { fetchOptions: { cache: "no-store" } },
  );

  return <HomeContent {...result} />;
}
