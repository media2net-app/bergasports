import { google } from "googleapis";
import { env } from "process";

const GOOGLE_CLIENT_ID = env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = env.GOOGLE_CLIENT_SECRET;
const GOOGLE_SEARCH_CONSOLE_SITE_URL = env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://www.bergasports.com";

function ensureEnv() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    throw new Error(
      "Missing Google OAuth credentials. Configure GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env"
    );
  }
}

export type KeywordPerformance = {
  keyword: string;
  position: number;
  clicks: number;
  impressions: number;
  ctr: number;
  date: string;
};

export type SearchConsoleSummary = {
  totalClicks: number;
  totalImpressions: number;
  averageCtr: number;
  averagePosition: number;
  topKeywords: KeywordPerformance[];
};

/**
 * Get OAuth2 client for Google Search Console API
 * Note: This requires the user to authenticate via OAuth flow first
 * For now, we'll use service account or stored tokens
 */
function getOAuth2Client(accessToken?: string, refreshToken?: string) {
  ensureEnv();

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/google/callback`
  );

  if (accessToken) {
    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken
    });
  }

  return oauth2Client;
}

/**
 * Fetch keyword performance data from Google Search Console
 */
export async function fetchKeywordPerformance(
  accessToken: string,
  refreshToken: string,
  startDate: string = getDateDaysAgo(30),
  endDate: string = getDateDaysAgo(0),
  rowLimit: number = 1000
): Promise<KeywordPerformance[]> {
  ensureEnv();

  const oauth2Client = getOAuth2Client(accessToken, refreshToken);
  const searchconsole = google.searchconsole({ version: "v1", auth: oauth2Client });

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl: GOOGLE_SEARCH_CONSOLE_SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query", "date"],
        rowLimit,
        startRow: 0
      }
    });

    if (!response.data.rows) {
      return [];
    }

    return response.data.rows.map((row) => ({
      keyword: row.keys?.[0] || "",
      position: row.position || 0,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      date: row.keys?.[1] || endDate
    }));
  } catch (error) {
    console.error("Error fetching Search Console data:", error);
    throw error;
  }
}

/**
 * Get aggregated keyword performance (without date dimension)
 */
export async function fetchTopKeywords(
  accessToken: string,
  refreshToken: string,
  startDate: string = getDateDaysAgo(30),
  endDate: string = getDateDaysAgo(0),
  limit: number = 50
): Promise<KeywordPerformance[]> {
  ensureEnv();

  const oauth2Client = getOAuth2Client(accessToken, refreshToken);
  const searchconsole = google.searchconsole({ version: "v1", auth: oauth2Client });

  try {
    const response = await searchconsole.searchanalytics.query({
      siteUrl: GOOGLE_SEARCH_CONSOLE_SITE_URL,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["query"],
        rowLimit: limit,
        startRow: 0
      }
    });

    if (!response.data.rows) {
      return [];
    }

    return response.data.rows.map((row) => ({
      keyword: row.keys?.[0] || "",
      position: row.position || 0,
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      date: endDate
    }));
  } catch (error) {
    console.error("Error fetching top keywords:", error);
    throw error;
  }
}

/**
 * Get summary metrics from Search Console
 */
export async function fetchSearchConsoleSummary(
  accessToken: string,
  refreshToken: string,
  startDate: string = getDateDaysAgo(30),
  endDate: string = getDateDaysAgo(0)
): Promise<SearchConsoleSummary> {
  ensureEnv();

  const oauth2Client = getOAuth2Client(accessToken, refreshToken);
  const searchconsole = google.searchconsole({ version: "v1", auth: oauth2Client });

  try {
    // Get overall summary
    const summaryResponse = await searchconsole.searchanalytics.query({
      siteUrl: GOOGLE_SEARCH_CONSOLE_SITE_URL,
      requestBody: {
        startDate,
        endDate
      }
    });

    const summary = summaryResponse.data;

    // Get top keywords
    const topKeywords = await fetchTopKeywords(accessToken, refreshToken, startDate, endDate, 10);

    return {
      totalClicks: summary.rows?.[0]?.clicks || 0,
      totalImpressions: summary.rows?.[0]?.impressions || 0,
      averageCtr: summary.rows?.[0]?.ctr || 0,
      averagePosition: summary.rows?.[0]?.position || 0,
      topKeywords
    };
  } catch (error) {
    console.error("Error fetching Search Console summary:", error);
    throw error;
  }
}

/**
 * Helper: Get date string N days ago (YYYY-MM-DD format)
 */
function getDateDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

/**
 * Helper: Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("nl-NL", { year: "numeric", month: "long", day: "numeric" });
}

