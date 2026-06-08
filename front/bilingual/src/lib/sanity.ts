import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = "2024-05-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

export async function sanityFetch<R = unknown>(
  query: string,
  params?: Record<string, unknown>,
): Promise<R> {
  const body: Record<string, unknown> = { query };
  if (params) body.params = params;
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Sanity fetch failed: ${response.status} ${err}`);
  }
  const { result } = await response.json();
  return result as R;
}

const urlForBase = (source: any) =>
  createImageUrlBuilder({ projectId, dataset }).image(source);

export function imageUrl(source: any, width?: number): string | null {
  if (!source) return null;
  try {
    const builder = urlForBase(source);
    if (width) builder.width(width);
    return builder.url() ?? null;
  } catch {
    return null;
  }
}
