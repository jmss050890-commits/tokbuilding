import { OpenAI } from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getAuthenticatedSession } from "@/lib/auth";
import {
  buildFirstGuardianMemorySystemMessage,
  getFirstGuardianMemoryContext,
  updateFirstGuardianMemory,
} from "@/lib/first-guardian-memory";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";

const FIRST_GUARDIAN_SLUG = "first-guardian";
const CRISIS_RESPONSE_SYSTEM =
  "You are handling a high-risk safety escalation for The First Guardian. Keep the response short, calm, direct, and action-first. Do not analyze blame, custody, punishment, or control. Tell the person to prioritize immediate safety, involve emergency services or a trusted nearby adult, and avoid escalating confrontation. If a child may be unsafe, focus on getting the child to a safe adult or safe place and contacting emergency or child-protection resources as appropriate. If self-harm is mentioned, direct the person to 911 or 988 immediately if in the United States. After giving the urgent next step, add one brief supportive handoff line that stays present without pretending to monitor the world, such as: 'Make that call now. Come right back and tell me once you've done it.' Never present yourself as a substitute for emergency responders, licensed clinicians, lawyers, or child-protection authorities.";

export async function POST(req) {
  let message = "";
  let userId;
  let userName;
  let safetyMode = false;
  let escalationType = "standard";
  try {
    const session = getAuthenticatedSession(req);
    const body = await req.json();
    message = body?.message?.trim();
    userId = session?.userId || body?.userId || null;
    userName = session?.name || body?.userName || null;

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message cannot be empty" }),
        { status: 400 }
      );
    }

    const guardianAgent = AGENTS[FIRST_GUARDIAN_SLUG];
    if (!guardianAgent) {
      return new Response(
        JSON.stringify({ error: "The First Guardian agent was not found" }),
        { status: 404 }
      );
    }

    const openAiApiKey = getOpenAIApiKey();
    const openai = new OpenAI({
      apiKey: openAiApiKey || "test-key",
    });

    const safetyCase = detectSafetyCase(message);
    safetyMode = safetyCase.requiresEscalation;
    escalationType = safetyCase.type;
    const memoryContext = await getFirstGuardianMemoryContext(userId);
    const memorySystemMessage = buildFirstGuardianMemorySystemMessage(memoryContext);

    if (safetyCase.isEmergency) {
      return new Response(
        JSON.stringify({
          success: true,
          agentName: guardianAgent.name,
          response: buildEmergencyResponse(safetyCase),
          userId,
          userName,
          safetyMode: true,
          escalationType: safetyCase.type,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const messages = [
      {
        role: "system",
        content: guardianAgent.systemPrompt,
      },
      ...(memorySystemMessage
        ? [{ role: "system", content: memorySystemMessage }]
        : []),
      ...(safetyCase.requiresEscalation
        ? [{ role: "system", content: CRISIS_RESPONSE_SYSTEM }]
        : []),
      {
        role: "user",
        content: message,
      },
    ];

    let responseText;

    if (openAiApiKey) {
      responseText = await generateWithKpaGuard(
        async () => {
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 1024,
            temperature: 0.85,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            generateDemoResponse(message, memoryContext, userName)
          );
        },
        async (repairPrompt) => {
          const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              ...messages.slice(0, -1),
              {
                role: "user",
                content: `Original user message:\n${message}\n\n${repairPrompt}`,
              },
            ],
            max_tokens: 1024,
            temperature: 0.85,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            generateDemoResponse(message, memoryContext, userName)
          );
        }
      );
    } else {
      responseText = generateDemoResponse(message, memoryContext, userName);
    }

    if (userId) {
      await updateFirstGuardianMemory({
        userId,
        userName,
        message,
        response: responseText,
        source: session ? "auth" : "guest",
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        agentName: guardianAgent.name,
        response: responseText,
        userId,
        userName,
        safetyMode,
        escalationType,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("First Guardian Chat Error:", error);

    return new Response(
      JSON.stringify({
        success: true,
        agentName: "The First Guardian",
        response: generateDemoResponse(message || "Help me protect my peace at home", null, userName),
        userId,
        userName,
        safetyMode,
        escalationType,
        fallbackMode: true,
        details:
          process.env.NODE_ENV === "development" ? error?.message : undefined,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }
}

function formatUserName(userName) {
  if (!userName) {
    return "";
  }

  return userName.trim().split(/\s+/)[0] || "";
}

function generateDemoResponse(userMessage, memoryContext = null, userName = null) {
  const safetyCase = detectSafetyCase(userMessage);

  if (safetyCase.isEmergency) {
    return buildEmergencyResponse(safetyCase);
  }

  const lowerMessage = userMessage.toLowerCase();
  const firstName = formatUserName(userName || memoryContext?.profile?.userName);
  const namedUser = firstName || "baby";
  const lastThread = memoryContext?.threadMemories?.[0];

  if (
    lowerMessage.includes("continue") ||
    lowerMessage.includes("pick back up") ||
    lowerMessage.includes("last time")
  ) {
    if (lastThread) {
      return `I remember where we left off, ${namedUser}. The last big thread we were working was ${lastThread.threadTitle}. We can keep building on that instead of starting from scratch, especially if the same people, same patterns, and same pressure are still in the room.`;
    }

    return `We can absolutely build a steady path here, ${namedUser}. I just do not have a stored thread for this user yet. Start one real conversation with me here, and from there I can keep up with your household patterns, your questions, and the boundaries we're trying to hold.`;
  }

  if (
    lowerMessage.includes("what do you remember") ||
    lowerMessage.includes("my notes") ||
    lowerMessage.includes("my progress")
  ) {
    const profile = memoryContext?.profile;
    if (profile) {
      return `Here's the shape I can already see, ${namedUser}: we've been circling around ${profile.householdNeeds?.join(", ") || "peace and protection"}, and your current focus is ${profile.currentFocus || "Home First guidance"}. I can keep building on that so you do not have to explain your whole household story from zero every time.`;
    }

    return `Once we get one or two real conversations going, I can start reflecting your patterns back to you, ${namedUser}. Right now there is not stored progress for this profile yet, but that can change the moment we start working the real issue.`;
  }

  if (
    lowerMessage.includes("money") ||
    lowerMessage.includes("bills") ||
    lowerMessage.includes("rent") ||
    lowerMessage.includes("financial")
  ) {
    return `Baby, money pressure will have a whole house talking crazy if nobody slows down. Start with the facts, not the feelings: what is due, what is late, what can wait, and who is actually responsible for what. Then draw one clean line: we are not panicking, and we are not letting stress turn us against each other. Handle the numbers first, then the emotions can come sit down in their chair.`;
  }

  if (
    lowerMessage.includes("disrespect") ||
    lowerMessage.includes("disrespectful") ||
    lowerMessage.includes("attitude") ||
    lowerMessage.includes("talking crazy")
  ) {
    return `You do not have to match disrespect to prove you have a backbone, ${namedUser}. Try this: 'I heard your feelings, but you're not going to talk to me any kind of way.' Short. Clean. No performance. Real authority does not need extra yelling. If they keep going, let distance do what arguing could not do.`;
  }

  if (
    lowerMessage.includes("drama") ||
    lowerMessage.includes("messy") ||
    lowerMessage.includes("chaos")
  ) {
    return "If somebody keeps bringing drama into your peace, stop calling it a misunderstanding and call it what it is: disruption. You can love people and still not let them turn your home into a waiting room for foolishness. Tighten the door, shorten the conversation, and protect your peace before the whole house starts breathing in confusion.";
  }

  if (
    lowerMessage.includes("relationship") ||
    lowerMessage.includes("boyfriend") ||
    lowerMessage.includes("girlfriend") ||
    lowerMessage.includes("red flag") ||
    lowerMessage.includes("love")
  ) {
    return "Love is not supposed to make you ignore what God already let you see. If your spirit keeps flinching, slow down and ask the real question: is this person bringing peace, honesty, and consistency into my life, or just chemistry and confusion? You do not need to rush toward a lesson you already recognize.";
  }

  if (
    lowerMessage.includes("coparent") ||
    lowerMessage.includes("co-parent") ||
    lowerMessage.includes("baby daddy") ||
    lowerMessage.includes("baby mama")
  ) {
    return "Co-parenting gets lighter when you stop trying to win every point and start protecting the child's stability. Keep it short, keep it documented, keep it about the child, and do not drag old relationship hurt into today's parenting decision. The child needs steadiness more than either adult needs the last word.";
  }

  if (
    lowerMessage.includes("grown") ||
    lowerMessage.includes("adult child") ||
    lowerMessage.includes("my son") ||
    lowerMessage.includes("my daughter")
  ) {
    return "A grown child still deserves love, but grown comes with responsibility. You can help without financing confusion, rescuing every consequence, or letting your house lose order. Support should build them, not make you disappear. Sometimes love sounds like, 'I love you, but I'm not carrying this for you anymore.'";
  }

  if (
    lowerMessage.includes("kids") ||
    lowerMessage.includes("children") ||
    lowerMessage.includes("child")
  ) {
    return "Start by taking the pressure off the kids. Keep adult conflict away from them, do not assume legal authority you may not have, make sure they know where they are sleeping, eating, and who the safe adult is tonight, and give them one calm sentence they can trust: 'You are safe, and I'm handling this.' If safety is in doubt, involve a safe adult or emergency help right away.";
  }

  if (
    lowerMessage.includes("home") ||
    lowerMessage.includes("house") ||
    lowerMessage.includes("family")
  ) {
    return "When the house is under pressure, do three things first: lower the temperature, protect the children from the conflict, and decide the next two practical actions before the next two emotional ones. We do not let the whole home collapse because one moment got loud. Home first means peace gets structure, not just hope.";
  }

  if (
    lowerMessage.includes("boundary") ||
    lowerMessage.includes("respect") ||
    lowerMessage.includes("calm")
  ) {
    return "A strong boundary does not need a speech. Try this: 'I'm not doing this in front of the kids. We can talk when the room is calm.' Short. Clear. No extra fire added. Baby, let the boundary do the heavy lifting.";
  }

  return `Bring me the mess plainly, ${namedUser}. I'll help you sort what needs to happen now, what can wait, and what protects the people in that home first without turning you into somebody bitter, loud, or worn all the way down.`;
}

function detectSafetyCase(userMessage) {
  const lowerMessage = userMessage.toLowerCase();

  const patterns = {
    childDanger: /\b(child|children|kid|kids|baby|minor)\b.*\b(danger|unsafe|hurt|hit|abuse|alone|scared)\b|\b(cps|child protection)\b/,
    violence: /\b(gun|knife|weapon|fight|violent|violence|attack|assault|threat|threaten|hit|beating|beat)\b/,
    intoxication: /\b(drunk|intoxicated|high|on drugs|blacked out|blackout|wasted)\b/,
    instability: /\b(psychotic|manic|unstable|out of control|not in their right mind)\b/,
    selfHarm: /\b(kill myself|suicide|suicidal|self-harm|hurt myself|end my life|want to die)\b/,
    medical: /\b(not breathing|passed out|overdose|seizure|bleeding|chest pain|medical emergency)\b/,
    emergency: /\b(immediate danger|911|emergency|unsafe right now|in danger right now)\b/,
  };

  const matches = {
    childDanger: patterns.childDanger.test(lowerMessage),
    violence: patterns.violence.test(lowerMessage),
    intoxication: patterns.intoxication.test(lowerMessage),
    instability: patterns.instability.test(lowerMessage),
    selfHarm: patterns.selfHarm.test(lowerMessage),
    medical: patterns.medical.test(lowerMessage),
    emergency: patterns.emergency.test(lowerMessage),
  };

  const isEmergency =
    matches.emergency ||
    matches.selfHarm ||
    matches.medical ||
    matches.violence ||
    matches.childDanger;

  const requiresEscalation =
    isEmergency ||
    matches.intoxication ||
    matches.instability;

  const type =
    (matches.selfHarm && "self-harm") ||
    (matches.medical && "medical") ||
    (matches.childDanger && "child-safety") ||
    (matches.violence && "violence") ||
    ((matches.intoxication || matches.instability) && "instability") ||
    (matches.emergency && "emergency") ||
    "standard";

  return {
    ...matches,
    type,
    isEmergency,
    requiresEscalation,
  };
}

function buildEmergencyResponse(safetyCase) {
  if (safetyCase.selfHarm) {
    return "If there is any immediate risk of self-harm, call 911 right now. If you are in the United States, call or text 988 right now as well. Stay with the person if you can do so safely, remove access to weapons or anything they could use to hurt themselves if it is safe to do that, and get a trusted adult or emergency responder involved immediately. Make that call now. Come right back and tell me once you've done it.";
  }

  if (safetyCase.medical) {
    return "This sounds like a medical emergency. Call 911 right now. Do not wait for the situation to calm down on its own. If someone is unconscious, not breathing normally, overdosing, having a seizure, or bleeding badly, emergency responders need to take over. Make that call now. Come back and tell me when help is on the way.";
  }

  if (safetyCase.childDanger) {
    return "If a child may be unsafe right now, focus on immediate safety first. Get the child to a safe adult or safe place, call 911 if there is immediate danger, and involve the appropriate child-protection or emergency resource in your area. Do not stay in a dangerous confrontation just to prove a point. Get to that safer place first, then come back and tell me what support is with you.";
  }

  if (safetyCase.violence) {
    return "If violence is possible right now, do not try to win the argument. Get to a safer place, call 911, and bring in a trusted nearby adult or emergency responder immediately. KPA means safety first, not staying in the room to manage danger alone. Move first. Make the call. Then come back and tell me when you're in the safer place.";
  }

  return "If someone is in immediate danger, call 911 right now or get to a safe nearby adult. After that, we can work the next steps. Home first means safety first. Take that step now, then come back and tell me where things stand.";
}
