import { createHash } from "node:crypto";

export type NewsArticle = {
  slug: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  publishedAt: string;
  source: { name: string; url?: string };
};

export function slugForNewsArticleUrl(url: string): string {
  return createHash("sha256").update(url).digest("hex").slice(0, 20);
}

function normalizeArticle(raw: Record<string, unknown>): NewsArticle | null {
  const url = typeof raw.url === "string" ? raw.url : "";
  if (!url) return null;

  const src = raw.source;
  let sourceName = "";
  let sourceUrl: string | undefined;
  if (src && typeof src === "object" && src !== null) {
    const o = src as Record<string, unknown>;
    if (typeof o.name === "string") sourceName = o.name;
    if (typeof o.url === "string") sourceUrl = o.url;
  }

  return {
    slug: slugForNewsArticleUrl(url),
    title: typeof raw.title === "string" ? raw.title : "",
    description: typeof raw.description === "string" ? raw.description : "",
    content: typeof raw.content === "string" ? raw.content : "",
    url,
    image: typeof raw.image === "string" ? raw.image : null,
    publishedAt: typeof raw.publishedAt === "string" ? raw.publishedAt : "",
    source: { name: sourceName, url: sourceUrl },
  };
}

/** GNews: pagination is limited to the first 1000 articles (see API docs). */
const GNEWS_MAX_INDEXED_ARTICLES = 1000;

export type FetchChessNewsResult = {
  articles: NewsArticle[];
  totalArticles: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

export async function fetchChessNews(options?: {
  page?: number;
}): Promise<FetchChessNewsResult> {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    throw new Error("GNEWS_API_KEY is not set");
  }
  const key = apiKey;

  // `max` is 1–100 per GNews docs, but your *plan* may cap results (free tier ≈ 10 per request).
  const maxRaw = Number.parseInt(process.env.GNEWS_MAX_ARTICLES ?? "100", 10);
  const pageSize = Number.isFinite(maxRaw)
    ? Math.min(100, Math.max(1, maxRaw))
    : 100;

  const pageRaw = options?.page ?? 1;
  let pageRequested =
    Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.floor(pageRaw) : 1;

  async function loadPage(pageNum: number): Promise<{
    articles: NewsArticle[];
    totalArticles: number;
  }> {
    const url = new URL("https://gnews.io/api/v4/search");
    url.searchParams.set("q", "chess");
    url.searchParams.set("lang", "en");
    url.searchParams.set("max", String(pageSize));
    url.searchParams.set("page", String(pageNum));
    url.searchParams.set("apikey", key);

    const upstream = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    const data = (await upstream.json().catch(() => ({}))) as Record<
      string,
      unknown
    >;

    if (!upstream.ok) {
      const msg =
        typeof data.message === "string"
          ? data.message
          : `GNews error ${upstream.status}`;
      throw new Error(msg);
    }

    const rawList = Array.isArray(data.articles) ? data.articles : [];
    const articles = rawList
      .map((item) =>
        typeof item === "object" && item !== null
          ? normalizeArticle(item as Record<string, unknown>)
          : null
      )
      .filter((a): a is NewsArticle => a !== null);

    const totalArticles =
      typeof data.totalArticles === "number"
        ? data.totalArticles
        : articles.length;

    return { articles, totalArticles };
  }

  let { articles, totalArticles } = await loadPage(pageRequested);

  const maxPageByGNews = Math.max(
    1,
    Math.floor(GNEWS_MAX_INDEXED_ARTICLES / pageSize)
  );
  const totalPages = Math.max(
    1,
    Math.min(maxPageByGNews, Math.ceil(totalArticles / pageSize) || 1)
  );

  let page = Math.min(pageRequested, totalPages);
  if (pageRequested !== page) {
    ({ articles, totalArticles } = await loadPage(page));
  }

  return {
    articles,
    totalArticles,
    page,
    pageSize,
    totalPages,
  };
}
