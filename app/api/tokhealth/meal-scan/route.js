import { OpenAI } from "openai";
import { getOpenAIApiKey } from "@/lib/openai-key";

function buildFallbackAnalysis(description = "") {
  const lowerDescription = description.toLowerCase();
  const proteinHeavy =
    lowerDescription.includes("chicken") ||
    lowerDescription.includes("fish") ||
    lowerDescription.includes("salmon") ||
    lowerDescription.includes("turkey") ||
    lowerDescription.includes("egg") ||
    lowerDescription.includes("steak");

  const carbHeavy =
    lowerDescription.includes("rice") ||
    lowerDescription.includes("pasta") ||
    lowerDescription.includes("bread") ||
    lowerDescription.includes("potato") ||
    lowerDescription.includes("fries");

  const veggieHeavy =
    lowerDescription.includes("broccoli") ||
    lowerDescription.includes("salad") ||
    lowerDescription.includes("spinach") ||
    lowerDescription.includes("vegetable") ||
    lowerDescription.includes("greens");

  return {
    mealName: description ? "Meal Estimate" : "Photo Meal Estimate",
    estimatedCalories: proteinHeavy && carbHeavy ? 540 : carbHeavy ? 460 : proteinHeavy ? 420 : 380,
    proteinGrams: proteinHeavy ? 32 : 14,
    carbsGrams: carbHeavy ? 48 : 24,
    fatGrams: proteinHeavy ? 16 : 14,
    fiberGrams: veggieHeavy ? 8 : 4,
    sodiumMg: 620,
    hydrationNote: "Pair this meal with water and watch sodium-heavy sauces or sides.",
    wellnessTakeaway: proteinHeavy && veggieHeavy
      ? "This looks like a steadier meal with a better protein and fiber balance."
      : "This is a reasonable estimate, but a clearer photo or fuller description will improve it.",
    caution: "Estimate only. Not medical or dietitian advice.",
  };
}

function safeJsonParse(content) {
  try {
    return JSON.parse(content);
  } catch {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return null;
    }

    try {
      return JSON.parse(jsonMatch[0]);
    } catch {
      return null;
    }
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const description = body?.description?.trim() || "";
    const photoData = body?.photoData || "";
    const allergies = Array.isArray(body?.allergies) ? body.allergies : [];
    const intolerances = Array.isArray(body?.intolerances) ? body.intolerances : [];

    if (!description && !photoData) {
      return Response.json({ error: "A meal description or photo is required." }, { status: 400 });
    }

    const openAiApiKey = getOpenAIApiKey();
    if (!openAiApiKey) {
      return Response.json({
        success: true,
        analysis: buildFallbackAnalysis(description),
        fallbackMode: true,
      });
    }

    const openai = new OpenAI({ apiKey: openAiApiKey });
    const allergyContext = [...allergies, ...intolerances].filter(Boolean).join(", ");

    const userContent = [
      {
        type: "text",
        text:
          `Analyze this meal and return strict JSON only with keys: mealName, estimatedCalories, proteinGrams, carbsGrams, fatGrams, fiberGrams, sodiumMg, hydrationNote, wellnessTakeaway, caution. ` +
          `Keep values practical and conservative estimates, not fake precision. ` +
          `Description: ${description || "No text description provided."} ` +
          `User allergies/intolerances: ${allergyContext || "None provided."} ` +
          `If allergens may be present, mention that in caution. ` +
          `Do not include markdown or extra commentary outside JSON.`,
      },
    ];

    if (photoData) {
      userContent.push({
        type: "image_url",
        image_url: {
          url: photoData,
        },
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 500,
      messages: [
        {
          role: "system",
          content:
            "You are a nutrition estimation assistant for TokHealth. Give useful wellness-oriented meal estimates with humble uncertainty. Never present exact medical nutrition facts. Output strict JSON only.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = response.choices?.[0]?.message?.content?.trim() || "";
    const parsed = safeJsonParse(content);

    if (!parsed) {
      return Response.json({
        success: true,
        analysis: buildFallbackAnalysis(description),
        fallbackMode: true,
      });
    }

    return Response.json({
      success: true,
      analysis: {
        mealName: parsed.mealName || "Meal Estimate",
        estimatedCalories: Number(parsed.estimatedCalories) || 0,
        proteinGrams: Number(parsed.proteinGrams) || 0,
        carbsGrams: Number(parsed.carbsGrams) || 0,
        fatGrams: Number(parsed.fatGrams) || 0,
        fiberGrams: Number(parsed.fiberGrams) || 0,
        sodiumMg: Number(parsed.sodiumMg) || 0,
        hydrationNote: parsed.hydrationNote || "Drink water with this meal.",
        wellnessTakeaway: parsed.wellnessTakeaway || "Meal estimate ready.",
        caution: parsed.caution || "Estimate only. Not medical advice.",
      },
    });
  } catch (error) {
    console.error("TokHealth meal scan error:", error);

    return Response.json({
      success: true,
      analysis: buildFallbackAnalysis(""),
      fallbackMode: true,
      details: process.env.NODE_ENV === "development" ? error?.message : undefined,
    });
  }
}
