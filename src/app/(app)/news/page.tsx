import Link from "next/link";
import { fetchChessNews } from "@/lib/gnews";

function NewsPagination({
  page,
  totalPages,
}: {
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <nav
      className="mt-10 flex flex-wrap items-center justify-center gap-4 border-t border-border pt-8"
      aria-label="News pagination"
    >
      {prev !== null ? (
        <Link
          href={prev === 1 ? "/news" : `/news?page=${prev}`}
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md border border-transparent px-4 py-2 text-sm text-muted-foreground">
          Previous
        </span>
      )}
      <span className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </span>
      {next !== null ? (
        <Link
          href={`/news?page=${next}`}
          className="rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md border border-transparent px-4 py-2 text-sm text-muted-foreground">
          Next
        </span>
      )}
    </nav>
  );
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string };
}) {
  const sp = await Promise.resolve(searchParams);
  const parsed = Number.parseInt(sp.page ?? "1", 10);
  const pageFromQuery =
    Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;

  let result;
  try {
    result = await fetchChessNews({ page: pageFromQuery });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="h1-style">News</h1>
        <p className="p-style">
          {message}
        </p>
      </div>
    );
  }

  const { articles, page, totalPages } = result;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="h1-style">News</h1>
      <p className="p-style">
        Chess-related articles from GNews. Open a row for the full text and a
        link to the original source.
      </p>

      <ul className="m-0 flex list-none flex-col gap-4 p-0 w-full">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link
              href={
                page === 1
                  ? `/news/${article.slug}`
                  : `/news/${article.slug}?page=${page}`
              }
              className="group flex flex-col gap-0 overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/25 sm:flex-row sm:items-stretch"
            >
              <div className="relative h-48 w-full shrink-0 bg-muted sm:h-auto sm:w-44 sm:min-h-[132px] md:w-52">
                {article.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 p-4 sm:py-4 sm:pr-5">
                <h4 className="h4-style group-hover:underline">
                  {article.title}
                </h4>
                {article.description ? (
                  <p className="p-style-small line-clamp-2">
                    {article.description}
                  </p>
                ) : null}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 p-style-xsmall">
                  {article.publishedAt ? (
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </time>
                  ) : null}
                  {article.source?.name ? (
                    <>
                      {article.publishedAt ? (
                        <span aria-hidden>·</span>
                      ) : null}
                      <span>{article.source.name}</span>
                    </>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {articles.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">No articles on this page.</p>
      ) : null}

      <NewsPagination page={page} totalPages={totalPages} />
    </div>
  );
}
