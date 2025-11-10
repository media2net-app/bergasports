"use client";

import Link from "next/link";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import type { SeoContentItem } from "./data";

const WORD_TARGET = 1000;

type Props = {
  items: SeoContentItem[];
};

function getWordCount(content: string) {
  return content.split(/\s+/).filter(Boolean).length;
}

export function SeoContentTable({ items }: Props) {
  const { isPublished } = usePublishedContent();

  return (
    <div className="keyword-table-wrapper">
      <table className="keyword-table wide">
        <thead>
          <tr>
            <th>Titel</th>
            <th>Categorie</th>
            <th>Focus zoekwoorden</th>
            <th>Type content</th>
            <th>Lengte</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const wordCount = getWordCount(item.content);
            const meetsTarget = wordCount >= WORD_TARGET;
            const published = isPublished(item.id);

            return (
              <tr
                key={item.id}
                className={published ? "published" : undefined}
              >
                <td>
                  <Link href={`/dashboard/seo-content/${item.id}`}>
                    {item.title}
                  </Link>
                </td>
                <td>{item.category}</td>
                <td>{item.keywords}</td>
                <td>{item.format}</td>
                <td className={meetsTarget ? "metric-ok" : "metric-warn"}>
                  {wordCount.toLocaleString("nl-NL")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

