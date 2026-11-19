import { docMetadata, docParams, DocRoute } from "@/lib/routes";

export const dynamicParams = false;

export function generateStaticParams() {
  return docParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  return docMetadata("fr", (await params).slug);
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return <DocRoute lang="fr" slug={(await params).slug} />;
}
