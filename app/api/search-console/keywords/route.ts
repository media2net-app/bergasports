import { NextResponse } from "next/server";
import { fetchTopKeywords } from "@/lib/search-console";

/**
 * GET /api/search-console/keywords
 * Fetch top keywords from Google Search Console
 * 
 * Query params:
 * - accessToken: OAuth access token (required)
 * - refreshToken: OAuth refresh token (required)
 * - days: Number of days to look back (default: 30)
 * - limit: Number of keywords to return (default: 50)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const days = parseInt(searchParams.get("days") || "30", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "accessToken and refreshToken are required" },
        { status: 400 }
      );
    }

    const startDate = getDateDaysAgo(days);
    const endDate = getDateDaysAgo(0);

    const keywords = await fetchTopKeywords(accessToken, refreshToken, startDate, endDate, limit);

    return NextResponse.json({ keywords });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in /api/search-console/keywords:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

