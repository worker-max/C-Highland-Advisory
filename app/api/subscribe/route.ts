import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const email = formData.get("email");
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }
    console.log("[subscribe] Issue 01 list:", email);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[subscribe] error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
