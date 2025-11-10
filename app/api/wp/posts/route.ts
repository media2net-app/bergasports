import { NextResponse } from "next/server";
import { publishPost } from "@/lib/wordpress";

type RequestBody = {
  title?: string;
  content?: string;
  excerpt?: string;
  status?: "draft" | "publish";
  slug?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as RequestBody;

    if (!body.title || !body.content) {
      return NextResponse.json(
        { error: "title and content are required" },
        { status: 400 }
      );
    }

    const post = await publishPost({
      title: body.title,
      content: body.content,
      excerpt: body.excerpt,
      status: body.status,
      slug: body.slug
    });

    return NextResponse.json({ post });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Failed to publish post", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
