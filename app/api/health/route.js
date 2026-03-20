export async function GET() {
  try {
    const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
    
    return Response.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      env: {
        openaiConfigured: hasOpenAIKey,
        nodeEnv: process.env.NODE_ENV,
      },
    });
  } catch (error) {
    return Response.json(
      {
        status: "error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
