"use client";

import { useState, useTransition } from "react";
import { usePublishedContent } from "@/hooks/usePublishedContent";

type PublishButtonProps = {
  itemId: number;
  payload: {
    title: string;
    content: string;
    excerpt?: string;
    slug?: string;
  };
};

export function PublishButton({ itemId, payload }: PublishButtonProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const { isPublished, markPublished } = usePublishedContent();

  const alreadyPublished = isPublished(itemId);

  const handlePublish = () => {
    if (alreadyPublished) {
      setStatus("success");
      setMessage("Dit artikel is al gepubliceerd");
      return;
    }

    setStatus("idle");
    setMessage(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/wp/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: payload.title,
            content: payload.content,
            excerpt: payload.excerpt,
            slug: payload.slug
          })
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error ?? "Publiceren mislukt");
        }

        markPublished(itemId);
        setStatus("success");
        setMessage("Gepubliceerd op WordPress");
      } catch (error) {
        setStatus("error");
        setMessage(error instanceof Error ? error.message : "Onbekende fout");
      }
    });
  };

  const label = alreadyPublished
    ? "Gepubliceerd"
    : isPending
    ? "Bezig met publiceren…"
    : "Publiceer naar WordPress";

  return (
    <div className="publish-actions">
      <button
        type="button"
        onClick={handlePublish}
        disabled={isPending || alreadyPublished}
        className={`publish-button${alreadyPublished ? " published" : ""}`}
      >
        {label}
      </button>
      {message && (
        <p className={`publish-message ${status}`}>{message}</p>
      )}
    </div>
  );
}

