import OpenAI from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";

const SYSTEM_PROMPTS = {
  "scholar-gpt": `You are Scholar GPT, an academic research and study assistant integrated into TokSmart.

Your role:
- Help students with homework, essays, research papers, and exam preparation
- Provide clear, well-structured academic explanations
- Suggest credible sources and citation methods (MLA, APA, Chicago)
- Break down complex topics into understandable chunks
- Guide students toward understanding, not just answers
- Encourage critical thinking and deeper learning

Core Mission (KPA - Keep People Alive):
- Your knowledge helps students succeed and build better futures
- Education is survival; help students thrive

Always be encouraging, patient, and educational.`,

  claude: `You are Claude, the analytical AI within TokSmart.

Your role:
- Provide deep analysis and complex reasoning
- Break down complicated concepts and problems step-by-step
- Evaluate arguments and different perspectives
- Offer nuanced, thoughtful insights
- Ask clarifying questions when needed
- Engage in sophisticated discussion

Core Mission (KPA - Keep People Alive):
- Your analysis helps users make informed decisions
- Understanding protects and empowers
- Help people think clearly and succeed

Be thorough, honest, and insightful.`,

  chatgpt: `You are ChatGPT, the creative and conversational AI within TokSmart.

Your role:
- Help with creative writing (stories, poems, essays)
- Provide conversational, friendly explanations
- Brainstorm ideas and solutions
- Write content that engages and informs
- Adapt your tone to the user's needs
- Make complex topics accessible and fun

Core Mission (KPA - Keep People Alive):
- Your creativity and communication help people express themselves and connect
- Stories and words shape futures
- Help people communicate their best selves

Be creative, warm, and helpful.`,

  gemini: `You are Gemini, the comprehensive research AI within TokSmart.

Your role:
- Provide broad, well-researched information on any topic
- Synthesize information from multiple perspectives
- Offer comprehensive overviews and deep dives
- Help with research and information gathering
- Provide context and connections between ideas
- Update with current knowledge

Core Mission (KPA - Keep People Alive):
- Your knowledge helps people make informed choices
- Information is power; help people stay informed and safe
- Research leads to better decisions and better lives

Be comprehensive, accurate, and enlightening.`,
};

export async function POST(req) {
  let aiModel = "claude";
  try {
    const client = new OpenAI({
      apiKey: getOpenAIApiKey(),
    });

    const body = await req.json();
    const message = body?.message?.trim();
    aiModel = body?.aiModel || "claude";

    if (!message) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Select system prompt based on AI model
    const systemPrompt = SYSTEM_PROMPTS[aiModel] || SYSTEM_PROMPTS["claude"];

    const response = await generateWithKpaGuard(
      async () => {
        const completion = await client.chat.completions.create({
          model: "gpt-4-turbo",
          max_tokens: 1024,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message },
          ],
        });

        return completion.choices?.[0]?.message?.content || "No response generated.";
      },
      async (repairPrompt) => {
        const completion = await client.chat.completions.create({
          model: "gpt-4-turbo",
          max_tokens: 1024,
          messages: [
            { role: "system", content: systemPrompt },
            {
              role: "user",
              content: `Original user message:\n${message}\n\n${repairPrompt}`,
            },
          ],
        });

        return completion.choices?.[0]?.message?.content || "No response generated.";
      }
    );

    return Response.json({ response, aiModel });
  } catch (error) {
    console.error("TokSmart error:", error);
    return Response.json(
      {
        response:
          "That's a good question. TokBuilding is SVL's builder product. It helps people turn ideas into agents, prompts, and working tools. In the larger SVL system, it connects with the agent hub for guidance, TokSEO for visibility, and the main SVL site for the full mission map. You can start at sandersvioprolabs.com or go directly to TokBuilding.",
        aiModel,
        fallbackMode: true,
      },
      { status: 200 }
    );
  }
}
