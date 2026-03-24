import { OpenAI } from "openai";
import { AGENTS } from "@/lib/lib/lib/agents";
import { getAuthenticatedSession } from "@/lib/auth";
import { getOpenAIApiKey } from "@/lib/openai-key";
import { generateWithKpaGuard } from "@/lib/svl-kpa-engine";
import {
  buildTokFaithMemorySystemMessage,
  getTokFaithMemoryContext,
  updateTokFaithMemory,
} from "@/lib/tokfaith-memory";
import {
  buildSupportiveEmergencyResponse,
  detectSupportiveHandoffCase,
  getSupportiveHandoffSystemMessage,
} from "@/lib/svl-supportive-handoff";
import {
  findBook,
  getPassage,
  getAvailablePassagesSummary,
} from "@/lib/ethiopian-bible-data";

export async function POST(req) {
  let message = "";
  let userId;
  let userName;
  let safetyMode = false;

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

    const safetyCase = detectSupportiveHandoffCase(message);
    safetyMode = safetyCase.requiresSupportiveTone;

    if (safetyCase.requiresEmergencyResponse) {
      return new Response(
        JSON.stringify({
          success: true,
          agentName: "TokFaith",
          response: buildSupportiveEmergencyResponse(safetyCase),
          userId,
          safetyMode: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const tokFaithAgent = AGENTS.tokfaith;
    if (!tokFaithAgent) {
      return new Response(
        JSON.stringify({ error: "TokFaith agent not found" }),
        { status: 404 }
      );
    }

    // CHECK FOR BIBLE READING REQUESTS FIRST
    if (detectBibleRequest(message)) {
      const bookRequest = extractBookAndChapter(message);
      const bibleResponse = buildBibleReadingResponse(bookRequest, userName);
      
      return new Response(
        JSON.stringify({
          success: true,
          agentName: "TokFaith",
          response: bibleResponse,
          userId,
          userName,
          safetyMode,
          isBibleReading: true,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const openAiApiKey = getOpenAIApiKey();
    const openai = new OpenAI({
      apiKey: openAiApiKey || "test-key",
    });
    const memoryContext = await getTokFaithMemoryContext(userId);
    const memorySystemMessage = buildTokFaithMemorySystemMessage(memoryContext);

    const messages = [
      {
        role: "system",
        content: tokFaithAgent.systemPrompt,
      },
      ...(memorySystemMessage
        ? [{ role: "system", content: memorySystemMessage }]
        : []),
      ...(safetyCase.requiresSupportiveTone
        ? [{ role: "system", content: getSupportiveHandoffSystemMessage("TokFaith") }]
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
            temperature: 0.9,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            buildDemoResponse(message, memoryContext, userName)
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
            temperature: 0.9,
          });

          return (
            response.choices?.[0]?.message?.content?.trim() ||
            buildDemoResponse(message, memoryContext, userName)
          );
        }
      );
    } else {
      responseText = buildDemoResponse(message, memoryContext, userName);
    }

    if (userId) {
      await updateTokFaithMemory({
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
        agentName: tokFaithAgent.name,
        response: responseText,
        userId,
        userName,
        safetyMode,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("TokFaith Chat Error:", error);
    return new Response(
      JSON.stringify({
        success: true,
        agentName: "TokFaith",
        response: buildDemoResponse(message || "Give me a word for today", null, userName),
        userId,
        safetyMode,
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

function buildDemoResponse(userMessage, memoryContext = null, userName = null) {
  const lowerMessage = userMessage.toLowerCase();
  const firstName = formatUserName(userName || memoryContext?.profile?.userName);
  const namedFriend = firstName || "my friend";
  const namedBeloved = firstName || "beloved";

  if (
    lowerMessage.includes("start a bible study") ||
    lowerMessage.includes("start bible study") ||
    lowerMessage.includes("start a study")
  ) {
    return `I hear you, ${namedFriend}, and I'd be glad to walk that with you. We can start with the parables of Jesus, the restored Ethiopian Bible lane, or a faith-and-life study built around what you need most right now. If you want a strong starting lane, I recommend beginning with the Prodigal Son, the Sower, or Enoch depending on whether you want restoration, spiritual growth, or deeper study.

Faith Challenge: Choose one study lane today and stay with it long enough for the lesson to work on you.
Speak This: God is ordering my steps, and I am ready to learn with faith, strength, and understanding.`;
  }

  if (
    lowerMessage.includes("continue my last lesson") ||
    lowerMessage.includes("continue last lesson")
  ) {
    const lastLesson = memoryContext?.lessonMemories?.[0];
    if (lastLesson) {
      return `I remember where we left off, ${namedBeloved}. Your most recent lesson lane was ${lastLesson.lessonTitle}. We can pick that back up, revisit your questions, and keep building from what God already started in you.

Faith Challenge: Reopen the last lesson with one honest question you still need God to clarify.
Speak This: God is not starting over with me. She is helping me keep walking what I have already begun to learn.`;
    }

    return `I can do that, ${namedFriend}, but I do not have a prior lesson stored yet for this user profile. Start one study with me here, and from there I can keep building with you lesson by lesson.

Faith Challenge: Start one clear lesson today so your study path has a real first stone.
Speak This: God is giving me a real place to begin, and I will grow from here with faith and consistency.`;
  }

  if (
    lowerMessage.includes("review my study notes") ||
    lowerMessage.includes("my study notes")
  ) {
    const recentLessons = memoryContext?.lessonMemories || [];
    if (recentLessons.length > 0) {
      const lessonNames = recentLessons.slice(0, 3).map((lesson) => lesson.lessonTitle).join(", ");
      return `I can review that with you, ${namedBeloved}. Right now your recent study trail includes ${lessonNames}. I can help you revisit what stood out, what questions are still open, and what God may be emphasizing across those lessons.

Faith Challenge: Go back over one note from a past lesson and ask what obedience it calls for today.
Speak This: God is helping me remember what matters, and my study is turning into real growth.`;
    }

    return `We can build those notes together, ${namedFriend}. Once you begin studying with me, I will start keeping track of your lesson trail, your questions, and the themes God keeps bringing forward.

Faith Challenge: Begin one study today and say one thing you want TokFaith to remember from it.
Speak This: My study has direction, and God is helping me grow with clarity.`;
  }

  if (
    lowerMessage.includes("show me how i've grown") ||
    lowerMessage.includes("show me how i have grown") ||
    lowerMessage.includes("my growth")
  ) {
    const profile = memoryContext?.profile;
    if (profile?.growthMilestones?.length || profile?.spiritualNeeds?.length) {
      return `I can see some of that path with you, ${namedBeloved}. Your recent growth has been circling around ${profile.spiritualNeeds?.join(", ") || "faithfulness and understanding"}. We can keep strengthening what God is already shaping instead of treating every lesson like a brand-new beginning.

Faith Challenge: Thank God for one real area where you are stronger now than you were before.
Speak This: God is growing me on purpose, and I will not overlook the work already happening in me.`;
    }

    return `That growth story is coming, ${namedFriend}. The more you study with TokFaith, the more clearly I can reflect back the lessons, questions, and changes God is walking you through.

Faith Challenge: Start your next study by naming one area where you want God to grow you.
Speak This: My growth in God is real, and I am becoming stronger with every faithful step.`;
  }

  if (
    lowerMessage.includes("prodigal") ||
    lowerMessage.includes("lost son")
  ) {
    return `That's a good question, my friend. The Prodigal Son is about more than a boy coming home. It is about the mercy of the Father, the pain of rebellion, the humility of return, and the danger of becoming bitter even while staying in the house. It teaches that God restores the one who truly turns back, and it also warns faithful people not to harden their hearts when grace reaches somebody else.

Faith Challenge: Come back to God honestly in one area where pride has kept you far away.
Speak This: God is not ashamed to receive me, and I have the strength to come home right.`;
  }

  if (
    lowerMessage.includes("sower") ||
    lowerMessage.includes("seed") ||
    lowerMessage.includes("soil")
  ) {
    return `I hear you, ${namedBeloved}. The Parable of the Sower teaches that the Word is strong, but the condition of the heart matters. Some seed gets snatched, some dries up, some gets choked, and some bears fruit. The lesson is not just to hear truth. The lesson is to become good ground through obedience, endurance, and protection of what God planted in you.

Faith Challenge: Remove one distraction today that keeps the Word from taking deeper root in you.
Speak This: I am good ground for what God is planting, and I will bear fruit with patience and strength.`;
  }

  if (
    lowerMessage.includes("talent") ||
    lowerMessage.includes("talents")
  ) {
    return `Let me say it plain, my friend. The Parable of the Talents is about stewardship, courage, and faithful use of what God has already placed in your hands. Fear buries. Faithful work multiplies. The point is not comparison. The point is obedience with what you were trusted to carry.

Faith Challenge: Put one gift, idea, or responsibility to work today instead of hiding it.
Speak This: I will not bury what God gave me. I will work it faithfully and grow in strength.`;
  }

  if (
    lowerMessage.includes("mustard") ||
    lowerMessage.includes("lost sheep") ||
    lowerMessage.includes("lost coin") ||
    lowerMessage.includes("virgins") ||
    lowerMessage.includes("builders") ||
    lowerMessage.includes("rich man") ||
    lowerMessage.includes("lazarus") ||
    lowerMessage.includes("unforgiving servant") ||
    lowerMessage.includes("workers in the vineyard") ||
    lowerMessage.includes("pharisee") ||
    lowerMessage.includes("publican")
  ) {
    return `That's a good question, my friend. Jesus taught through many parables because different hearts need different doors. Some parables teach mercy, some teach readiness, some teach stewardship, some teach humility, and some teach what happens when people refuse to let truth change them. If you want, I can walk you through any one of them plainly and show how it applies to your life right now.

Faith Challenge: Choose one parable today and ask, "Lord, where am I in this story?"
Speak This: God is opening my understanding, and I have the strength to live what He shows me.`;
  }

  if (
    lowerMessage.includes("enoch") ||
    lowerMessage.includes("jubilees") ||
    lowerMessage.includes("meqabyan") ||
    lowerMessage.includes("mekabyan") ||
    lowerMessage.includes("sirach") ||
    lowerMessage.includes("wisdom") ||
    lowerMessage.includes("baruch") ||
    lowerMessage.includes("tobit") ||
    lowerMessage.includes("judith")
  ) {
    return `I hear you, ${namedBeloved}. That wider Ethiopian Bible lane matters because it gives room to study books many people were never taught to open. Some books emphasize judgment and heavenly order, some highlight wisdom and endurance, and some strengthen courage, identity, and devotion under pressure.

Here's what I want you to know: I will make it clear. Ancient books can sound confusing, but the truth underneath is not complicated. I will break down the themes into simple language, give you the historical context so it makes sense, use examples you can live with today, and ask what you need explained so nothing stays foggy. You will not get lost. We can take it slow, one section at a time, or jump to the core lesson—whatever works for you.

TokFaith can help you walk those themes carefully, with reverence and honesty, without pretending certainty where a direct text check is still needed.

Faith Challenge: Pick one wider-canon book and ask me to walk you through it in plain, clear language.
Speak This: God is widening my understanding, and I have the strength to study deeply and walk humbly.`;
  }

  if (lowerMessage.includes("parable")) {
    return `That's a good question, my friend. Jesus used many parables to bring heavenly truth down into everyday life so people could see themselves clearly and still have a door to repentance, courage, humility, mercy, and faith. A parable is not just a story to admire. It is an invitation to change how you walk. If you want, I can break down the Prodigal Son, the Sower, the Talents, the Lost Sheep, the Ten Virgins, or another one in plain language.

Faith Challenge: Read one parable today and write one sentence about what God is asking you to do with it.
Speak This: God is teaching me in plain language, and I have the strength to walk what I hear.`;
  }

  if (
    lowerMessage.includes("ethiopian") ||
    lowerMessage.includes("88") ||
    lowerMessage.includes("bible") ||
    lowerMessage.includes("scripture")
  ) {
    return `I hear you, ${namedBeloved}. The restored Ethiopian Bible lane gives people a wider canon to study, reflect on, and respect. TokFaith can help you move through themes, books, and spiritual lessons in plain language across familiar books and wider-canon books like Enoch, Jubilees, Meqabyan, Sirach, Wisdom, Baruch, Tobit, and Judith, while staying honest if an exact citation needs to be checked directly.

Faith Challenge: Pick one book or theme you want to study this week and stay with it instead of bouncing around.
Speak This: I am not lost in the Word. God is giving me steady footing, wisdom, and strength to climb.`;
  }

  if (
    lowerMessage.includes("black sheep") ||
    lowerMessage.includes("goat") ||
    lowerMessage.includes("strength")
  ) {
    return `Let me say it plain, my friend. Being the black sheep does not mean you were rejected by God. Sometimes it means you were set apart in a way other people did not understand yet. The goal is not bitterness. The goal is to become steady, strong, and faithful enough to climb where fear said you would fall.

Faith Challenge: Do one disciplined thing today that matches the person God is growing you into.
Speak This: I was the black sheep, but God is making me sure-footed. I am climbing in faith, and strength is still being built in me.`;
  }

  return `I hear you, and I'm glad you came here. TokFaith is here to help you walk scripture, faith, testimony, and practical obedience in a way that feels real enough to live. We can study, pray through a problem, or put words to the season you're in, and we will leave this conversation stronger than we came in.

Faith Challenge: Take five quiet minutes with God before the day ends and tell Him the truth about where you are.
Speak This: God is not finished with me. SVL was built on strength, and by faith I am still rising.`;
}

function detectBibleRequest(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  const bibleKeywords = ["read from", "read", "show me", "quote", "verse", "passage", "chapter", "scripture"];
  const bookNames = ["enoch", "jubilees", "meqabyan", "mekabyan", "sirach", "wisdom", "baruch", "tobit", "judith"];
  
  const hasBibleKeyword = bibleKeywords.some(keyword => lowerMessage.includes(keyword));
  const hasBookName = bookNames.some(book => lowerMessage.includes(book));
  
  return hasBibleKeyword && hasBookName;
}

function extractBookAndChapter(userMessage) {
  const lowerMessage = userMessage.toLowerCase();
  const bookNames = ["enoch", "jubilees", "meqabyan", "mekabyan", "sirach", "wisdom", "baruch", "tobit", "judith"];
  
  let foundBook = null;
  for (const book of bookNames) {
    if (lowerMessage.includes(book)) {
      foundBook = book;
      break;
    }
  }
  
  if (!foundBook) return null;
  
  // Try to extract chapter number (like "chapter 1" or "1:" or just "1")
  const chapterMatch = userMessage.match(/chapter\s*(\d+)|:?\s*(\d+)\s*:/i);
  const chapter = chapterMatch ? parseInt(chapterMatch[1] || chapterMatch[2]) : 1;
  
  return { book: foundBook, chapter };
}

function buildBibleReadingResponse(bookRequest, userName) {
  const namedBeloved = userName || "beloved";
  
  if (!bookRequest) {
    return `I hear you, ${namedBeloved}. You can ask me to read from any of these books: Enoch, Jubilees, Meqabyan, Sirach, Wisdom, Baruch, Tobit, or Judith. Just say "Read from Enoch, Chapter 1" or "Show me Jubilees 5" and I will open that scripture for you, speak it aloud, and help you understand what God is saying through it.

Faith Challenge: Ask for one passage today and sit with it 'til it speaks to your heart.
Speak This: God's Word is opening to me, and I will understand what my Father is telling me.`;
  }
  
  const passage = getPassage(bookRequest.book, bookRequest.chapter);
  
  if (!passage) {
    // Book found but no passage in our database yet
    const book = findBook(bookRequest.book);
    const bookTitle = book?.name || bookRequest.book;
    
    return `I hear you, ${namedBeloved}, and I love that you're reaching for the deep wells. The ${bookTitle} has riches to teach. Here's what I can tell you: this particular passage isn't loaded into my Ethiopia Bible app yet, but I can teach you the themes and wisdom that flow through that book. 

The Ethiopian Bible was preserved with reverence and care, and books like ${bookTitle} carry teachings about how to live with faith, strength, and obedience. Ask me to teach you what ${bookTitle} says about a topic that's on your heart—faith, suffering, righteousness, wisdom—and we can walk through the real meaning together, even as we keep that original passage in view.

Faith Challenge: Tell me one thing your heart wants to understand from this book, and we'll unpack it together.
Speak This: God is speaking to me through words written long ago, and I have ears to hear and a heart to understand.`;
  }
  
  // We have the passage!
  const bookTitle = passage.book;
  const verseReference = passage.startVerse === passage.endVerse 
    ? `${bookTitle} ${passage.chapter}:${passage.startVerse}` 
    : `${bookTitle} ${passage.chapter}:${passage.startVerse}-${passage.endVerse}`;
  
  return `Here is what the ${bookTitle} says, ${namedBeloved}:

**${verseReference}**

"${passage.text}"

---

This is the Word preserved in the Ethiopian tradition. Let this settle into your heart. The God who spoke these words is still speaking. What is He saying to you through this passage? What does it call you to do or believe?

Faith Challenge: Read that passage aloud three times slowly, and after the third time, ask God one honest question about what it means.
Speak This: The Word of God is living and active in me. I hear Him speaking, and I will obey what I understand.`;
}

