import { HomeRoute, homeMetadata } from "@/lib/routes";

export const metadata = homeMetadata("en");

export default function Page() {
  return <HomeRoute lang="en" />;
}
