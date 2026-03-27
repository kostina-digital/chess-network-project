import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchChessNews } from "@/lib/gnews";

export default async function NewsArticlePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }> | { slug: string };
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const { slug } = await Promise.resolve(params);
  const sp = await Promise.resolve(searchParams);
  const pageParsed = Number.parseInt(sp.page ?? "1", 10);
  const listPage =
    Number.isFinite(pageParsed) && pageParsed >= 1
      ? Math.floor(pageParsed)
      : 1;

  let articles;
  try {
    ({ articles } = await fetchChessNews({ page: listPage }));
  } catch {
    return (
      <div className="min-h-screen w-full bg-background">
        <div className="w-full min-w-0 p-4">
          <p className="text-destructive" role="alert">
            Could not load news. Check your GNEWS_API_KEY and network connection.
          </p>
          <Link
            href={listPage > 1 ? `/news?page=${listPage}` : "/news"}
            className="mt-4 inline-block text-sm text-foreground underline"
          >
            ← Back to list
          </Link>
        </div>
      </div>
    );
  }

  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    notFound();
  }

  const bodyText =
    article.content?.trim() || article.description?.trim() || "";

  return (
    <div className="min-h-screen w-full bg-background">
      <article className="w-full min-w-0 p-4">
        <Link
          href={listPage > 1 ? `/news?page=${listPage}` : "/news"}
          className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back to news
        </Link>

        <h1 className="mb-3 text-2xl font-semibold leading-tight text-foreground">
          {article.title}
        </h1>

        <p className="mb-6 text-sm text-muted-foreground">
          {article.publishedAt
            ? new Date(article.publishedAt).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short",
              })
            : null}
          {article.publishedAt && article.source?.name ? " · " : null}
          {article.source?.name ? article.source.name : null}
        </p>

        {article.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={article.image}
            alt=""
            className="mb-8 w-full max-h-[420px] rounded-lg border border-border object-cover"
          />
        ) : null}

        <div className="space-y-4 whitespace-pre-wrap leading-relaxed text-foreground">
          {bodyText ? <p>{bodyText}</p> : null}
        </div>

        <a
          href={article.url}
          className="mt-8 inline-flex text-sm font-medium text-foreground underline underline-offset-4 hover:opacity-80"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read on the publisher&apos;s site →
        </a>
      </article>
    </div>
  );
}
