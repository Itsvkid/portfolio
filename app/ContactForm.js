"use client";

import { useState } from "react";

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm({ email }) {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [error, setError] = useState("");

  // Without a key configured, don't render a form that silently fails.
  if (!ACCESS_KEY) {
    return (
      <div className="rounded-2xl border border-line bg-wash p-6">
        <p className="text-sm text-ink-2">
          Prefer email? Reach me directly at{" "}
          <a
            href={`mailto:${email}`}
            className="font-medium text-accent underline underline-offset-4"
          >
            {email}
          </a>
          .
        </p>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", ACCESS_KEY);
    data.append("subject", "New message from your portfolio site");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();

      if (json.success) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please check your connection and try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-accent bg-wash p-8 text-center">
        <p className="text-lg font-semibold tracking-tight">Message sent</p>
        <p className="mt-2 text-sm text-muted">
          Thanks for getting in touch — I&apos;ll reply as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-medium text-accent underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-line p-6 sm:p-8"
    >
      {/* honeypot — hidden from users, catches naive bots */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block font-mono text-xs uppercase tracking-widest text-muted"
          >
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block font-mono text-xs uppercase tracking-widest text-muted"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="mt-2 w-full rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="block font-mono text-xs uppercase tracking-widest text-muted"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-y rounded-lg border border-line bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-xs text-muted">
          Or email{" "}
          <a
            href={`mailto:${email}`}
            className="underline underline-offset-4 hover:text-ink"
          >
            {email}
          </a>
        </p>
      </div>
    </form>
  );
}
