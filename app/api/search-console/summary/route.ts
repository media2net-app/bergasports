import { NextResponse } from "next/server";
import { fetchSearchConsoleSummary } from "@/lib/search-console";

/**
 * GET /api/search-console/summary
 * Fetch summary metrics from Google Search Console
 * 
 * Query params:
 * - accessToken: OAuth access token (required)
 * - refreshToken: OAuth refresh token (required)
 * - days: Number of days to look back (default: 30)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");
    const days = parseInt(searchParams.get("days") || "30", 10);

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { error: "accessToken and refreshToken are required" },
        { status: 400 }
      );
    }

    const startDate = getDateDaysAgo(days);
    const endDate = getDateDaysAgo(0);

    const summary = await fetchSearchConsoleSummary(accessToken, refreshToken, startDate, endDate);

    return NextResponse.json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in /api/search-console/summary:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

