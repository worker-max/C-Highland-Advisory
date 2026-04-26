import { FIRM } from "@/lib/constants";

/*
  InquireForm — minimal mailto-routed inquiry form.

  Used on tier sub-pages and on the engagement section of every
  discipline page. Submits via mailto: with a pre-filled subject and
  the form body so partners can self-route. Zero backend dependency
  — ships today without DNS, Resend, or Auth.js setup.

  When a real backend is ready we swap the action to /api/inquire
  and remove encType.
*/

type Props = {
  /** Subject line for the email. Suffix appears after a leading "Inquiry — ". */
  subject: string;
  /** Optional preface body line that pre-fills the email body. */
  preface?: string;
  /** Title of the form section. Defaults to "Inquire about pricing." */
  title?: string;
  /** Helper line below the title. Defaults to a 24-hour response promise. */
  helper?: string;
};

export function InquireForm({
  subject,
  preface,
  title = "Inquire about pricing.",
  helper = "We'll get back to you within 24 hours with a tailored package and pricing.",
}: Props) {
  const fullSubject = encodeURIComponent(`Inquiry — ${subject}`);
  const body = preface ? `\n\n— Pre-filled context —\n${preface}\n\n` : "";

  return (
    <div
      style={{
        background: "var(--color-paper)",
        borderRadius: 16,
        border: "1px solid var(--color-mist)",
        padding: 32,
        maxWidth: 640,
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(22px, 2.4vw, 28px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>
      <p
        className="body-sm"
        style={{ marginBottom: 24, color: "var(--color-silt)" }}
      >
        {helper}
      </p>

      <form
        action={`mailto:${FIRM.contactEmail}?subject=${fullSubject}&body=${encodeURIComponent(body)}`}
        method="post"
        encType="text/plain"
        style={{ display: "flex", flexDirection: "column", gap: 18 }}
      >
        <Field label="Name" name="name" required />
        <Field label="Email" name="email" type="email" required />
        <Field label="Company" name="company" />
        <Field
          label="Brief — what are you trying to move?"
          name="brief"
          textarea
          required
        />

        <button type="submit" className="btn btn-primary">
          <span>Send inquiry</span>
          <span className="arrow">→</span>
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label
        htmlFor={name}
        className="mono"
        style={{
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--color-silt)",
        }}
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={4}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid var(--color-mist)",
            padding: "10px 0",
            fontSize: 16,
            fontFamily: "inherit",
            color: "var(--color-ink)",
            outline: "none",
            resize: "vertical",
          }}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: "1px solid var(--color-mist)",
            padding: "10px 0",
            fontSize: 16,
            fontFamily: "inherit",
            color: "var(--color-ink)",
            outline: "none",
          }}
        />
      )}
    </div>
  );
}
