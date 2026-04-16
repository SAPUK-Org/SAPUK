import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, firstName } = await req.json();

    if (!email || !firstName) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || "";
    const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || "";
    const MAILCHIMP_DC = process.env.MAILCHIMP_DC || "";

    if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID || !MAILCHIMP_DC) {
      console.error(
        "Mailchimp credentials are not properly set in env variables"
      );
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const url = `https://${MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
    const auth = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString(
      "base64"
    );

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
        },
      }),
    });

    if (response.status >= 400) {
      const errorData = await response.json();
      console.error("Mailchimp error:", errorData);
      return NextResponse.json(
        { success: false, message: "Failed to subscribe with Mailchimp" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    console.error("Error subscribing to Mailchimp:", error);
    return NextResponse.json(
      { success: false, message: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
