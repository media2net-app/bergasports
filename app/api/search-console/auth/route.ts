import { NextResponse } from "next/server";
import { saveTokens, hasValidTokens } from "@/lib/token-storage";

type RequestBody = {
  accessToken?: string;
  refreshToken?: string;
};

/**
 * POST /api/search-console/auth
 * Store Google OAuth tokens (database or file storage)
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (!body.accessToken || !body.refreshToken) {
      return NextResponse.json(
        { error: "accessToken and refreshToken are required" },
        { status: 400 }
      );
    }

    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://www.bergasports.com";

    const result = await saveTokens(body.accessToken, body.refreshToken, siteUrl);

    return NextResponse.json({
      success: true,
      method: result.method,
      message: `Tokens opgeslagen (${result.method === "database" ? "database" : "bestand"})`
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in /api/search-console/auth:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * GET /api/search-console/auth
 * Retrieve stored OAuth tokens status
 */
export async function GET() {
  try {
    const siteUrl = process.env.GOOGLE_SEARCH_CONSOLE_SITE_URL || "https://www.bergasports.com";

    const status = await hasValidTokens(siteUrl);

    if (!status.hasAuth) {
      return NextResponse.json({ error: "No auth found" }, { status: 404 });
    }

    return NextResponse.json({
      hasAuth: true,
      isExpired: status.isExpired,
      expiresAt: status.expiresAt
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

