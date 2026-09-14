import { createHmac, timingSafeEqual } from "crypto";
import { getHubSpotContact } from "@/lib/hubspot";
import { sendMetaEvent } from "@/lib/meta-capi";

type HubSpotWebhookEvent = {
  subscriptionType?: string;
  objectTypeId?: string;
  objectId?: string;
  propertyName?: string;
  propertyValue?: string;
  occurredAt?: number;
};

function verifyHubSpotSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null,
  method: string,
  url: string,
): boolean {
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET;

  if (!clientSecret || !signature || !timestamp) {
    return false;
  }

  const timestampNumber = Number(timestamp);

  if (!Number.isFinite(timestampNumber)) {
    return false;
  }

  // Reject requests older than 5 minutes.
  if (Math.abs(Date.now() - timestampNumber) > 5 * 60 * 1000) {
    return false;
  }

  const sourceString = method + url + rawBody + timestamp;

  const expectedSignature = createHmac("sha256", clientSecret)
    .update(sourceString)
    .digest("base64");

  const expected = Buffer.from(expectedSignature);
  const received = Buffer.from(signature);

  if (expected.length !== received.length) {
    return false;
  }

  return timingSafeEqual(expected, received);
}

export async function POST(request: Request) {
  const rawBody = await request.text();

  const signature = request.headers.get("x-hubspot-signature-v3");
  const timestamp = request.headers.get("x-hubspot-request-timestamp");

  const validSignature = verifyHubSpotSignature(
    rawBody,
    signature,
    timestamp,
    request.method,
    request.url,
  );

  if (!validSignature) {
    console.error("Invalid HubSpot webhook signature");

    return Response.json(
      {
        success: false,
        message: "Invalid webhook signature",
      },
      { status: 401 },
    );
  }

  let events: HubSpotWebhookEvent[];

  try {
    events = JSON.parse(rawBody);
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid JSON payload",
      },
      { status: 400 },
    );
  }

  if (!Array.isArray(events)) {
    events = [events];
  }

  for (const event of events) {
    console.log("HubSpot webhook received:", event);

    if (
      event.objectTypeId !== "0-1" ||
      event.subscriptionType !== "object.propertyChange" ||
      event.propertyName !== "hs_lead_status"
    ) {
      continue;
    }

    const contactId = event.objectId;

    if (!contactId) {
      console.error("HubSpot webhook missing objectId");
      continue;
    }

    const leadStatus = event.propertyValue;

    console.log("HubSpot lead status changed:", {
      contactId,
      leadStatus,
    });

    // We only want a Meta conversion when sales
    // has actually connected with the lead.
    if (leadStatus !== "CONNECTED") {
      continue;
    }

    const contact = await getHubSpotContact(contactId);

    const email = contact?.properties?.email;

    if (!email) {
      console.error("HubSpot contact has no email:", contactId);
      continue;
    }

    /*
     * Use a deterministic event ID based on the HubSpot
     * contact + status transition.
     *
     * This prevents the same HubSpot notification from
     * generating multiple Meta events.
     */
    const eventId = `hubspot-connected-${contactId}`;

    const result = await sendMetaEvent({
      eventName: "Lead",
      eventId,
      email,
      customData: {
        lead_status: "CONNECTED",
        lead_source: "hubspot",
        lead_form: "demo_request",
      },
    });

    console.log("Meta CAPI CRM Lead sent:", {
      contactId,
      email,
      eventId,
      result,
    });
  }

  return Response.json({
    success: true,
  });
}
