"use client";

import { useState } from "react";
import Link from "next/link";
import "../styles.css";

export default function SearchConsoleAuth() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    if (!accessToken || !refreshToken) {
      setStatus("error");
      setMessage("Vul beide tokens in");
      return;
    }

    setStatus("saving");
    setMessage(null);

    try {
      const response = await fetch("/api/search-console/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accessToken,
          refreshToken
        })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error ?? "Fout bij opslaan");
      }

      setStatus("success");
      setMessage(
        result.message || `Tokens succesvol opgeslagen (${result.method === "database" ? "database" : "bestand"})!`
      );
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Onbekende fout");
    }
  };

  return (
    <section className="seo-content">
      <header className="section-header">
        <h1>Google Search Console Koppeling</h1>
        <p>
          Koppel je Google Search Console account om SEO keyword data automatisch op te halen.
        </p>
      </header>

      <article className="insight-card" style={{ maxWidth: "600px", marginTop: "2rem" }}>
        <header>
          <h2>OAuth Tokens Instellen</h2>
          <p>
            Volg de instructies in de documentatie om OAuth tokens te verkrijgen en voer ze hier in.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
          <div>
            <label
              htmlFor="accessToken"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
            >
              Access Token
            </label>
            <input
              id="accessToken"
              type="text"
              value={accessToken}
              onChange={(e) => setAccessToken(e.target.value)}
              placeholder="ya29.a0AfH6..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff"
              }}
            />
          </div>

          <div>
            <label
              htmlFor="refreshToken"
              style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500 }}
            >
              Refresh Token
            </label>
            <input
              id="refreshToken"
              type="text"
              value={refreshToken}
              onChange={(e) => setRefreshToken(e.target.value)}
              placeholder="1//0g..."
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                background: "rgba(255, 255, 255, 0.05)",
                color: "#fff"
              }}
            />
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={status === "saving"}
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              background:
                status === "saving"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "linear-gradient(135deg, #d4af38, #b38518)",
              color: status === "saving" ? "rgba(255, 255, 255, 0.5)" : "#000",
              fontWeight: 600,
              cursor: status === "saving" ? "not-allowed" : "pointer"
            }}
          >
            {status === "saving" ? "Opslaan..." : "Tokens Opslaan"}
          </button>

          {message && (
            <p
              style={{
                padding: "0.75rem",
                borderRadius: "8px",
                background:
                  status === "success"
                    ? "rgba(120, 255, 180, 0.1)"
                    : "rgba(255, 120, 120, 0.1)",
                color:
                  status === "success"
                    ? "rgba(120, 255, 180, 0.9)"
                    : "rgba(255, 120, 120, 0.9)"
              }}
            >
              {message}
            </p>
          )}
        </div>

        <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <h3 style={{ marginBottom: "0.5rem" }}>Hulp nodig?</h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.7)" }}>
            Bekijk de documentatie in <code>docs/GOOGLE_SEARCH_CONSOLE_SETUP.md</code> voor
            gedetailleerde instructies over het verkrijgen van OAuth tokens.
          </p>
        </div>
      </article>

      <div style={{ marginTop: "2rem" }}>
        <Link href="/dashboard/seo" style={{ color: "#d4af38" }}>
          ← Terug naar SEO Inzichten
        </Link>
      </div>
    </section>
  );
}

