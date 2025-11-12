import { NextResponse } from "next/server";
import { loadTokens } from "@/lib/token-storage";
import { fetchTopKeywords, fetchSearchConsoleSummary } from "@/lib/search-console";

/**
 * GET /api/search-console/data
 * Fetch Search Console data using stored tokens
 * 
 * Query params:
 * - days: Number of days to look back (default: 30)
 * - limit: Number of keywords to return (default: 50)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get("days") || "30", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);

    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://www.bergasports.com";

    // Get stored auth tokens (from database or file)
    const tokens = await loadTokens(siteUrl);

    if (!tokens) {
      return NextResponse.json(
        { error: "No Search Console authentication found. Please configure tokens first." },
        { status: 401 }
      );
    }

    // Check if token is expired (we'll need to refresh it, but for now just warn)
    const expiresAt = new Date(tokens.expiresAt);
    const isExpired = new Date() > expiresAt;
    if (isExpired) {
      return NextResponse.json(
        { error: "Access token expired. Please refresh your tokens." },
        { status: 401 }
      );
    }

    const startDate = getDateDaysAgo(days);
    const endDate = getDateDaysAgo(0);

    // Fetch data from Search Console
    const [keywords, summary] = await Promise.all([
      fetchTopKeywords(tokens.accessToken, tokens.refreshToken, startDate, endDate, limit),
      fetchSearchConsoleSummary(tokens.accessToken, tokens.refreshToken, startDate, endDate)
    ]);

    return NextResponse.json({
      keywords,
      summary,
      dateRange: { startDate, endDate }
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in /api/search-console/data:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

