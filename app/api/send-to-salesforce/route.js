import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { first_name, last_name, email, phone, country, message } = body;

    // Prepare Salesforce form data
    const fullName = `${first_name} ${last_name}`.trim();
    const salesforceData = new URLSearchParams();
    salesforceData.append("orgid", "00DUF000004tBgV");
    salesforceData.append("retURL", "https://www.gtcfx.com/thank-you");
    salesforceData.append("name", fullName);
    salesforceData.append("email", email);
    salesforceData.append("phone", phone || "");
    salesforceData.append("subject", `Contact Form: ${message?.substring(0, 50) || "Inquiry"}`);
    salesforceData.append("description", `Country: ${country}\n\nMessage: ${message}`);
    salesforceData.append("external", "1");

    // Submit to Salesforce
    const salesforceRes = await fetch(
      "https://gtcglobaltradecapital3--partialdev.sandbox.my.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8&orgId=00DUF000004tBgV",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: salesforceData.toString(),
      }
    );

    if (!salesforceRes.ok) {
      throw new Error(`Salesforce submission failed: ${salesforceRes.status}`);
    }

    return NextResponse.json({ message: "Successfully submitted to Salesforce" }, { status: 200 });
  } catch (error) {
    console.error("Salesforce Error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to submit to Salesforce" },
      { status: 500 }
    );
  }
}

