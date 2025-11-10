import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "seoContentPublished";

function readStorage(): number[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    const parsed = JSON.parse(stored) as number[];
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch (error) {
    console.warn("Kon gepubliceerde items niet lezen", error);
  }

  return [];
}

function writeStorage(ids: number[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function usePublishedContent() {
  const [publishedIds, setPublishedIds] = useState<number[]>([]);

  useEffect(() => {
    setPublishedIds(readStorage());
  }, []);

  const markPublished = useCallback((id: number) => {
    setPublishedIds((prev) => {
      if (prev.includes(id)) {
        return prev;
      }
      const next = [...prev, id];
      writeStorage(next);
      return next;
    });
  }, []);

  const isPublished = useCallback(
    (id: number) => publishedIds.includes(id),
    [publishedIds]
  );

  return {
    publishedIds,
    isPublished,
    markPublished
  };
}

