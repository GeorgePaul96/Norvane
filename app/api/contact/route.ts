import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, role, challenge, message } = body;

    if (!name?.trim() || !company?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, company, and message are required." },
        { status: 400 }
      );
    }

    // To enable email delivery, integrate Resend (resend.com — free tier available):
    //
    // 1. npm install resend
    // 2. Add RESEND_API_KEY to .env.local
    // 3. Uncomment and adapt the block below:
    //
    // import { Resend } from "resend";
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "contact@norvane.com",
    //   to: "hello@norvane.com",
    //   subject: `New inquiry from ${name} at ${company}`,
    //   text: [
    //     `Name: ${name}`,
    //     `Company: ${company}`,
    //     `Role: ${role || "Not specified"}`,
    //     `Challenge: ${challenge || "Not specified"}`,
    //     ``,
    //     `Message:`,
    //     message,
    //   ].join("\n"),
    // });

    console.log("Contact form submission:", { name, company, role, challenge, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request." },
      { status: 500 }
    );
  }
}
