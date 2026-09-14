type HubSpotContactInput = {
  email: string;
  name?: string;
  leadSource?: string;
  leadForm?: string;
};

export async function upsertHubSpotContact({
  email,
  name,
}: HubSpotContactInput) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
  }

  const nameParts = name?.trim().split(/\s+/) ?? [];

  const firstname = nameParts[0] || "";
  const lastname = nameParts.slice(1).join(" ");

  const response = await fetch(
    "https://api.hubapi.com/crm/v3/objects/contacts/batch/upsert",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: [
          {
            id: email.trim().toLowerCase(),
            idProperty: "email",
            properties: {
              email: email.trim().toLowerCase(),
              firstname,
              lastname,
              lifecyclestage: "lead",
              hs_lead_status: "NEW",
            },
          },
        ],
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    console.error("HubSpot contact upsert failed:", result);

    throw new Error(
      `HubSpot contact upsert failed with status ${response.status}`,
    );
  }

  console.log("HubSpot contact upserted:", result);

  return result;
}

export async function getHubSpotContact(contactId: string) {
  const accessToken = process.env.HUBSPOT_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("HUBSPOT_ACCESS_TOKEN is not configured");
  }

  const url = new URL(
    `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(
      contactId,
    )}`,
  );

  url.searchParams.set(
    "properties",
    "email,firstname,lastname,hs_lead_status,lifecyclestage",
  );

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("HubSpot contact fetch failed:", result);

    throw new Error(
      `HubSpot contact fetch failed with status ${response.status}`,
    );
  }

  console.log("HubSpot contact fetched:", result);

  return result;
}
