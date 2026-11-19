import { HomeRoute, homeMetadata } from "@/lib/routes";

export const metadata = homeMetadata("fr");

export default function Page() {
  return <HomeRoute lang="fr" />;
}
