import { sendMetaLeadEvent } from "@/lib/meta-capi";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, lead_source, lead_form, event_id } = body;

    if (!email || !event_id) {
      return Response.json(
        {
          success: false,
          message: "Email and event_id are required",
        },
        { status: 400 },
      );
    }

    const clientIpAddress =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      undefined;

    const clientUserAgent = request.headers.get("user-agent") || undefined;

    console.log("Lead received by server:", {
      name,
      email,
      lead_source,
      lead_form,
      event_id,
    });

    const metaResult = await sendMetaLeadEvent({
      eventId: event_id,
      email,
      clientIpAddress,
      clientUserAgent,
    });

    console.log("Meta CAPI Lead sent:", metaResult);

    return Response.json({
      success: true,
      message: "Lead received",
      data: {
        name,
        email,
        lead_source,
        lead_form,
        event_id,
      },
      meta: metaResult,
    });
  } catch (error) {
    console.error("Lead API error:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to process lead",
      },
      { status: 500 },
    );
  }
}
