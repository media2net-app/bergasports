import Image from "next/image";
import LoginForm from "@/components/LoginForm";
import "./styles.css";

export const metadata = {
  title: "Bergasports | Inloggen"
};

export default function LoginPage() {
  return (
    <main className="login-page">
      <div className="gradient" aria-hidden />

      <section className="hero">
        <div className="logo">
          <Image
            src="/BERGASPORTS_.png"
            alt="Bergasports"
            width={410}
            height={40}
            sizes="(max-width: 768px) 60vw, 320px"
            style={{
              width: "100%",
              height: "auto",
              maxWidth: "320px"
            }}
            priority
          />
        </div>

        <h1>Welkom terug, kampioen.</h1>
        <p>
          Beheer je marketingstrategie, volg SEO- en SEA-campagnes en stuur
          conversies vanuit één dashboard. Meld je aan om direct te starten.
        </p>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Log in op het dashboard</h2>
          <p>Gebruik je Bergasports-account om verder te gaan.</p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
