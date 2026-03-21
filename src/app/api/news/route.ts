import { fetchChessNews } from "@/lib/gnews";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const parsed = Number.parseInt(searchParams.get("page") ?? "1", 10);
    const page =
      Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;
    const data = await fetchChessNews({ page });
    return Response.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    const status = message.includes("GNEWS_API_KEY") ? 500 : 502;
    return Response.json({ error: message }, { status });
  }
}
