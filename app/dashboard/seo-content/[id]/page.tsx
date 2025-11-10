import Link from "next/link";
import { notFound } from "next/navigation";
import { PublishButton } from "@/components/PublishButton";
import { getSeoContentItem, seoContentItems } from "../data";

type Params = {
  params: {
    id: string;
  };
};

export function generateStaticParams() {
  return seoContentItems.map((item) => ({ id: String(item.id) }));
}

export default function SeoContentDetail({ params }: Params) {
  const id = Number(params.id);
  const item = getSeoContentItem(id);

  if (!item) {
    notFound();
  }

  const lines = item.content.split("\n");
  const blocks: Array<
    | { type: "paragraph"; text: string }
    | { type: "list"; items: string[] }
    | { type: "heading"; text: string; level: 2 | 3 }
  > = [];

  let paragraphBuffer: string[] = [];
  let listBuffer: string[] | null = null;

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      const paragraph = paragraphBuffer.join(" ").trim();
      if (paragraph.length) {
        blocks.push({ type: "paragraph", text: paragraph });
      }
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer && listBuffer.length) {
      blocks.push({ type: "list", items: listBuffer });
    }
    listBuffer = null;
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();

    if (!line) {
      flushParagraph();
      flushList();
      return;
    }

    if (/^[-*]\s+/.test(line) || /^\d+\./.test(line)) {
      flushParagraph();
      if (!listBuffer) {
        listBuffer = [];
      }
      listBuffer.push(line.replace(/^([-*]|\d+\.)\s*/, ""));
      return;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.replace(/^###\s*/, ""), level: 3 });
      return;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.replace(/^##\s*/, ""), level: 2 });
      return;
    }

    if (line === line.toUpperCase() || line.endsWith(":")) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", text: line.replace(/:\s*$/, ""), level: 2 });
      return;
    }

    paragraphBuffer.push(line);
  });

  flushParagraph();
  flushList();

  return (
    <article className="seo-detail">
      <header>
        <p className="breadcrumb">
          <Link href="/dashboard/seo-content">SEO content AI</Link>
          <span> / </span>
          {item.category}
        </p>
        <h1>{item.title}</h1>
        <div className="meta">
          <span>{item.category}</span>
          <span>{item.format}</span>
          <span>Zoekwoorden: {item.keywords}</span>
        </div>
        <div className="google-preview">
          <span>Google preview</span>
          <h4>{item.metaTitle}</h4>
          <p className="url">www.bergasports.com/wielrenschoenen</p>
          <p>{item.metaDescription}</p>
        </div>
      </header>

      <div className="content">
        {blocks.map((block, index) => {
          if (block.type === "paragraph") {
            return <p key={index}>{block.text}</p>;
          }

          if (block.type === "heading") {
            const HeadingTag = block.level === 2 ? "h2" : "h3";
            return (
              <HeadingTag key={index}>
                {block.text.charAt(0).toUpperCase() + block.text.slice(1)}
              </HeadingTag>
            );
          }

          return (
            <ul key={index}>
              {block.items.map((text, liIndex) => (
                <li key={liIndex}>{text}</li>
              ))}
            </ul>
          );
        })}
      </div>

      <footer>
        <div className="cta-banner">
          <div className="cta-copy">
            <h3>Plan jouw pasafspraak bij Bergasports</h3>
            <p>
              Reserveer direct een persoonlijke passing in Dedemsvaart en ervaar
              Verducci of Nimbl schoenen op onze indoortrainer. Bel 06 – 8316 2631 of
              mail info@bergasports.com voor vragen.
            </p>
          </div>
          <button type="button" className="cta-button">
            Plan afspraak
          </button>
        </div>
        <div className="actions">
          <button type="button">Exporteer als Markdown</button>
          <PublishButton
            itemId={item.id}
            payload={{
              title: item.title,
              content: item.content,
              excerpt: item.metaDescription
            }}
          />
        </div>
      </footer>
    </article>
  );
}
