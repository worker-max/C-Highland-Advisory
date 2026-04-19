"use client";

import { useState } from "react";
import { CTAButton } from "./CTAButton";
import { DIVISIONS } from "@/content/divisions";

type Status = "idle" | "submitting" | "success" | "error";

const TIMELINES = ["Exploring", "Within 60 days", "Actively planning", "Urgent"] as const;

export function BriefForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = event.currentTarget;
    const fd = new FormData(form);

    if (fd.get("website")) {
      setStatus("success");
      return;
    }

    const payload = {
      name: fd.get("name"),
      organization: fd.get("organization"),
      role: fd.get("role"),
      email: fd.get("email"),
      division: fd.get("division"),
      timeline: fd.get("timeline"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/brief", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? "Submission failed.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="card p-8">
        <div className="eyebrow mb-4">Received</div>
        <div className="display-sm mb-4">Your brief is received.</div>
        <p className="prose-base max-w-[56ch] text-[color:var(--color-silt)]">
          We respond to every submission within three business days. If
          there&apos;s a fit, we&apos;ll send a proposed scope within the week.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Field label="Name" name="name" required />
        <Field label="Organization" name="organization" required />
        <Field label="Role" name="role" required />
        <Field label="Email" name="email" type="email" required />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectField
          label="Division of interest"
          name="division"
          required
          options={[
            { value: "", label: "— choose a division" },
            ...DIVISIONS.map((d) => ({ value: d.slug, label: d.name })),
            { value: "not-sure", label: "Not sure yet" },
          ]}
        />
        <SelectField
          label="How soon"
          name="timeline"
          required
          options={[
            { value: "", label: "— choose a horizon" },
            ...TIMELINES.map((t) => ({ value: t, label: t })),
          ]}
        />
      </div>

      <div>
        <label className="block">
          <span className="field-label">
            What are you trying to decide, build, or fix?
          </span>
          <textarea
            name="message"
            required
            rows={6}
            className="field-line mt-3 resize-y leading-[1.55]"
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <CTAButton
          variant="primary"
          type="submit"
          disabled={status === "submitting"}
          ariaBusy={status === "submitting"}
        >
          {status === "submitting" ? "Sending…" : "Send brief →"}
        </CTAButton>
        {status === "error" && (
          <p className="text-[14px] text-[color:var(--color-ch-homehealth)]">{errorMsg}</p>
        )}
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <input type={type} name={name} required={required} className="field-line mt-2" />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}{required ? " *" : ""}</span>
      <select name={name} required={required} defaultValue="" className="field-line mt-2">
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}
