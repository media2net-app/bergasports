"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type LoginFormState = {
  email: string;
  password: string;
  remember: boolean;
};

const initialState: LoginFormState = {
  email: "",
  password: "",
  remember: true
};

export default function LoginForm() {
  const [form, setForm] = useState<LoginFormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const updateField = (key: keyof LoginFormState, value: string | boolean) => {
    setForm((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    await new Promise((resolve) => setTimeout(resolve, 900));

    setIsSubmitting(false);

    if (form.email && form.password) {
      router.push("/dashboard");
      return;
    }

    setMessage("Vul je gegevens in om verder te gaan.");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="stack gap-4">
        <label className="field">
          <span>E-mailadres</span>
          <input
            type="email"
            required
            autoComplete="email"
            placeholder="jouwnaam@bergasports.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
          />
        </label>

        <label className="field">
          <span>Wachtwoord</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(event) => updateField("password", event.target.value)}
          />
        </label>

        <div className="row between">
          <label className="remember">
            <input
              type="checkbox"
              checked={form.remember}
              onChange={(event) => updateField("remember", event.target.checked)}
            />
            <span>Onthoud mij</span>
          </label>
          <button type="button" className="link-button">
            Wachtwoord vergeten?
          </button>
        </div>
      </div>

      <button className="primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Even geduld..." : "Inloggen"}
      </button>

      <div className="divider">
        <span>of</span>
      </div>

      <div className="stack gap-3">
        <button className="secondary" type="button">
          Inloggen met Google
        </button>
        <button className="secondary" type="button">
          Inloggen met Microsoft
        </button>
      </div>

      <p className="footnote">
        Nog geen account? <a href="#">Vraag toegang aan</a>
      </p>

      {message && <p className="message">{message}</p>}
    </form>
  );
}
