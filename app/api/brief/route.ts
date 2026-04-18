import { NextRequest, NextResponse } from "next/server";
import { FIRM } from "@/lib/constants";

type BriefPayload = {
  name?: string;
  organization?: string;
  role?: string;
  email?: string;
  division?: string;
  timeline?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  try {
    const payload = (await req.json()) as BriefPayload;

    const missing = (["name", "organization", "role", "email", "division", "timeline", "message"] as const).filter(
      (key) => !payload[key],
    );

    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 },
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL ?? FIRM.contactEmail;
    const resendKey = process.env.RESEND_API_KEY;

    const body = [
      `Name: ${payload.name}`,
      `Organization: ${payload.organization}`,
      `Role: ${payload.role}`,
      `Email: ${payload.email}`,
      `Division of interest: ${payload.division}`,
      `Timeline: ${payload.timeline}`,
      "",
      "—",
      "",
      payload.message,
    ].join("\n");

    if (resendKey) {
      try {
        const { Resend } = await import("resend");
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: "C Highland Advisory <onboarding@resend.dev>",
          to: contactEmail,
          subject: `[Brief] ${payload.name} · ${payload.organization}`,
          replyTo: payload.email,
          text: body,
        });
      } catch (sendErr) {
        console.error("[brief] Resend send failed:", sendErr);
        return NextResponse.json(
          { error: "Email delivery failed. Try again shortly." },
          { status: 502 },
        );
      }
    } else {
      console.log("── Brief submission (no RESEND_API_KEY) ──");
      console.log(body);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[brief] route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
