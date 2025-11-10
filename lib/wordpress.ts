import { env } from "process";

type PublishPostInput = {
  title: string;
  content: string;
  excerpt?: string;
  status?: "draft" | "publish";
  slug?: string;
};

const WP_BASE_URL = env.WP_API_BASE;
const WP_APP_USER = env.WP_APP_USER;
const WP_APP_PASSWORD = env.WP_APP_PASSWORD;

function ensureEnv() {
  if (!WP_BASE_URL || !WP_APP_USER || !WP_APP_PASSWORD) {
    throw new Error(
      "Missing WordPress credentials. Configure WP_API_BASE, WP_APP_USER and WP_APP_PASSWORD in .env"
    );
  }
}

function resolveApiUrl(path: string) {
  const base = WP_BASE_URL!.endsWith("/") ? WP_BASE_URL! : `${WP_BASE_URL}/`;
  return new URL(path.replace(/^\//, ""), base).toString();
}

function buildSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const html: string[] = [];
  let listBuffer: string[] | null = null;
  const flushList = () => {
    if (listBuffer && listBuffer.length) {
      html.push(`<ul>${listBuffer.join("")}</ul>`);
      listBuffer = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line.startsWith("### ")) {
      flushList();
      html.push(`<h3>${line.slice(4)}</h3>`);
      return;
    }

    if (line.startsWith("## ")) {
      flushList();
      html.push(`<h2>${line.slice(3)}</h2>`);
      return;
    }

    if (/^[-*]\s+/.test(line)) {
      if (!listBuffer) {
        listBuffer = [];
      }
      const value = line.replace(/^[-*]\s+/, "");
      listBuffer.push(`<li>${value}</li>`);
      return;
    }

    flushList();
    html.push(`<p>${line}</p>`);
  });

  flushList();

  return html.join("");
}

export async function publishPost(input: PublishPostInput) {
  ensureEnv();

  const slug = input.slug ?? buildSlug(input.title);
  const url = resolveApiUrl("wp/v2/posts");
  const credentials = Buffer.from(`${WP_APP_USER}:${WP_APP_PASSWORD}`).toString("base64");

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`
    },
    body: JSON.stringify({
      title: input.title,
      content: markdownToHtml(input.content),
      excerpt: input.excerpt,
      status: input.status ?? "publish",
      slug
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to publish post: ${response.status} ${text}`);
  }

  return response.json();
}
