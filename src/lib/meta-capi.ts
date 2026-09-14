import { createHash } from "crypto";

const META_GRAPH_VERSION = "v23.0";

type MetaEventInput = {
  eventName: string;
  eventId: string;
  email: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  customData?: Record<string, unknown>;
};

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function sendMetaEvent({
  eventName,
  eventId,
  email,
  clientIpAddress,
  clientUserAgent,
  customData,
}: MetaEventInput) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId) {
    throw new Error("META_PIXEL_ID is not configured");
  }

  if (!accessToken) {
    throw new Error("META_CAPI_ACCESS_TOKEN is not configured");
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const userData: Record<string, unknown> = {
    em: [sha256(normalizeEmail(email))],
  };

  if (clientIpAddress) {
    userData.client_ip_address = clientIpAddress;
  }

  if (clientUserAgent) {
    userData.client_user_agent = clientUserAgent;
  }

  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime,
        event_id: eventId,
        action_source: "website",
        user_data: userData,
        custom_data: {
          lead_source: "website",
          lead_form: "demo_request",
          ...customData,
        },
      },
    ],
    test_event_code: "TEST57978",
  };

  const response = await fetch(
    `https://graph.facebook.com/${META_GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("Meta CAPI error:", result);

    throw new Error(`Meta CAPI request failed with status ${response.status}`);
  }

  return result;
}

export async function sendMetaLeadEvent({
  eventId,
  email,
  clientIpAddress,
  clientUserAgent,
}: {
  eventId: string;
  email: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}) {
  return sendMetaEvent({
    eventName: "Lead",
    eventId,
    email,
    clientIpAddress,
    clientUserAgent,
  });
}
