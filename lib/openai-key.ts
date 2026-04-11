export function getOpenAIApiKey() {
  if (process.env.SVL_DISABLE_OPENAI === "1") {
    return "";
  }

  const rawKey = process.env.OPENAI_API_KEY;

  if (!rawKey) return "";

  let trimmed = rawKey.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    trimmed = trimmed.slice(1, -1).trim();
  }

  // Common deployment mistake: the variable value is pasted as
  // "OPENAI_API_KEY=sk-..." instead of just "sk-...".
  if (trimmed.toUpperCase().startsWith("OPENAI_API_KEY=")) {
    trimmed = trimmed.slice("OPENAI_API_KEY=".length).trim();
  }

  const lower = trimmed.toLowerCase();
  if (
    !trimmed ||
    lower === "test-key" ||
    lower === "sk-demo-mode" ||
    lower.includes("your_openai_api_key") ||
    lower.startsWith("openai_api_key") ||
    lower.startsWith("openai_a")
  ) {
    return "";
  }

  // OpenAI API keys use the "sk-" prefix (project keys included).
  if (!trimmed.startsWith("sk-")) {
    return "";
  }

  return trimmed;
}
