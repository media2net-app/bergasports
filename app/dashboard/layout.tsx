"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { Route } from "next";
import "./styles.css";

const navLinks = [
  { label: "Overzicht", href: "/dashboard" },
  { label: "SEO Inzichten", href: "/dashboard/seo" },
  { label: "Keyword Tracking", href: "/dashboard/keywords" },
  { label: "SEA Campagnes", href: "/dashboard/sea" },
  { label: "SEA AI Analyse", href: "/dashboard/sea-ai" },
  { label: "SEO Content AI", href: "/dashboard/seo-content" },
  { label: "SEO AI Generator", href: "/dashboard/generator" }
] satisfies Array<{ label: string; href: Route }>;

export default function DashboardLayout({
  children
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <Link className="brand" href="/dashboard" aria-label="Bergasports">
          <Image
            src="/BERGASPORTS_.png"
            alt="Bergasports"
            width={180}
            height={40}
            priority
          />
        </Link>

        <nav>
          <ul>
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.label}>
                  <Link className={isActive ? "active" : ""} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p>Marketing lead</p>
          <button type="button">Uitloggen</button>
        </div>
      </aside>

      <main className="content">{children}</main>
    </div>
  );
}