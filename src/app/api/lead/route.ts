export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("Lead received by server:", body);

    return Response.json({
      success: true,
      message: "Lead received",
      data: body,
    });
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid request body",
      },
      { status: 400 },
    );
  }
}
