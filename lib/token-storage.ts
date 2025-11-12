import { prisma } from "@/lib/prisma";
import { writeFile, readFile, mkdir } from "fs/promises";
import { join } from "path";

const TOKEN_FILE_PATH = join(process.cwd(), ".tokens", "search-console.json");

type TokenData = {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
  siteUrl: string;
};

/**
 * Try to save tokens to database, fallback to file storage
 */
export async function saveTokens(
  accessToken: string,
  refreshToken: string,
  siteUrl: string = "https://www.bergasports.com"
): Promise<{ success: true; method: "database" | "file" }> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1);

  // Try database first
  try {
    const auth = await prisma.searchConsoleAuth.upsert({
      where: { siteUrl },
      update: {
        accessToken,
        refreshToken,
        expiresAt,
        updatedAt: new Date()
      },
      create: {
        accessToken,
        refreshToken,
        expiresAt,
        siteUrl
      }
    });

    return { success: true, method: "database" };
  } catch (error) {
    // Database not available, fallback to file storage
    console.warn("Database not available, using file storage for tokens:", error);

    try {
      // Ensure directory exists
      await mkdir(join(process.cwd(), ".tokens"), { recursive: true });

      const tokenData: TokenData = {
        accessToken,
        refreshToken,
        expiresAt: expiresAt.toISOString(),
        siteUrl
      };

      await writeFile(TOKEN_FILE_PATH, JSON.stringify(tokenData, null, 2), "utf-8");
      return { success: true, method: "file" };
    } catch (fileError) {
      throw new Error(
        `Failed to save tokens: Database unavailable and file storage failed: ${fileError instanceof Error ? fileError.message : "Unknown error"}`
      );
    }
  }
}

/**
 * Try to load tokens from database, fallback to file storage
 */
export async function loadTokens(
  siteUrl: string = "https://www.bergasports.com"
): Promise<TokenData | null> {
  // Try database first
  try {
    const auth = await prisma.searchConsoleAuth.findUnique({
      where: { siteUrl }
    });

    if (auth) {
      return {
        accessToken: auth.accessToken,
        refreshToken: auth.refreshToken,
        expiresAt: auth.expiresAt.toISOString(),
        siteUrl: auth.siteUrl
      };
    }
  } catch (error) {
    // Database not available, try file storage
    console.warn("Database not available, trying file storage for tokens");
  }

  // Try file storage
  try {
    const fileContent = await readFile(TOKEN_FILE_PATH, "utf-8");
    const tokenData: TokenData = JSON.parse(fileContent);

    // Verify it's for the correct site
    if (tokenData.siteUrl === siteUrl) {
      return tokenData;
    }
  } catch (error) {
    // File doesn't exist or can't be read
    return null;
  }

  return null;
}

/**
 * Check if tokens exist and are valid
 */
export async function hasValidTokens(
  siteUrl: string = "https://www.bergasports.com"
): Promise<{ hasAuth: boolean; isExpired: boolean; expiresAt?: Date }> {
  const tokens = await loadTokens(siteUrl);

  if (!tokens) {
    return { hasAuth: false, isExpired: false };
  }

  const expiresAt = new Date(tokens.expiresAt);
  const isExpired = new Date() > expiresAt;

  return {
    hasAuth: true,
    isExpired,
    expiresAt
  };
}

