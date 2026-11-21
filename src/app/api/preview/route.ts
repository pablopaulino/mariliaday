import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const itunesUrl = `https://itunes.apple.com/search?term=${encodeURIComponent(
      q
    )}&entity=song&limit=1`;

    const res = await fetch(itunesUrl, { next: { revalidate: 86400 } });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch from iTunes" }, { status: 502 });
    }

    const data = await res.json();
    if (data.results && data.results.length > 0) {
      const item = data.results[0];
      return NextResponse.json({
        title: item.trackName,
        artist: item.artistName,
        album: item.collectionName,
        previewUrl: item.previewUrl,
        artworkUrl: item.artworkUrl100?.replace("100x100bb", "600x600bb") || item.artworkUrl100,
      });
    }

    return NextResponse.json({ error: "No track found" }, { status: 404 });
  } catch (err: any) {
    console.error("Preview API error:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
